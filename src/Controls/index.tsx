import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Power from "./Power";
import Brightness from "./Brightness";
import Hue from "./Hue";
import Saturation from "./Saturation";
import ColorTemperature from "./ColorTemperature";
import { useHistory } from "react-router-native";
import { getItem, StorageKeys, removeItem } from "../utils/localStorage";
import Page from "../ui/Page";
import tw from "../tailwind";

function Home() {
	const history = useHistory();

	useEffect(() => {
		const checkForAuthTokenAndRedirect = async () => {
			const authToken = await getItem(StorageKeys.AUTH_TOKEN);
			if (!authToken) {
				history.push("/connect");
			}
		};
		checkForAuthTokenAndRedirect();
	}, [history]);

	const handleLogout = async () => {
		await removeItem(StorageKeys.AUTH_TOKEN);
		await removeItem(StorageKeys.NANOLEAF_IP_ADDRESS);
	};

	return (
		<Page
			title={<Text style={tw`text-primary-800 text-center text-lg font-bold`}>Controller</Text>}
			headerLeft={<Text onPress={handleLogout}>Logout</Text>}
		>
			<View>
				<Power />
				<Brightness />
				<Hue />
				<Saturation />
				<ColorTemperature />
			</View>
		</Page>
	);
}

export default Home;
