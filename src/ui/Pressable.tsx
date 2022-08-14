import React, { ReactNode } from 'react';
import {
  Pressable as RNPressable,
  PressableProps,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import tw from '~/tailwind';
import Text from './Text';

interface Props extends Omit<PressableProps, 'style'> {
  style?: null | object;
  children?: ReactNode;
}

function Pressable({
  children,
  style,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  ...rest
}: Props) {
  const value = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: value.value,
    };
  });

  const handlePressIn = (e: GestureResponderEvent) => {
    value.value = 0.3;
    if (onPressIn) {
      onPressIn(e);
    }
  };
  const handlePressOut = (e: GestureResponderEvent) => {
    value.value = 1;
    if (onPressOut) {
      onPressOut(e);
    }
  };

  return (
    <RNPressable
      {...rest}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Animated.View
        style={React.useMemo(
          () => [
            tw`bg-gray-200 items-center justify-center p-2 rounded-xl`,
            animatedStyle,
            style,
          ],
          [animatedStyle, style],
        )}
      >
        {children}
      </Animated.View>
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
