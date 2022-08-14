import React, { ReactNode } from 'react';
import { View, ScrollView } from 'react-native';
import useConnectionStore from '~/store/use-connection-store';
import useIntegrationStore from '~/store/use-integration-store';
import tw from '~/tailwind';
import Text from '~/ui/Text';

export default function Status() {
  const [nanoleafIp, nanoleafAuthToken, philipsIp, philipsAuthToken] =
    useConnectionStore((s) => [
      s.nanoleaf.ip,
      s.nanoleaf.authToken,
      s.philips.ip,
      s.philips.authToken,
    ]);
  const [nanoleaf, philips] = useIntegrationStore((s) => [
    s.nanoleaf,
    s.philips,
  ]);
  return (
    <ScrollView>
      <View>
        <Text header="h1">Nanoleaf</Text>
        <Text>{nanoleafIp}</Text>
        <Text>{nanoleafAuthToken}</Text>
        {nanoleaf != null && <DataViewer data={nanoleaf} />}
      </View>
      <View>
        <Text header="h1">Philips Hue</Text>
        <Text>{philipsIp}</Text>
        <Text>{philipsAuthToken}</Text>
        {philips != null && <DataViewer data={philips} />}
      </View>
    </ScrollView>
  );
}

function DataViewer<Data extends object>({ data }: { data: Data }): ReactNode {
  let depth = 0;
  const renderObject = (d) => {
    return Object.entries(d).map(([key, value]): ReactNode => {
      depth = Math.max(
        0,
        value === 'object' && value != null ? depth - 1 : depth + 1,
      );
      return (
        <View key={key} style={tw`pl-[${Math.ceil(depth / 4)}]`}>
          <Text style={tw`text-xs font-bold`}>{key}</Text>
          {typeof value === 'object' && value != null ? (
            <View>{renderObject(value)}</View>
          ) : (
            <Text style={tw`text-xs`}>{String(value)}</Text>
          )}
        </View>
      );
    });
  };
  return renderObject(data);
}
