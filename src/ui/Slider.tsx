import React from "react";
import CSlider, { SliderProps } from "@react-native-community/slider";
import { Text, View } from "react-native";
import tw from "../tailwind";

type Props = { label: string } & SliderProps;

function Slider({ label, ...rest }: Props) {
	return (
		<View>
			<View style={tw`flex-row`}>
				<Text style={tw`text-sm font-medium text-gray-700 mr-4`}>{label}:</Text>
				<Text style={tw`text-sm font-medium text-gray-700 font-bold`}>{rest.value}</Text>
			</View>
			<CSlider {...rest} />
		</View>
	);
}

export default Slider;
