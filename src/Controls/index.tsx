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
import { LogoutIcon } from "react-native-heroicons/solid";
import tw from "../tailwind";
import Info from "../Info";

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
			headerLeft={<LogoutIcon style={tw`text-primary-300`} onPress={handleLogout} />}
		>
			<View style={tw`flex-1`}>
				<Power />
				<View style={tw`shadow-lg mx-4 bg-secondary-50 rounded-lg border border-primary-100 mt-2 p-2`}>
					<Brightness />
					<Hue />
					<Saturation />
					<ColorTemperature />
				</View>
				<Info />
			</View>
		</Page>
	);
}

export default Home;
