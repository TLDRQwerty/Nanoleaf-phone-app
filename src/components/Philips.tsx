import { useMutation } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useQuery } from '~/hooks/use-api';
import useConnectionStore, { INTEGRATIONS } from '~/store/use-connection-store';
import useIntegrationStore from '~/store/use-integration-store';
import tw from '~/tailwind';
import Chips from '~/ui/Chips';
import Field from '~/ui/Field';
import Pressable from '~/ui/Pressable';
import Slider from '~/ui/Slider';
import Text from '~/ui/Text';

export type PhilipsResponse = {
  lights: {
    [key: string]: {
      state: {
        on: boolean;
        bri: number;
        hue: number;
        sat: number;
        effect: string;
        xy: [number, number];
        ct: number;
        alert: string;
        colorMode: string;
        mode: string;
        reachable: boolean;
      };
      swupdate: { state: string; lastinstall: Date };
      type: string;
      name: string;
      modelid: string;
      manufacturername: string;
      productname: string;
      capabilities: {
        certified: boolean;
        control: {
          mindimlevel: number;
          maxlumen: number;
          colorgamuttype: string;
          colorgamut: [[number, number], [number, number], [number, number]];
          ct: {
            min: number;
            max: number;
          };
          streaming: {
            renderer: boolean;
            proxy: boolean;
          };
        };
      };
      uniqueid: string;
      swversion: number;
      swconfigid: string;
      productid: string;
    };
  };
  groups: {
    [key: string]: {
      name: string;
      lights: string[];
      sensors: unknown[];
      type: string;
      state: { all_on: boolean; any_on: boolean };
      recycle: boolean;
      class: string;
      action: Action;
    };
  };
  config: {
    name: string;
    zigbeechannel: number;
    bridgeid: string;
    mac: string;
    dhcp: boolean;
    ipaddress: string;
    netmask: string;
    gateway: string;
    proxyaddress: string;
    proxyport: number;
    UTC: string;
    localtime: string;
    timezone: string;
  };
  scenes: {
    [id: string]: {
      name: string;
      type: unknown;
      group: string;
      lights: number[];
      owner: string;
      recycle: boolean;
      locked: boolean;
      appdata: unknown;
      picture: string;
      image: string;
      lastupadted: number;
      version: number;
    };
  };
};

interface Action {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: [number, number];
  ct: number;
  select: string;
  colormode: string;
  scene: string;
}

export default function Wrapper() {
  const ipAddress = useConnectionStore((s) => s.philips.ip);
  if (ipAddress == null) {
    return <Text style={tw`text-center`}>Not connected</Text>;
  }
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <Philips />
    </Suspense>
  );
}

function Philips() {
  const setPhilips = useIntegrationStore((s) => s.setPhilips);
  const { data } = useQuery<PhilipsResponse>(
    ['philips-get-information'],
    INTEGRATIONS.PHILIPS,
    '',
    {
      onSuccess: (data) => {
        setPhilips((i) => {
          i = data;
          return i;
        });
      },
    },
  );

  if (data == null) {
    return null;
  }

  return (
    <View>
      <Groups />
    </View>
  );
}

function Groups() {
  const groups = useIntegrationStore((s) => s.philips?.groups);
  if (groups == null) {
    return null;
  }

  return (
    <>
      {Object.keys(groups).map((id) => (
        <Group id={id} key={id} />
      ))}
    </>
  );
}

