import React, { useState } from "react";
import { View } from "react-native";
import { Integration, useObject } from "../Database";
import useInfo from "../hooks/queries/nanoleaf/use-info";
import useTogglePower from "../hooks/queries/use-toggle-power";
import tw from "../tailwind";
import Text from "../ui/Text";
import Pressable from "../ui/Pressable";
import { StorageKeys } from "../utils/localStorage";

export default function Nanoleaf() {
	const authToken = useObject(Integration, StorageKeys.NANOLEAF.AUTH_TOKEN)?.value || "";
	const ipAddress = useObject(Integration, StorageKeys.NANOLEAF.IP_ADDRESS)?.value || "";
	const r = useInfo();
	const [on, setOn] = useState(r?.state.on.value || false);

	useTogglePower("NANOLEAF", { method: "PUT", body: JSON.stringify({ on: { value: !on } }) });

	return (
		<View style={tw`p-4 m-4 bg-gray-50 rounded shadow`}>
			<Text style={tw`text-center text-primary-800 font-bold`}>Nanoleaf</Text>
			<View style={tw`mb-4`}>
				<Text style={tw`text-xs`}>
					<Text>IP Address: </Text>
					<Text>{ipAddress}</Text>
				</Text>
				<Text style={tw`text-xs`}>
					<Text>Auth Token: </Text>
					<Text>{authToken}</Text>
				</Text>
			</View>

			{r && (
				<View>
					<Text>{r.name}</Text>
					<Pressable style={tw`flex-row`} onPress={() => setOn((p) => !p)}>
						<Text>Power: </Text>
						<Text>{on ? "On" : "Off"}</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
}
