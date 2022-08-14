import { cva, VariantProps } from 'class-variance-authority';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import tw from '~/tailwind';
import Text from './Text';

const field = cva('', {
  variants: { type: { inline: '', stacked: '' } },
  defaultVariants: { type: 'inline' },
});

interface Props extends VariantProps<typeof field> {
  label?: string | ReactNode | null | undefined;
  error?: string | ReactNode | null | undefined;
  children: ReactNode;
}

export default function Field({
  label,
  error,
  children,
  type = 'inline',
}: Props) {
  switch (type) {
    case 'stacked': {
      return (
        <View>
          <View style={tw`flex-col my-2`}>
            <View style={tw`mb-1`}>
              {typeof label === 'string' ? <Text>{label}</Text> : label}
            </View>
            <View style={tw`flex-1`}>{children}</View>
          </View>
          {typeof error === 'string' ? (
            <Text style={tw`text-right`}>{error}</Text>
          ) : (
            error
          )}
        </View>
      );
    }
    case 'inline': {
      return (
        <View style={tw`flex-col flex-1`}>
          <View style={tw`flex-row`}>
            <View style={tw`flex-row items-center`}>
              {typeof label === 'string' ? <Text>{label}</Text> : label}
            </View>
            <View style={tw`flex-1`}>{children}</View>
          </View>
          {typeof error === 'string' ? (
            <Text style={tw`text-right font-bold text-rose-800`}>{error}</Text>
          ) : (
            error
          )}
        </View>
      );
    }
    default: {
      console.error(`<Field /> -> Unexpected case: ${type}`);
      return null;
    }
  }
}
