import React, { ComponentProps, useEffect } from "react";
import CSlider  from "@react-native-community/slider";
import { View } from "react-native";
import Text from "../ui/Text";
import tw from "../tailwind";

type Props = { label: string } & ComponentProps<typeof CSlider>;

function Slider({ label, ...rest }: Props) {
	return (
		<View>
			<View style={tw`flex-row`}>
				<Text style={tw`text-sm font-medium mr-4`}>{label}:</Text>
				<Text style={tw`text-sm font-medium font-bold`}>{rest.value}</Text>
			</View>
			<CSlider {...rest} />
		</View>
	);
}

export default Slider;
