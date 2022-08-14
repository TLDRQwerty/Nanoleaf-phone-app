import React from 'react';
import { Pressable as RNPressable, PressableProps } from 'react-native';
import tw from '~/tailwind';
import Text from './Text';

interface Props extends Omit<PressableProps, 'style'> {
  style?: null | object;
}

function Pressable({ children, style, ...rest }: Props) {
  return (
    <RNPressable
      style={tw.style(
        `bg-gray-200 items-center justify-center p-2 rounded-xl flex-row`,
        style,
      )}
      {...rest}
    >
      {children}
    </RNPressable>
  );
}

function Power({ value, ...props }: { value: boolean } & Props) {
  return (
    <Pressable {...props}>
      <Text>{value ? 'Off' : 'On'}</Text>
    </Pressable>
  );
}

export default Object.assign(Pressable, { Power });
