import React from "react";
import { Pressable, GestureResponderEvent, PressableProps, StyleProp } from "react-native";
import tw from "../tailwind";

type Props = {
	children: React.ReactChild;
	onPress: (press: GestureResponderEvent) => void;
	style?: StyleProp<PressableProps>;
	active?: boolean;
};

function Button({ children, onPress, style, active }: Props) {
	return (
		<Pressable
			style={[
				tw.style(
					"bg-secondary-400 font-bold py-2 px-4 border border-secondary-600 rounded",
					active && "bg-secondary-100"
				),
				style,
			]}
			onPress={onPress}
		>
			{children}
		</Pressable>
	);
}

export default Button;
