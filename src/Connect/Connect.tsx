import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import api, { PATHS } from "../utils/api/api";
import { saveItem, StorageKeys, getItem } from "../utils/localStorage";
import tw from "../tailwind";
import Page from "../ui/Page";
import Text from "../ui/Text";

function Connect() {
	const [nanoleaf, setNanoleaf] = useState("");
	const [nanoleafConnected, setNanoleafConnected] = useState(false);
	const [philips, setPhilips] = useState("");
	const [philipsConnected, setPhilipsConnected] = useState(false);

	useEffect(() => {
		(async () => {
			await getItem(StorageKeys.NANOLEAF.IP_ADDRESS, setNanoleaf);
			await getItem(StorageKeys.PHILIPS.IP_ADDRESS, setPhilips);
		})();
	}, []);

	async function connectToLeaf() {
		saveItem(StorageKeys.NANOLEAF.IP_ADDRESS, nanoleaf);
		const response = await api<{ auth_token: string }>(PATHS.nanoleaf.new, "NANOLEAF", {
			method: "POST",
		});
		if (response) {
			saveItem(StorageKeys.NANOLEAF.AUTH_TOKEN, response.auth_token);
		}
	}

	async function connectToPhilips() {
		saveItem(StorageKeys.PHILIPS.IP_ADDRESS, philips);
		const [response] = await api<[{ success: { username: string, clientkey: string, } }]>(PATHS.philips.api, "PHILIPS", {
			method: "POST",
			body: {
				devicetype: "app#my-device",
				generateclientkey: true,
			},
		});
		if (response) {
			saveItem(StorageKeys.PHILIPS.AUTH_TOKEN, response.success.username);
			saveItem(StorageKeys.PHILIPS.CLIENT_KEY, response.success.clientkey);
		}
	}

	return (
		<Page title={"Connect"}>
			<View style={tw`justify-center h-full`}>
				<View style={tw`shadow-lg bg-secondary-50 rounded m-2`}>
					<View style={tw`border-b border-gray-200 my-2 p-4 `}>
						<Text>Nanoleaf</Text>
						<TextInput style={tw`mb-3`} value={nanoleaf} onChangeText={setNanoleaf} placeholder="192.168.x.x" />
						<Button onPress={connectToLeaf} label="Connect" type="primary" disabled={nanoleafConnected} />
					</View>
					<View style={tw`p-4`}>
						<Text>Philips</Text>
						<TextInput style={tw`mb-3`} value={philips} onChangeText={setPhilips} placeholder="192.168.x.x" />
						<Button onPress={connectToPhilips} label="Connect" type="primary" disabled={philipsConnected} />
					</View>
				</View>
			</View>
		</Page>
	);
}

export default Connect;
