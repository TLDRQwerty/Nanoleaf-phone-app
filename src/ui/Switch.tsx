import React, { ComponentProps } from "react";
import { Switch as RNSwitch } from "react-native";
import { ClassInput } from "twrnc/dist/esm/types";
import tw from "../tailwind";

type Props = {} & Omit<ComponentProps<typeof RNSwitch>, "style" | "thumbColor" | "trackColor"> & { style?: ClassInput };

export default function Switch({ ...props }: Props) {
	return (
		<RNSwitch
			thumbColor={tw`bg-primary-800 dark:bg-primary-400`.backgroundColor}
			trackColor={{ true: tw`bg-primary-400 dark:bg-primary-800`.backgroundColor, false: tw`bg-primary-200`.backgroundColor }}
			{...props}
		/>
	);
}
