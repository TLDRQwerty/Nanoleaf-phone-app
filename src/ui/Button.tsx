import React from "react";
import { Pressable, GestureResponderEvent, PressableProps, StyleProp } from "react-native";
import tw from "../tailwind";
import Text from "../ui/Text";

type Props = {
	onPress: (press: GestureResponderEvent) => void;
	style?: StyleProp<PressableProps>;
	active?: boolean;
	label: string;
	type?: "primary" | "secondary";
	disabled?: boolean;
};

function Button({ label, onPress, style, active = true, type = "primary", disabled }: Props) {
	return (
		<Pressable
			style={[
				tw.style(
					{
						"bg-primary-200 font-bold border-2 border-primary-700 rounded-lg shadow-lg":
							type === "primary" && active === true,
						"bg-secondary-200 border-secondary-300 rounded border": type === "secondary" && active === true,
						"bg-primary-100 font-bold border-2 border-primary-700 rounded-lg shadow-lg":
							active === false && type === "primary",
						"bg-secondary-100 border-secondary-300 rounded border": active === false && type === "secondary",
						"bg-secondary-200": disabled === true && type === "secondary",
						"bg-primary-200 shadow-lg": disabled === true && type === "primary",
					},
					"p-2 m-1"
				),
				style,
			]}
			onPress={onPress}
		>
			<Text
				style={tw.style(
					{
						"text-primary-800": type === "primary",
						"text-secondary-700": type === "secondary",
					},
					"text-center"
				)}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export default Button;
