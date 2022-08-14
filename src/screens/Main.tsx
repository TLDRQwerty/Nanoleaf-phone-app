import React from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootDrawerParamList, RootStackParamList } from '~/Navigations';
import Text from '~/ui/Text';
import Pressable from '~/ui/Pressable';
import Nanoleaf from '~/components/Nanoleaf';
import Philips from '~/components/Philips';
import Screen from '~/ui/Screen';
import Card from '~/ui/Card';
import tw from '~/tailwind';
import { useNetInfo } from '@react-native-community/netinfo';

export default function Main() {
  const netinfo = useNetInfo();
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        DrawerNavigationProp<RootDrawerParamList, 'Main'>,
        NativeStackNavigationProp<RootStackParamList, 'Home'>
      >
    >();
  return (
    <Screen
      right={
        <Pressable onPress={() => navigation.navigate('Connect')}>
          <Text>Connect</Text>
        </Pressable>
      }
    >
      {netinfo.type !== 'wifi' && (
        <Card style={tw`bg-rose-600 border-rose-800 border-4`}>
          <Text style={tw`text-rose-50 font-bold text-center`}>Not connected to the internet</Text>
        </Card>
      )}
      <Card>
        <Nanoleaf />
      </Card>
      <Card>
        <Philips />
      </Card>
    </Screen>
  );
}
