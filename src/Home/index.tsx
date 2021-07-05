import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Power from "../Controls/Power";
import Brightness from "../Controls/Brightness";
import Hue from "../Controls/Hue";
import Saturation from "../Controls/Saturation";
import ColorTemperature from "../Controls/ColorTemperature";
import { useHistory } from "react-router-native";
import { getItem, StorageKeys } from "../utils/localStorage";

function Home() {
	const history = useHistory()

	useEffect(() => {
		if (!getItem(StorageKeys.AUTH_TOKEN)) {
			history.push('/connect')
		}
	}, [])
	return (
		<View>
			<Text>Homepage</Text>
				<Power />
				<Brightness />
				<Hue />
				<Saturation />
				<ColorTemperature />
		</View>
	);
}

export default Home;
