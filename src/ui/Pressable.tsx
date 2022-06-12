import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Pressable as RNPressable, GestureResponderEvent, View, Animated } from "react-native";
import tw from "../tailwind";
import Text from "./Text";

type Props = {
	onPress: (press: GestureResponderEvent) => void;
	children: ReactNode;
} & ComponentProps<typeof RNPressable>;

const pressable = cva("px-6 rounded-2xl py-2 items-center", {
	variants: {
		type: {
			filled: "bg-primary-800",
			tonal: "bg-primary-600/50",
			outline: "border border-black bg-white",
			elevated: "bg-white shadow-xl",
			none: "",
		},
	},
	defaultVariants: { type: "filled" },
});

const text = cva([], {
	variants: {
		type: {
			filled: "text-white",
			tonal: "text-black",
			outline: "text-primary-800",
			elevated: "bg-primary-800",
		},
	},
	defaultVariants: { type: "filled" },
});

function Pressable({
	onPress,
	onPressIn,
	onPressOut,
	children,
	style,
	type,
	...rest
}: Props & VariantProps<typeof pressable>) {
	const [pressed, setPressed] = useState(false);
	const opacity = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		if (pressed) {
			Animated.timing(opacity, {
				toValue: 0.35,
				duration: 50,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(opacity, {
				toValue: 1,
				duration: 30,
				useNativeDriver: true,
			}).start();
		}
	}, [pressed]);

	const onPressInWrapper = (e: GestureResponderEvent) => {
		setPressed(true);
		onPressIn && onPressIn(e);
	};

	const onPressOutWrapper = (e: GestureResponderEvent) => {
		setPressed(false);
		onPressOut && onPressOut(e);
	};

	return (
		<View style={tw`flex-row`}>
			<Animated.View style={[{ opacity: opacity }]}>
				<RNPressable
					onPressOut={onPressOutWrapper}
					onPressIn={onPressInWrapper}
					onPress={onPress}
					style={[tw.style(pressable({ type })), style]}
					{...rest}
				>
					{typeof children === "object" ? <>{children}</> : <Text style={tw.style(text({ type }))}>{children}</Text>}
				</RNPressable>
			</Animated.View>
		</View>
	);
}

export default Object.assign(Pressable, { text });
