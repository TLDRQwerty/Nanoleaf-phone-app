import React, { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";
import tw from "../tailwind";
import Pressable from "./Pressable";

function Chips<V>({ children, options }: { children: (v: V) => ReactNode; options: V[] }) {
	return <ScrollView horizontal>{options.map(children)}</ScrollView>;
}

function Chip({
	children,
	onPress,
	selected,
	value,
}: {
	children: ReactNode;
	onPress: (v: string) => void;
	selected: boolean;
	value: string;
}) {
	return (
		<Pressable
			style={tw.style("border-black rounded-lg border p-1 bg-white text-black mx-1", { "bg-gray-300": selected })}
			onPress={() => onPress(value)}
		>
			<View style={tw`flex-row items-center`}>
				{selected && (
					<>
						<CheckIcon fill="black" size={18} />
						<Text> </Text>
					</>
				)}
				{children}
			</View>
		</Pressable>
	);
}

export default Object.assign(Chips, { Chip });
