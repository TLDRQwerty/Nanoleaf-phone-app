import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Integration, useObject } from "../Database";
import tw from "../tailwind";
import api, { PATHS } from "../utils/api/api";
import { Info } from "../utils/api/NanoleafTypes";
import { StorageKeys } from "../utils/localStorage";

export default function Nanoleaf() {
	const authToken = useObject(Integration, StorageKeys.NANOLEAF.AUTH_TOKEN)?.value || "";
	const ipAddress = useObject(Integration, StorageKeys.NANOLEAF.IP_ADDRESS)?.value || "";

	return (
		<View style={tw`p-4 m-4 bg-gray-50 rounded shadow`}>
			<Text style={tw`text-center text-primary-800 font-bold`}>Nanoleaf</Text>
			<Text style={tw`text-xs`}>
				<Text>IP Address: </Text>
				<Text>{ipAddress}</Text>
			</Text>
			<Text style={tw`text-xs`}>
				<Text>Auth Token: </Text>
				<Text>{authToken}</Text>
			</Text>
		</View>
	);
}
