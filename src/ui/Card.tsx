import React, { ReactNode } from "react";
import { View } from "react-native";
import tw from "../tailwind";

export default function Card({ children }: { children: ReactNode }) {
	return <View style={tw`p-4 m-4 bg-gray-50 rounded shadow dark:bg-stone-800`}>{children}</View>;
}
