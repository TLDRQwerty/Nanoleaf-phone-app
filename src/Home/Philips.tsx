import React, { Suspense, useEffect } from "react";
import { View } from "react-native";
import produce from "immer";
import { useQuery, useMutation } from "react-query";
import create from "zustand";
import Text from "../ui/Text";
import Card from "../ui/Card";
import Switch from "../ui/Switch";
import Toggle from "../ui/Toggle";
import Slider from "../ui/Slider";
import { Info, State as PhilipsState } from "../utils/api/PhilipsTypes";
import { getItem, StorageKeys } from "../utils/localStorage";
import tw from "../tailwind";
import { useError } from "../ui/ErrorBoundary";

interface State {
	info: Info;
	setInfo: (info: Info) => void;
}

const useStore = create<State>()((set) => ({
	info: null,
	setInfo: (info) => set((s) => ({ ...s, info })),
}));

function Philips() {
	const { setInfo } = useStore((s) => ({ setInfo: s.setInfo }));
	const { data } = useQuery("PHILIPS-INFO", async () => {
		const ip = await getItem(StorageKeys.PHILIPS.IP_ADDRESS);
		const auth = await getItem(StorageKeys.PHILIPS.AUTH_TOKEN);
		const d = await fetch(`http://${ip}/api/${auth}/`);
		return await d.json();
	});

	useEffect(() => {
		setInfo(data);
	}, [data, setInfo]);

	if (data == null) {
		return null;
	}

	return (
		<>
			<Groups />
			<Lights />
		</>
	);
}

function Groups() {
	const { groups } = useStore((s) => ({ groups: s.info?.groups }));
	if (groups == null) {
		return null;
	}
	const g = Object.values(groups).filter((g) => g.type === "Room");
	return <>{groups != null ? g.map((_, idx) => <Group id={idx + 1} key={idx + 1} />) : null}</>;
}

function Group({ id }: { id: string | number }) {
	const { group, setInfo, info } = useStore((s) => ({ group: s.info.groups[id], setInfo: s.setInfo, info: s.info }));
	const renderError = useError();
	const mutation = useMutation(
		async ({ key, value }: { key: keyof Omit<PhilipsState, "reachable">; value: string | number | boolean }) => {
			const ip = await getItem(StorageKeys.PHILIPS.IP_ADDRESS);
			const auth = await getItem(StorageKeys.PHILIPS.AUTH_TOKEN);
			return fetch(`http://${ip}/api/${auth}/groups/${id}/action`, {
				method: "PUT",
				body: JSON.stringify({ [key]: value }),
			});
		},
		{
			onSuccess: (_, { key, value }) => {
				setInfo(
					produce<Info>(info, (i) => {
						i.groups[id].action[key] = value;
					})
				);
			},
			onError: (error) => {
				renderError({ title: "An error occurred", description: <Text> {JSON.stringify(error)}</Text> });
			},
		}
	);

	return (
		<View>
			<View style={tw`flex-row justify-between`}>
				<Text>{group.name}</Text>
				<Power value={group.action.on} onValueChange={(value) => mutation.mutate({ key: "on", value })} />
			</View>
			<Controls value={group.action} onValueChange={(key, value) => mutation.mutate({ key, value })} />
		</View>
	);
}

function Lights() {
	const { lights } = useStore((s) => ({ lights: s.info?.lights }));
	return <>{lights != null ? Object.keys(lights).map((id) => <Light id={id} key={id} />) : null}</>;
}

function Light({ id }: { id: string | number }) {
	const { light, setInfo, info } = useStore((s) => ({ light: s.info.lights[id], setInfo: s.setInfo, info: s.info }));
	const renderError = useError();
	const mutation = useMutation(
		async ({ key, value }: { key: keyof Omit<PhilipsState, "reachable">; value: string | number | boolean }) => {
			const ip = await getItem(StorageKeys.PHILIPS.IP_ADDRESS);
			const auth = await getItem(StorageKeys.PHILIPS.AUTH_TOKEN);
			return fetch(`http://${ip}/api/${auth}/lights/${id}/state`, {
				method: "PUT",
				body: JSON.stringify({ [key]: value }),
			});
		},
		{
			onSuccess: (_, { key, value }) => {
				setInfo(
					produce<Info>(info, (i) => {
						i.lights[id].state[key] = value;
					})
				);
			},
			onError: (error) => {
				renderError({ title: "An error occurred", description: <Text> {JSON.stringify(error)}</Text> });
			},
		}
	);

	return (
		<View>
			<View style={tw`flex-row justify-between`}>
				<Text>{light.name}</Text>
				<Power value={light.state.on} onValueChange={(value) => mutation.mutate({ key: "on", value })} />
			</View>
			<Controls value={light.state} onValueChange={(key, value) => mutation.mutate({ key, value })} />
		</View>
	);
}

function Power({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) {
	return <Switch value={value} onValueChange={onValueChange} />;
}

function Controls({ value, onValueChange }: { value: PhilipsState; onValueChange: (key: any, value: any) => void }) {
	return (
		<View>
			<Toggle options={["none", "colorloop"]} value={value.effect}>
				<Toggle.Left value={"none"} onPress={(v) => onValueChange("effect", v)}>
					<Text>None</Text>
				</Toggle.Left>
				<Toggle.Right value={"colorloop"} onPress={(v) => onValueChange("effect", v)}>
					<Text>colorloop</Text>
				</Toggle.Right>
			</Toggle>
			<Slider
				label="Brightness"
				value={value.bri}
				onValueChange={(v) => onValueChange("bri", v)}
				minimumValue={1}
				maximumValue={254}
				step={1}
			/>
			<Slider
				label="Hue"
				value={value.hue}
				onValueChange={(v) => onValueChange("hue", v)}
				minimumValue={0}
				maximumValue={65535}
				step={1}
			/>
			<Slider
				label="Color Temperature"
				value={value.ct}
				onValueChange={(v) => onValueChange("ct", v)}
				minimumValue={153}
				maximumValue={500}
				step={1}
			/>
			<Slider
				label="Saturation"
				value={value.sat}
				onValueChange={(v) => onValueChange("sat", v)}
				minimumValue={0}
				maximumValue={254}
				step={1}
			/>
		</View>
	);
}

export default function Loader() {
	return (
		<Card>
			<Suspense fallback={<Text>Loading</Text>}>
				<Philips />
			</Suspense>
		</Card>
	);
}
