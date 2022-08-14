import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';
import tw from '~/tailwind';

interface Props extends TextInputProps {}

export default function TextInput({ style, ...rest }: Props) {
  return (
    <RNTextInput
      style={React.useMemo(
        () => [
          tw`ml-4 flex-1 border border-gray-300 rounded-xl bg-white text-black`,
          style,
        ],
        style,
      )}
      {...rest}
    />
  );
}
