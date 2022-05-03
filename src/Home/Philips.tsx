import React from "react";
import { View, Text } from "react-native";
import { Integration, useObject } from "../Database";
import useInfo from "../hooks/queries/philips/use-info";
import tw from "../tailwind";
import { StorageKeys } from "../utils/localStorage";

export default function Philips() {
	const authToken = useObject(Integration, StorageKeys.PHILIPS.AUTH_TOKEN)?.value || "";
	const ipAddress = useObject(Integration, StorageKeys.PHILIPS.IP_ADDRESS)?.value || "";
	const clientKey = useObject(Integration, StorageKeys.PHILIPS.CLIENT_KEY)?.value || "";

	const info = useInfo()

	return (
		<View style={tw`shadow rounded bg-gray-50 p-4 m-4`}>
			<Text style={tw`text-center text-primary-800 font-bold`}>Philips Hue</Text>
			<Text style={tw`text-xs`}>
				<Text>IP Address: </Text>
				<Text>{ipAddress}</Text>
			</Text>
			<Text style={tw`text-xs`}>
				<Text>Client Key: </Text>
				<Text>{clientKey}</Text>
			</Text>
			<Text style={tw`text-xs`}>
				<Text>Auth Token: </Text>
				<Text>{authToken}</Text>
			</Text>

			<Text>{}</Text>
		</View>
	);
}
