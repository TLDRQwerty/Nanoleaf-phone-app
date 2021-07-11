import React, { ComponentProps } from "react";
import { Picker as NPicker } from "react-native";

type Props = {} & ComponentProps<typeof Picker>;

function Picker({ ...rest }: Props) {
	return <NPicker {...rest} />;
}

export default Picker;
