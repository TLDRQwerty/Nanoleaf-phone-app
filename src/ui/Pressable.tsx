import React, { ComponentProps, ReactNode } from "react";
import { Pressable as RNPressable, GestureResponderEvent, PressableProps, StyleProp } from "react-native";
import Text from "./Text";

type Props = {
	onPress: (press: GestureResponderEvent) => void;
	children: ReactNode;
} & ComponentProps<typeof RNPressable>;

export default function Pressable({ onPress, children, ...rest }: Props) {
	return (
		<RNPressable onPress={onPress} {...rest}>
			{typeof children === "object" ? <>{children}</> : <Text>{String(children)}</Text>}
		</RNPressable>
	);
}
