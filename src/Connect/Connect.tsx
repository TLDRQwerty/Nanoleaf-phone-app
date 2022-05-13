import React, { useEffect } from "react";
import { View } from "react-native";
import Pressable from "../ui/Pressable";
import TextInput from "../ui/TextInput";
import api from "../utils/api/api";
import { StorageKeys } from "../utils/localStorage";
import tw from "../tailwind";
import Page from "../ui/Page";
import Text from "../ui/Text";
import { Integration, useRealm } from "../Database";
import useFindOrCreate from "../hooks/use-find-or-create";

function Connect() {
	const realm = useRealm();
	const [nanoleaf, setNanoleaf] = useFindOrCreate(
		Integration,
		StorageKeys.NANOLEAF.IP_ADDRESS,
		{ key: StorageKeys.NANOLEAF.IP_ADDRESS, value: "" },
		(v, newValue) => (v.value = newValue)
	);
	const [philips, setPhilips] = useFindOrCreate(
		Integration,
		StorageKeys.PHILIPS.IP_ADDRESS,
		{ key: StorageKeys.PHILIPS.IP_ADDRESS, value: "" },
		(v, newValue) => (v.value = newValue)
	);

	const handleNanoleafPress = async () => {
		const response = await api<{ auth_token: string }>(`http://${nanoleaf.value}:16021/api/v1/new`, {
			method: "POST",
		});
		if (response) {
			realm.write(() => {
				realm.create(
					Integration,
					Integration.create({ key: StorageKeys.NANOLEAF.AUTH_TOKEN, value: response.auth_token })
				);
			});
		}
	};

	const handlePhilipsPress = async () => {
		const response = await api(`http://${philips.value}/api`, {
			method: "POST",
			body: JSON.stringify({
				devicetype: "app_name#instance_name",
				generateclientkey: true,
			}),
		});
		if (response) {
			const [value] = response;
			realm.write(() => {
				realm.create(
					Integration,
					Integration.create({ key: StorageKeys.PHILIPS.AUTH_TOKEN, value: value.success.username })
				);

				realm.create(
					Integration,
					Integration.create({ key: StorageKeys.PHILIPS.CLIENT_KEY, value: value.success.clientkey })
				);
			});
		}
	};

	return (
		<Page title={"Connect"}>
			<View style={tw`justify-center h-full`}>
				<View style={tw`shadow-lg bg-secondary-50 rounded m-2`}>
					<View style={tw`border-b border-gray-200 my-2 p-4 `}>
						<Text>Nanoleaf</Text>
						<TextInput style={tw`mb-3`} value={nanoleaf.value} onChangeText={setNanoleaf} placeholder="192.168.x.x" />
						<Pressable type="outline" onPress={handleNanoleafPress}>Connect</Pressable>
					</View>
					<View style={tw`p-4`}>
						<Text>Philips</Text>
						<TextInput style={tw`mb-3`} value={philips.value} onChangeText={setPhilips} placeholder="192.168.x.x" />
						<Pressable type="outline" onPress={handlePhilipsPress}>Connect</Pressable>
					</View>
				</View>
			</View>
		</Page>
	);
}

export default Connect;
