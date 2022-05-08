import React, { ComponentProps, ReactNode } from "react";
import { Text as NText } from "react-native";
import { ClassInput } from "twrnc/dist/esm/types";
import tw from "../tailwind";

type Props = {
	children: ReactNode;
} & Omit<ComponentProps<typeof NText>, "style"> & { style?: ClassInput };

function Text({ style, children, ...rest }: Props) {
	return (
		<NText style={tw.style("text-black dark:text-dark-primary-50", style)} {...rest}>
			{children}
		</NText>
	);
}

export default Text;
