import { cva, VariantProps } from "class-variance-authority";
import React, { ReactNode } from "react";
import { View } from "react-native";
import tw from "../tailwind";
import Pressable from "./Pressable";

const toggleItem = cva(" bg-primary-100 dark:bg-primary-600  text-black py-1 px-2 rounded-xl", {
	variants: { selected: { true: "bg-primary-200 dark:bg-primary-900", false: "" } },
	defaultVariants: { selected: true },
});

function Toggle<Value>({ options, children }: { options: [Value, Value]; children: ReactNode }) {
	return (
		<View style={tw`border-primary-900 dark:border-primary-200 flex-row justify-start mr-auto border rounded-xl dark:bg-primary-600`}>
			{children}
		</View>
	);
}

function Left({
	children,
	onPress,
	selected,
	value,
}: {
	children: ReactNode;
	onPress: (value: any) => void;
	selected: boolean;
	value: any;
}) {
	return (
		<Pressable
			style={[
				{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderWidth: 0 },
				tw.style(toggleItem({ selected })),
			]}
			onPress={() => onPress(value)}
		>
			{children}
		</Pressable>
	);
}

function Right({
	children,
	onPress,
	selected,
	value,
}: {
	children: ReactNode;
	onPress: (value: any) => void;
	value: any;
} & VariantProps<typeof toggleItem>) {
	return (
		<Pressable
			style={[
				{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderWidth: 0 },
				tw.style(toggleItem({ selected })),
			]}
			onPress={() => onPress(value)}
		>
			{children}
		</Pressable>
	);
}

export default Object.assign(Toggle, { Left, Right });
