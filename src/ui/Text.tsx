import React, { ComponentProps, ReactNode } from "react";
import { Text as NText, useColorScheme } from "react-native";
import tw from "../tailwind";

type Props = {
	children: ReactNode;
} & ComponentProps<typeof NText>;

function Text({ style, children, ...rest }: Props) {
	const colorTheme = useColorScheme();
	const isDarkMode = colorTheme === "dark";
	return (
		<NText style={[tw.style(isDarkMode ? "text-dark" : "text-light"), style]} {...rest}>
			{children}
		</NText>
	);
}

export default Text;
