import React from "react";
import { View, Text, Pressable } from "react-native";
import api, { PATHS } from "../utils/api/api";

function Nanoleaf() {
	return (
		<View>
			<Text>Nanoleaf On</Text>
		</View>
	);
}

function Philips({ light }: { light: number }) {
	const handlePress = async () => {
		api(PATHS.philips.change(light), "PHILIPS", {
			method: "POST",
			body: {
				on: false,
			},
		});
	};
	return (
		<View>
			<Pressable onPress={handlePress}>
				<Text>Philips ON</Text>
			</Pressable>
		</View>
	);
}

export default Object.assign({}, { Nanoleaf, Philips });
