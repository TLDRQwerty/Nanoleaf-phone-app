import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import api, { PATHS } from "../utils/api";
import { saveItem, StorageKeys, getItem } from "../utils/localStorage";
import tw from "../tailwind";

type Response = {
	auth_token: string;
};

function Connect() {
	const [ip, setIp] = useState("");

	useEffect(() => {
		const getIp = async () => {
			const ip = await getItem(StorageKeys.NANOLEAF_IP_ADDRESS);
			setIp(ip);
		};
		getIp();
	}, []);

	async function connectToLeaf() {
		saveItem(StorageKeys.NANOLEAF_IP_ADDRESS, ip);
		const response = await api<Response>(PATHS.new, {
			method: "POST",
		});
		saveItem(StorageKeys.AUTH_TOKEN, response?.auth_token || "");
	}

	return (
		<View>
			<Text>Connect</Text>
			<View style={tw`flex-row justify-between`}>
				<TextInput style={tw`flex-1 mr-3`} value={ip} onChangeText={setIp} placeholder="192.168.x.x" />
				<Button onPress={connectToLeaf}>
					<Text style={tw`text-center text-white`}>Connect</Text>
				</Button>
			</View>
		</View>
	);
}

export default Connect;
