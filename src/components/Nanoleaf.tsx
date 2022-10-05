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
import Switch from '~/ui/Switch';
import Text from '~/ui/Text';

type Value = {
  value: number;
  max: number;
  min: number;
};

type Coordinates = {
  x: number;
  y: number;
  o: number;
};

export interface NanoleafResponse {
  name: string;
  serialNo: string;
  manufacturer: string;
  firmwareVersion: number;
  hardwareVersion: string;
  model: string;
  cloudHash: object;
  discovery: object;
  effects: {
    effectsList: string[];
    select: string;
  };
  firmwareUpgrade: object;
  panelLayout: {
    globalOrientation: Value;
    layout: {
      numPanels: number;
      sideLength: string;
      positionData: Array<
        {
          panelId: number;
          shapeType: number;
        } & Coordinates
      >;
    };
  };
  rhythm: {
    auxAvailable: boolean;
    firmwareVersion: number;
    hardwareVersion: number;
    rhythmActive: boolean;
    rhythmConnected: boolean;
    rhythmId: number;
    rhythmMode: number;
    rhythmPosition: Coordinates;
  };
  scheudules: object;
  state: {
    brightness: Value;
    colorMode: string;
    ct: Value;
    hue: Value;
    on: { value: boolean };
    sat: Value;
  };
}

export default function Wrapper() {
  const ipAddress = useConnectionStore((s) => s.nanoleaf.ip);

  if (ipAddress == null) {
    return <Text style={tw`text-center`}>Not connected</Text>;
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <Nanoleaf />
    </Suspense>
  );
}
function Nanoleaf() {
  const [setNanoleaf] = useIntegrationStore((s) => [s.setNanoleaf]);
  const { data } = useQuery<NanoleafResponse>(
    ['nanoleaf-get-information'],
    INTEGRATIONS.NANOLEAF,
    '',
    {
      onSuccess: (d) => {
        setNanoleaf((i) => {
          i = d;
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
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`font-bold text-xl`}>{data.name}</Text>
        <Power />
      </View>
      <View style={tw`pt-2`}>
        <Effects />
      </View>
      <View>
        <GenericSlider label="Brightness" type="brightness" />
        <GenericSlider label="Colour Temperature" type="ct" />
        <GenericSlider label="Hue" type="hue" />
        <GenericSlider label="Saturation" type="sat" />
      </View>
    </View>
  );
}

function Power() {
  const [ipAddress, authToken] = useConnectionStore((s) => [
    s.nanoleaf.ip,
    s.nanoleaf.authToken,
  ]);

  const [nanoleaf, setNanoleaf] = useIntegrationStore((s) => [
    s.nanoleaf,
    s.setNanoleaf,
  ]);
  const mutation = useMutation(
    (value: boolean) => {
      return fetch(`http://${ipAddress}:16021/api/v1/${authToken}/state`, {
        method: 'put',
        body: JSON.stringify({ on: { value: !value } }),
      });
    },
    {
      onMutate: (variable) => {
        setNanoleaf((i) => {
          if (i == null) return;
          i.state.on.value = !variable;
        });
      },
      onError: (e) => {
        throw Error(e);
      },
    },
  );

  if (nanoleaf == null) {
    return null;
  }

  return (
    <Switch
      onChange={() => mutation.mutate(nanoleaf.state.on.value)}
      value={nanoleaf.state.on.value}
    />
  );
}

function GenericSlider({ label, type }: { label: string; type: string }) {
  const [ipAddress, authToken] = useConnectionStore((s) => [
    s.nanoleaf.ip,
    s.nanoleaf.authToken,
  ]);
  const [value, setNanoleaf] = useIntegrationStore((s) => [
    s.nanoleaf?.state[type],
    s.setNanoleaf,
  ]);

  const mutation = useMutation(
    (newValue: number) => {
      return fetch(`http://${ipAddress}:16021/api/v1/${authToken}/state`, {
        method: 'put',
        body: JSON.stringify({ [type]: { value: newValue } }),
      });
    },
    {
      onMutate: (variables) => {
        setNanoleaf((i) => {
          if (i == null) return;
          i.state[type].value = variables;
        });
      },
      onError: (error, variables) => {
        setNanoleaf((i) => {
          if (i == null) return;
          i.state[type].value = variables;
        });
      },
    },
  );

  if (value == null) {
    return null;
  }
  return (
    <Field label={label} type="stacked">
      <Slider
        value={value.value}
        onValueChange={(newValue) => mutation.mutate(newValue)}
        maximumValue={value.max}
        minimumValue={value.min}
        step={1}
      />
    </Field>
  );
}

function Effects() {
  const [ipAddress, authToken] = useConnectionStore((s) => [
    s.nanoleaf.ip,
    s.nanoleaf.authToken,
  ]);
  const [effects, setNanoleaf] = useIntegrationStore((s) => [
    s.nanoleaf?.effects,
    s.setNanoleaf,
  ]);
  const mutation = useMutation(
    (select: string) => {
      return fetch(`http://${ipAddress}:16021/api/v1/${authToken}/effects`, {
        method: 'PUT',
        body: JSON.stringify({ select }),
      });
    },
    {
      onMutate: (variables) => {
        setNanoleaf((i) => {
          if (i == null) return;
          i.effects.select = variables;
        });
      },
      onError: (e, variables) => {
        if (e instanceof Error) {
          throw e;
        }
      },
    },
  );
  if (effects == null) {
    return null;
  }
  return (
    <Chips
      horizontal
      options={effects.effectsList}
      value={effects.select}
      scrollable
    >
      {(v) => (
        <Chips.Chip key={v} onPress={mutation.mutate} value={v}>
          <Text>{v}</Text>
        </Chips.Chip>
      )}
    </Chips>
  );
}
