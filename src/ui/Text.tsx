import {cva, VariantProps} from "class-variance-authority";
import React from "react";
import {Text as RNText, TextProps} from "react-native";
import tw from "~/tailwind";

const text = cva("text-black", {
	variants: {
		header: {
			h1: "text-lg",
			h2: "text-lg",
			base: "",
		},
	},
	defaultVariants: {
		header: "base",
	},
});

interface Props extends Omit<TextProps, "style">, VariantProps<typeof text> {
	style?: string | object | null;
}

export default function Text({style, header, ...rest}: Props) {
	return <RNText style={tw.style(text({header}), style)} {...rest} />;
}
