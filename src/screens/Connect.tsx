import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Pressable from '~/ui/Pressable';
import Text from '~/ui/Text';
import TextInput from '~/ui/TextInput';
import tw from '~/tailwind';
import useConnectionStore from '~/store/use-connection-store';
import Field from '~/ui/Field';
import Screen from '~/ui/Screen';
import Card from '~/ui/Card';

export default function Connect() {
  return (
    <Screen>
      <Card>
        <View style={tw`pb-4`}>
          <Nanoleaf />
        </View>
        <Philips />
      </Card>
    </Screen>
  );
}

export function Nanoleaf() {
  const [nanoleaf, setNanoleaf] = useConnectionStore((s) => [
    s.nanoleaf.ip,
    s.setNanoleaf,
  ]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: { nanoleaf },
    resolver: zodResolver(
      z.object({
        nanoleaf: z.string().min(1),
      }),
    ),
  });

  const mutation = useMutation(
    (input) => {
      return fetch(`http://${input.nanoleaf}:16021/api/v1/new`, {
        method: 'POST',
      });
    },
    {
      onSuccess: async (data, variables) => {
        switch (data.status) {
          case 200: {
            const json = await data.json();
            setNanoleaf({
              ip: variables.nanoleaf,
              authToken: json.auth_token,
            });
            break;
          }
          case 403: {
            setError('nanoleaf', {
              type: 'custom',
              message: 'Unable to locate device',
            });
            break;
          }
          default: {
            console.log(data.status, data);
            break;
          }
        }
      },
    },
  );

  if (nanoleaf) {
    return (
      <Field label={`Nanoleaf Connected ${nanoleaf}`} type="stacked">
        <Pressable onPress={() => setNanoleaf({ ip: null, authToken: null })}>
          <Text>Disconnect?</Text>
        </Pressable>
      </Field>
    );
  }

  return (
    <View style={tw`flex-row`}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Field label="Nanoleaf" error={errors.nanoleaf?.message}>
            <TextInput
              onChangeText={onChange}
              value={value || undefined}
              onBlur={onBlur}
              keyboardType="numeric"
            />
          </Field>
        )}
        name="nanoleaf"
      />
      <Pressable onPress={handleSubmit(mutation.mutate)}>
        <Text>{mutation.isLoading ? 'Loading...' : 'Connect'}</Text>
      </Pressable>
    </View>
  );
}

function Philips() {
  const [philips, setPhilips] = useConnectionStore((s) => [
    s.philips.ip,
    s.setPhilips,
  ]);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { philips },
    resolver: zodResolver(
      z.object({
        philips: z.string(),
      }),
    ),
  });

  const mutation = useMutation(
    (input) => {
      return fetch(`http://${input.philips}/api`, {
        method: 'POST',
        body: JSON.stringify({
          devicetype: 'foobarbaz',
          generateclientkey: true,
        }),
      });
    },
    {
      onSuccess: async (data, variables) => {
        if (data.status === 200) {
          const [json, ...rest] = await data.json();
          console.log(json);
          if (Reflect.has(json, 'error')) {
            setError('philips', {
              type: 'custom',
              message: json.error.description,
            });
          }
          setPhilips({
            ip: variables.philips,
            authToken: json.success.username,
          });
        }
      },
    },
  );

  if (philips) {
    return (
      <Field label={`Philips Hue Connected ${philips}`} type="stacked">
        <Pressable onPress={() => setPhilips({ ip: null, authToken: null })}>
          <Text>Disconnect?</Text>
        </Pressable>
      </Field>
    );
  }

  return (
    <View style={tw`flex-row`}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Field label="Philips" error={errors.philips?.message}>
            <TextInput
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              keyboardType="numeric"
            />
          </Field>
        )}
        name="philips"
      />
      <Pressable onPress={handleSubmit(mutation.mutate)}>
        <Text>{mutation.isLoading ? 'Loading...' : 'Connect'}</Text>
      </Pressable>
    </View>
  );
}
