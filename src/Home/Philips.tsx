import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Integration, useObject } from "../Database";
import useInfo from "../hooks/queries/philips/use-info";
import useApi, { PATHS } from "../hooks/use-api";
import tw from "../tailwind";
import Pressable from "../ui/Pressable";
import { StorageKeys } from "../utils/localStorage";

export default function Philips() {
	const authToken = useObject(Integration, StorageKeys.PHILIPS.AUTH_TOKEN)?.value || "";
	const ipAddress = useObject(Integration, StorageKeys.PHILIPS.IP_ADDRESS)?.value || "";
	const clientKey = useObject(Integration, StorageKeys.PHILIPS.CLIENT_KEY)?.value || "";

	const [info] = useApi(PATHS.philips.devices, "PHILIPS", { method: "GET" });
	console.log({ info });

	useEffect(() => {
		var request = new XMLHttpRequest();
		request.onreadystatechange = (e) => {
			if (request.readyState !== 4) {
				return;
			}
			console.log({ request })

			if (request.status === 200) {
				console.log("success", request.responseText);
			} else {
				console.warn("error");
			}
		};
	request.onerror = (e) => console.log(e)
	request.open("GET", `https://192.168.0.204/clip/v2/resource/device`);
	request.send();

	});

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
		</View>
	);
}
