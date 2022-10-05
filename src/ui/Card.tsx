import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import tw from '~/tailwind';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
export default function Card({ children, style }: Props) {
  return (
    <View
      style={React.useMemo(
        () => [
          tw`p-4 m-2 rounded-lg bg-gray-400/25 border-gray-400 border-4`,
          style,
        ],
        [style],
      )}
    >
      {children}
    </View>
  );
}
