import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import api, { PATHS } from "../utils/api";
import { saveItem, StorageKeys, getItem } from "../utils/localStorage";
import tw from "../tailwind";
import Page from "../ui/Page";
import Text from "../ui/Text";
import { useHistory } from "react-router-native";

type Response = {
	auth_token: string;
};

function Connect() {
	const history = useHistory();
	const [ip, setIp] = useState("");

	useEffect(() => {
		const getIp = async () => {
			const storageIp = await getItem(StorageKeys.NANOLEAF_IP_ADDRESS);
			if (storageIp) {
				setIp(storageIp);
			}
		};
		getIp();
	}, []);

	async function connectToLeaf() {
		saveItem(StorageKeys.NANOLEAF_IP_ADDRESS, ip);
		const response = await api<Response>(PATHS.new, {
			method: "POST",
		});
		if (response) {
			saveItem(StorageKeys.AUTH_TOKEN, response.auth_token);
			history.push("/");
		}
	}

	return (
		<Page title={<Text style={tw`text-primary-900 text-center text-lg font-bold`}>Connect</Text>}>
			<View style={tw`justify-center h-full px-2`}>
				<TextInput style={tw`mb-3`} value={ip} onChangeText={setIp} placeholder="192.168.x.x" />
				<Button onPress={connectToLeaf} label="Connect" type="primary" />
			</View>
		</Page>
	);
}

export default Connect;
