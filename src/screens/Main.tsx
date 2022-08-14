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

export default function Main() {
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
      <Card>
        <Nanoleaf />
      </Card>
      <Card>
        <Philips />
      </Card>
    </Screen>
  );
}
