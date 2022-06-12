import React from "react";
import { View } from "react-native";
import { useMutation } from "react-query";
import Pressable from "../ui/Pressable";
import TextInput from "../ui/TextInput";
import { StorageKeys } from "../utils/localStorage";
import tw from "../tailwind";
import Page from "../ui/Page";
import Text from "../ui/Text";
import Card from "../ui/Card";
import useLocalStorage from "../hooks/use-local-storage";
import { useError } from "../ui/ErrorBoundary";

function Connect() {
	return (
		<Page title={"Connect"}>
			<View style={tw`m-4 my-auto`}>
				<Card>
					<View>
						<View style={tw`p-4`}>
							<Nanoleaf />
						</View>
					</View>
					<View style={tw`p-4`}>
						<Philips />
					</View>
				</Card>
			</View>
		</Page>
	);
}

function Nanoleaf() {
	const [ip, setIp] = useLocalStorage(StorageKeys.NANOLEAF.IP_ADDRESS, "");
	const [, setAuth] = useLocalStorage(StorageKeys.NANOLEAF.AUTH_TOKEN, "");

	const mutation = useMutation(
		() => {
			return fetch(`http://${ip}:16021/api/v1/new`, {
				method: "POST",
			});
		},
		{
			onSuccess: async (data) => {
				const json = await data.json();
				setAuth(json.auth_token);
			},
		}
	);

	return (
		<>
			<Text>Nanoleaf</Text>
			<TextInput style={tw`mb-3`} value={ip} onChangeText={setIp} placeholder="192.168.x.x" />
			<Pressable type="outline" onPress={() => mutation.mutate()}>
				<Text style={tw.style(Pressable.text({ type: "outline" }))}>Connect</Text>
			</Pressable>
		</>
	);
}

function Philips() {
	const [ip, setIp] = useLocalStorage(StorageKeys.PHILIPS.IP_ADDRESS, "");
	const [, setAuth] = useLocalStorage(StorageKeys.PHILIPS.AUTH_TOKEN, "");
	const [, clientkey] = useLocalStorage(StorageKeys.PHILIPS.CLIENT_KEY, "");

	const mutation = useMutation(
		() => {
			return fetch(`http://${ip}/api`, {
				method: "POST",
				body: JSON.stringify({
					devicetype: "app_name#instance_name",
					generateclientkey: true,
				}),
			});
		},
		{
			onSuccess: async (data) => {
				const json = await data.json();
				const values = json.pop();
				setAuth(values.success.username);
				setClientKey(values.success.clientkey);
			},
		}
	);

	return (
		<>
			<Text>Philips</Text>
			<TextInput style={tw`mb-3`} value={ip} onChangeText={setIp} placeholder="192.168.x.x" />
			<Pressable type="outline" onPress={() => mutation.mutate()}>
				<Text style={tw.style(Pressable.text({ type: "outline" }))}>Connect</Text>
			</Pressable>
		</>
	);
}

export default Connect;
