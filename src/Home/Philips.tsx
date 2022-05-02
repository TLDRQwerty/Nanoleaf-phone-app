import React, { useEffect, useState } from "react";
import { View, Text, RefreshControlComponent, Pressable } from "react-native";
import On from "../Controls/On";
import useLocalStorage from "../hooks/use-local-storage";
import tw from "../tailwind";
import api, { PATHS } from "../utils/api/api";
import {
	BehaviorScript,
	Bridge,
	BridgeHome,
	Device,
	Entertainment,
	Geolocation,
	GroupedLight,
	Homekit,
	Light,
	Room,
	Scene,
	ZigbeeConnectivity,
} from "../utils/api/PhilipsTypes";
import { StorageKeys } from "../utils/localStorage";

type Response = Array<
	| BehaviorScript
	| Bridge
	| BridgeHome
	| Device
	| Entertainment
	| GroupedLight
	| Homekit
	| Light
	| Scene
	| ZigbeeConnectivity
>;

export default function Philips() {
	const [info, setInfo] = useState<null | {
		behavior_script: Array<BehaviorScript>;
		bridge: Array<Bridge>;
		bridge_home: Array<BridgeHome>;
		device: Array<Device>;
		entertainment: Array<Entertainment>;
		geolocation: Array<Geolocation>;
		room: Array<Room>;
		grouped_light: Array<GroupedLight>;
		homekit: Array<Homekit>;
		light: Array<Light>;
		scene: Array<Scene>;
		zigbee_connectivity: Array<ZigbeeConnectivity>;
	}>(null);
	const [authToken] = useLocalStorage(StorageKeys.PHILIPS.AUTH_TOKEN);
	const [ipAddress] = useLocalStorage(StorageKeys.PHILIPS.IP_ADDRESS);

	useEffect(() => {
		(async () => {
			const response = await api<{ error: any; data: Response }>(PATHS.philips.devices, "PHILIPS", {
				method: "GET",
			});
			if (response) {
				setInfo(
					Object.values(response.data).reduce(
						(carry, data) => ({
							...carry,
							[data.type]: [...(carry[data.type] || []), data],
						}),
						{}
					)
				);
			}
		})();
	}, []);

	const handleOnOff = (id) => {
		api(PATHS.philips.change(id), "PHILIPS", {
			method: "PUT",
			body: {
				on: {
					on: true,
				},
			},
		});
	};

	if (info == null) {
		return null;
	}

	console.log(info);

	return (
		<View style={tw`shadow rounded bg-gray-50 p-4 m-4`}>
			<Text style={tw`text-center text-primary-800 font-bold`}>Philips Hue</Text>
			<Text style={tw`text-xs`}>
				<Text>Auth Token: </Text>
				<Text>{authToken}</Text>
			</Text>
			<Text style={tw`text-xs`}>
				<Text>IP Address: </Text>
				<Text>{ipAddress}</Text>
			</Text>
			<View>
				{info.light &&
					info.light.map((light) => (
						<Pressable onPress={() => handleOnOff(light.id)}>
							<Text>{String(light.on.on)}</Text>
						</Pressable>
					))}
			</View>
			<View>
				{info.room &&
					info.room.map((r) => (
						<View>
							<Text>{r.metadata.name}</Text>
							<View>
								{r.children.map((c) => (
									<Text>{info[c.rtype].find((d) => d.id === c.rid).metadata.name}</Text>
								))}
							</View>
						</View>
					))}
			</View>
		</View>
	);
}
