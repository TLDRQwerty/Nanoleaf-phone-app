import React, { ComponentProps, useEffect } from "react";
import CSlider from "@react-native-community/slider";
import { View } from "react-native";
import Text from "../ui/Text";
import tw from "../tailwind";

type Props = { label: string, showValue?: string | null } & ComponentProps<typeof CSlider>;

function Slider({ label, showValue, ...rest }: Props) {
	return (
		<View>
			<View style={tw`flex-row`}>
				<Text style={tw`text-sm mr-4`}>{label}</Text>
				{showValue && <Text style={tw`text-sm font-bold`}>{rest.value}</Text>}
			</View>
			<CSlider
				minimumTrackTintColor={tw`bg-primary-600 dark:bg-primary-600`.backgroundColor}
				maximumTrackTintColor={tw`bg-primary-400 dark:bg-primary-800`.backgroundColor}
				thumbTintColor={tw`bg-primary-800 dark:bg-primary-400`.backgroundColor}
				{...rest}
			/>
		</View>
	);
}

export default Slider;
