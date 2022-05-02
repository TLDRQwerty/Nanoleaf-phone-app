import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import useLocalStorage from "../hooks/use-local-storage";
import tw from "../tailwind";
import api, { PATHS } from "../utils/api/api";
import { Info } from "../utils/api/NanoleafTypes";
import { StorageKeys } from "../utils/localStorage";

export default function Nanoleaf() {
	const [info, setInfo] = useState<Info | null>(null);
	const [authToken] = useLocalStorage(StorageKeys.NANOLEAF.AUTH_TOKEN);
	const [ipAddress] = useLocalStorage(StorageKeys.NANOLEAF.IP_ADDRESS);

	useEffect(() => {
		(async () => {
			const response = await api<Info>(PATHS.nanoleaf.info, "NANOLEAF", { method: "GET" });
			if (response) {
				setInfo(response);
			}
		})();
	}, []);

	if (info == null) {
		return null;
	}

	return (
		<View style={tw`p-4 m-4 bg-gray-50 rounded shadow`}>
			<Text style={tw`text-center text-primary-800 font-bold`}>{info.name}</Text>
			<Text style={tw`text-xs`}>
				<Text>Auth Token: </Text>
				<Text>{authToken}</Text>
			</Text>
			<Text style={tw`text-xs`}>
				<Text>IP Address: </Text>
				<Text>{ipAddress}</Text>
			</Text>
			<View style={tw`pl-2`}>
				<Text>Status</Text>
				{Object.keys(info.state).map((key) => (
					<View style={tw`pl-2`}>
						<View style={tw`flex-row`}>
							<Text style={tw`pr-2 capitalize`}>{key}</Text>
							<Text>{typeof info.state[key] === "string" ? info.state[key] : String(info.state[key].value)}</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	);
}
