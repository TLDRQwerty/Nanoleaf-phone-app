import { cva, VariantProps } from "class-variance-authority";
import create from "zustand";
import React, { ReactNode, useEffect } from "react";
import { View } from "react-native";
import tw from "../tailwind";
import Pressable from "./Pressable";

interface State {
	selected: any;
	setSelected: (selected: any) => void;
}
const useStore = create<State>()((set) => ({
	selected: null,
	setSelected: (selected) => set((state) => ({ ...state, selected })),
}));

const toggleItem = cva(" bg-primary-100 dark:bg-primary-600 text-black py-1 px-2 rounded-xl", {
	variants: { selected: { true: "bg-primary-200 dark:bg-primary-900", false: "" } },
	defaultVariants: { selected: true },
});

function Toggle<Value>({ options, children, value }: { options: [Value, Value]; children: ReactNode; value: Value }) {
	const { setSelected } = useStore((s) => ({ setSelected: s.setSelected }));

	useEffect(() => {
		setSelected(value);
	}, [setSelected, value]);

	return (
		<View
			style={tw`border-primary-900 dark:border-primary-400 flex-row justify-start mr-auto border rounded-xl dark:bg-primary-600`}
		>
			{children}
		</View>
	);
}

function Left({ children, onPress, value }: { children: ReactNode; onPress: (value: any) => void; value: any }) {
	const { selected } = useStore((s) => ({ selected: s.selected === value }));
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
	value,
}: {
	children: ReactNode;
	onPress: (value: any) => void;
	value: any;
} & VariantProps<typeof toggleItem>) {
	const { selected } = useStore((s) => ({ selected: s.selected === value }));
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
