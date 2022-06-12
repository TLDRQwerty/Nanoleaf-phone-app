import React, { ComponentProps, useEffect } from "react";
import CSlider from "@react-native-community/slider";
import { View } from "react-native";
import Text from "../ui/Text";
import tw from "../tailwind";

type Props = { label: string } & ComponentProps<typeof CSlider>;

function Slider({ label, ...rest }: Props) {
	return (
		<View>
			<View style={tw`flex-row`}>
				<Text style={tw`text-sm mr-4`}>{label}:</Text>
				<Text style={tw`text-sm font-bold`}>{rest.value}</Text>
			</View>
			<CSlider
				minimumTrackTintColor={tw`bg-primary-600`.backgroundColor}
				maximumTrackTintColor={tw`bg-primary-400`.backgroundColor}
				thumbTintColor={tw`bg-primary-800`.backgroundColor}
				{...rest}
			/>
		</View>
	);
}

export default Slider;
