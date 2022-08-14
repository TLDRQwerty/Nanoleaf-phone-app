import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { View, ScrollView } from 'react-native';
import tw from '~/tailwind';
import Pressable from './Pressable';
import Text from './Text';

interface Props {
  children: ReactNode;
  right?: ReactNode | null;
  title?: ReactNode | null;
}
export default function Screen({ children, right, title }: Props) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={tw`flex-row bg-gray-200 justify-between shadow-xl border-b border-gray-300`}
      >
        {navigation.canGoBack() ? (
          <Pressable onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </Pressable>
        ) : (
          <View />
        )}
        {title || <View />}
        {right && right}
      </View>
      <ScrollView>{children}</ScrollView>
    </>
  );
}
