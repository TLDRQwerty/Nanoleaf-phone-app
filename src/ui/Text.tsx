import React, { ComponentProps, ReactNode } from "react";
import { Text as NText } from "react-native";
import tw from "../tailwind";

type Props = {
	children: ReactNode;
	type?: "primary" | "secondary";
} & ComponentProps<typeof NText>;

function Text({ style, children, type = "primary", ...rest }: Props) {
	return (
		<NText
			style={[
				tw.style({
					"text-primary-900 text-base": type === "primary",
					"text-secondary-400 text-xs": type === "secondary",
				}),
				style,
			]}
			{...rest}
		>
			{children}
		</NText>
	);
}

export default Text;
