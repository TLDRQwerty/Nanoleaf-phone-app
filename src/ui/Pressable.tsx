import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps, ReactNode } from "react";
import { Pressable as RNPressable, GestureResponderEvent, View } from "react-native";
import tw from "../tailwind";
import Text from "./Text";

type Props = {
	onPress: (press: GestureResponderEvent) => void;
	children: ReactNode;
} & ComponentProps<typeof RNPressable>;

const pressable = cva("px-6 rounded-2xl py-2 items-center", {
	variants: {
		type: {
			filled: "bg-green-800",
			tonal: "bg-green-600/50",
			outline: "border border-black bg-white",
			elevated: "bg-white shadow-xl",
		},
	},
	defaultVariants: { type: "filled" },
});

const text = cva([], {
	variants: {
		type: {
			filled: "text-white",
			tonal: "text-black",
			outline: "text-green-800",
			elevated: "bg-green-800",
		},
	},
	defaultVariants: { type: "filled" },
});

function Pressable({ onPress, children, style, type, ...rest }: Props & VariantProps<typeof pressable>) {
	return (
		<View style={tw`flex-1 flex-row`}>
			<RNPressable onPress={onPress} style={[tw.style(pressable({ type })), style]} {...rest}>
				{typeof children === "object" ? <>{children}</> : <Text style={tw.style(text({ type }))}>{children}</Text>}
			</RNPressable>
		</View>
	);
}

export default Object.assign(Pressable, { text });