function Group({ id }: { id: string }) {
  const [group, set] = useIntegrationStore((s) => [
    s.philips?.groups[id],
    s.setPhilips,
  ]);
  const [ipAddress, authToken] = useConnectionStore((s) => [
    s.philips.ip,
    s.philips.authToken,
  ]);
  const mutation = (<Key extends keyof Action, Value extends Action[Key]>() =>
    useMutation<unknown, unknown, { key: Key; value: Value }, unknown>(
      ({ key, value }) => {
        return fetch(
          `http://${ipAddress}/api/${authToken}/groups/${id}/action`,
          {
            method: 'PUT',
            body: JSON.stringify({ [key]: value }),
          },
        );
      },
      {
        onSuccess: (_, { key, value }) => {
          set((i) => {
            i.groups[id].action[key] = value;
          });
        },
      },
    ))();

  if (group == null) {
    return null;
  }

  if (group.type !== 'Room') {
    return null;
  }

  return (
    <View>
      <View style={tw`flex-row justify-between`}>
        <Text>{group.name}</Text>
        <Pressable.Power
          style={tw`w-20`}
          onPress={() =>
            mutation.mutate({ key: 'on', value: !group.action.on })
          }
          value={group.action.on}
        />
      </View>
      <View style={tw`pt-2`}>
        <Scenes
          onPress={(value) => mutation.mutate({ key: 'scene', value })}
          value={group.action.scene}
        />
      </View>
      <Field label="Brightness" type="stacked">
        <Slider
          value={group.action.bri}
          onValueChange={(value) => mutation.mutate({ key: 'bri', value })}
          minimumValue={1}
          maximumValue={254}
          step={1}
        />
      </Field>
      <Field label="Hue" type="stacked">
        <Slider
          value={group.action.hue}
          onValueChange={(value) => mutation.mutate({ key: 'hue', value })}
          minimumValue={0}
          maximumValue={65535}
          step={1}
        />
      </Field>
      <Field label="Color Temperature" type="stacked">
        <Slider
          value={group.action.sat}
          onValueChange={(value) => mutation.mutate({ key: 'ct', value })}
          minimumValue={153}
          maximumValue={500}
          step={1}
        />
      </Field>
      <Field label="Saturation" type="stacked">
        <Slider
          value={group.action.sat}
          onValueChange={(value) => mutation.mutate({ key: 'sat', value })}
          minimumValue={0}
          maximumValue={254}
          step={1}
        />
      </Field>
      {group.lights.map((light) => (
        <View key={light} style={tw`pb-4`}>
          <Light id={light} />
        </View>
      ))}
    </View>
  );
}

function Light({ id }: { id: string }) {
  const [light, set] = useIntegrationStore((s) => [
    s.philips?.lights[id],
    s.setPhilips,
  ]);
  const [ipAddress, authToken] = useConnectionStore((s) => [
    s.philips.ip,
    s.philips.authToken,
  ]);
  const mutation = (<Key extends keyof Action, Value extends Action[Key]>() =>
    useMutation<unknown, unknown, { key: Key; value: Value }, unknown>(
      ({ key, value }) => {
        return fetch(
          `http://${ipAddress}/api/${authToken}/lights/${id}/state`,
          {
            method: 'PUT',
            body: JSON.stringify({ [key]: value }),
          },
        );
      },
      {
        onSuccess: (_, { key, value }) => {
          set((i) => {
            i.lights[id].state[key] = value;
          });
        },
      },
    ))();

  if (light == null) {
    return null;
  }

  return (
    <View>
      <View style={tw`flex-row justify-between`}>
        <Text>{light.name}</Text>
        <Pressable.Power
          style={tw`w-20`}
          onPress={() => mutation.mutate({ key: 'on', value: !light.state.on })}
          value={light.state.on}
        />
      </View>
      <Field label="Brightness" type="stacked">
        <Slider
          value={light.state.bri}
          onValueChange={(value) => mutation.mutate({ key: 'bri', value })}
          minimumValue={1}
          maximumValue={254}
          step={1}
        />
      </Field>
      <Field label="Hue" type="stacked">
        <Slider
          value={light.state.hue}
          onValueChange={(value) => mutation.mutate({ key: 'hue', value })}
          minimumValue={0}
          maximumValue={65535}
          step={1}
        />
      </Field>
      <Field label="Color Temperature" type="stacked">
        <Slider
          value={light.state.sat}
          onValueChange={(value) => mutation.mutate({ key: 'ct', value })}
          minimumValue={153}
          maximumValue={500}
          step={1}
        />
      </Field>
      <Field label="Saturation" type="stacked">
        <Slider
          value={light.state.sat}
          onValueChange={(value) => mutation.mutate({ key: 'sat', value })}
          minimumValue={0}
          maximumValue={254}
          step={1}
        />
      </Field>
    </View>
  );
}

function Scenes({
  onPress,
  value,
}: {
  onPress: (value: string) => void;
  value: string;
}) {
  const [scenes, set] = useIntegrationStore((s) => [
    s.philips?.scenes,
    s.setPhilips,
  ]);
  const [ipAddress, authToken] = useConnectionStore((s) => [
    s.philips.ip,
    s.philips.authToken,
  ]);
  if (scenes == null) {
    return null;
  }

  return (
    <Chips horizontal scrollable options={Object.entries(scenes)} value={value}>
      {([id, { name }]) => (
        <Chips.Chip value={id} key={id} onPress={() => onPress(id)}>
          <Text>{name}</Text>
        </Chips.Chip>
      )}
    </Chips>
  );
}
