import { cva, VariantProps } from "class-variance-authority";
import create from "zustand";
import React, { ReactNode, useEffect } from "react";
import { ScrollView, Text, useColorScheme, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";
import tw from "../tailwind";
import Pressable from "./Pressable";

const useStore = create<{ selected: any, setSelected: (selected: any) => void}>()((set) => ({
	selected: null,
	setSelected: (selected) => set((state) => ({ ...state, selected })),
}));

const chip = cva("border-primary-900 rounded-lg border p-1 bg-primary-100 dark:bg-primary-600 text-black mx-1", {
	variants: { selected: { true: "bg-primary-200 dark:bg-primary-900", false: "" } },
	defaultVariants: { selected: true },
});

function Chips<V>({ children, options, value }: { children: (v: V) => ReactNode; options: V[]; value: V }) {
	const [setSelected] = useStore((s) => [s.setSelected]);

	useEffect(() => {
		setSelected(value);
	}, [value]);

	return <ScrollView horizontal>{options.map(children)}</ScrollView>;
}

function Chip({
	children,
	onPress,
	value,
}: {
	children: ReactNode;
	onPress: (v: string) => void;
	value: string;
} & VariantProps<typeof chip>) {
	const colorscheme = useColorScheme();
	const { selected } = useStore((s) => ({ selected: s.selected === value }));
	return (
		<Pressable style={tw.style(chip({ selected }))} onPress={() => onPress(value)}>
			<View style={tw`flex-row items-center`}>
				{selected && (
					<>
						<CheckIcon fill={colorscheme === "dark" ? "white" : "black"} size={18} />
						<Text> </Text>
					</>
				)}
				{children}
			</View>
		</Pressable>
	);
}

export default Object.assign(Chips, { Chip });
