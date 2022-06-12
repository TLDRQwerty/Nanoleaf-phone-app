import React, { Suspense, useEffect } from "react";
import { View } from "react-native";
import produce from "immer";
import create from "zustand";
import { useQuery, useMutation } from "react-query";
import Card from "../ui/Card";
import Text from "../ui/Text";
import Chips from "../ui/Chips";
import Slider from "../ui/Slider";
import Switch from "../ui/Switch";
import { useError } from "../ui/ErrorBoundary";
import useLocalStorage from "../hooks/use-local-storage";
import { StorageKeys, getItem } from "../utils/localStorage";
import { Info, State as NanoleafState } from "../utils/api/NanoleafTypes";
import tw from "../tailwind";

interface State {
	info: Info | null;
	setInfo: (info: Info) => void;
}

const useStore = create<State>()((set) => ({
	info: null,
	setInfo: (info) => set((state) => ({ ...state, info })),
}));

function Nanoleaf() {
	const { setInfo } = useStore((s) => ({ setInfo: s.setInfo }));
	const renderError = useError();

	const { data, isError, error } = useQuery<Info>(
		"NANOLEAF-INFO",
		async () => {
			const ip = await getItem(StorageKeys.NANOLEAF.IP_ADDRESS);
			const auth = await getItem(StorageKeys.NANOLEAF.AUTH_TOKEN);

			const d = await fetch(`http://${ip}:16021/api/v1/${auth}/`);
			return await d.json();
		},
		{ suspense: true }
	);

	useEffect(() => {
		if (data != null) {
			setInfo(data);
		}
	}, []);

	if (isError) {
		renderError({ title: "An error occured fetching the data", description: <Text>{JSON.stringify(error)}</Text> });
	}

	if (data == null) {
		return <Text>Nothing</Text>;
	}
	return (
		<View>
			<View style={tw`flex-row justify-between`}>
				<Text>{data.name}</Text>
				<Power />
			</View>
			<Effects />
			<Controls />
		</View>
	);
}

function Power() {
	const renderError = useError();

	const { power, setInfo, info } = useStore((s) => ({
		power: s.info?.state?.on.value,
		setInfo: s.setInfo,
		info: s.info,
	}));

	const mutation = useMutation(
		async (value) => {
			const ip = await getItem(StorageKeys.NANOLEAF.IP_ADDRESS);
			const auth = await getItem(StorageKeys.NANOLEAF.AUTH_TOKEN);
			return fetch(`http://${ip}:16021/api/v1/${auth}/state`, {
				method: "PUT",
				body: JSON.stringify({ on: { value: !value } }),
			});
		},
		{
			onSuccess: () => {
				setInfo(
					produce<Info>(info, (i) => {
						i.state.on.value = !power;
					})
				);
			},
			onError: () => {
				renderError({ title: "Failed to toggle power" });
			},
		}
	);

	if (power == null) {
		return null;
	}

	return <Switch value={power} onValueChange={() => mutation.mutate(power)} />;
}

function Effects() {
	const { effectsList, select, setInfo, info } = useStore((s) => ({
		effectsList: s.info?.effects.effectsList,
		select: s.info?.effects.select,
		setInfo: s.setInfo,
		info: s.info,
	}));
	const renderError = useError();

	const mutation = useMutation(
		async (s) => {
			const ip = await getItem(StorageKeys.NANOLEAF.IP_ADDRESS);
			const auth = await getItem(StorageKeys.NANOLEAF.AUTH_TOKEN);
			return fetch(`http://${ip}:16021/api/v1/${auth}/effects`, {
				method: "PUT",
				body: JSON.stringify({ select: s }),
			});
		},
		{
			onSuccess: (_, variables, __) => {
				setInfo(
					produce<Info>(info, (i) => {
						i.effects.select = variables;
					})
				);
			},
			onError: () => {
				renderError({ title: "Failed to set effect" });
			},
		}
	);

	if (effectsList == null) {
		return null;
	}

	return (
		<Chips options={effectsList} value={select}>
			{(v) => (
				<Chips.Chip key={v} value={v} onPress={() => mutation.mutate(v)}>
					<Text>{v}</Text>
				</Chips.Chip>
			)}
		</Chips>
	);
}

function Controls() {
	const renderError = useError();

	const { state, setInfo, info } = useStore((s) => ({ state: s.info?.state, setInfo: s.setInfo, info: s.info }));

	const mutation = useMutation(
		async ({ key, value }: { key: keyof Omit<NanoleafState, "on" | "colorMode">; value: any }) => {
			const ip = await getItem(StorageKeys.NANOLEAF.IP_ADDRESS);
			const auth = await getItem(StorageKeys.NANOLEAF.AUTH_TOKEN);
			return fetch(`http://${ip}:16021/api/v1/${auth}/state`, {
				method: "PUT",
				body: JSON.stringify({ [key]: { value: value } }),
			});
		},
		{
			onSuccess: (_, { key, value }) => {
				setInfo(
					produce<Info>(info, (i) => {
						i.state[key].value = value;
					})
				);
			},
			onError: () => {
				renderError({ title: "Failed to toggle thing" });
			},
		}
	);

	if (state == null) {
		return null;
	}

	return (
		<View>
			<Slider
				label="Brightness"
				value={state.brightness.value}
				onValueChange={(value) => mutation.mutate({ key: "brightness", value })}
				minimumValue={0}
				maximumValue={100}
				step={1}
			/>
			<Slider
				label="Hue"
				value={state.hue.value}
				onValueChange={(value) => mutation.mutate({ key: "hue", value })}
				minimumValue={0}
				maximumValue={360}
				step={1}
			/>
			<Slider
				label="Color Temperature"
				value={state.ct.value}
				onValueChange={(value) => mutation.mutate({ key: "ct", value })}
				minimumValue={1200}
				maximumValue={6500}
				step={1}
			/>
			<Slider
				label="Saturation"
				value={state.sat.value}
				onValueChange={(value) => mutation.mutate({ key: "sat", value })}
				minimumValue={0}
				maximumValue={100}
				step={1}
			/>
		</View>
	);
}

export default function Loader() {
	const [auth] = useLocalStorage(StorageKeys.NANOLEAF.AUTH_TOKEN, null);
	const [ip] = useLocalStorage(StorageKeys.NANOLEAF.IP_ADDRESS, null);

	if (auth == null || ip == null) {
		return (
			<Card>
				<Text>Click the 'connect' button to login to the device</Text>
			</Card>
		);
	}
	return (
		<Card>
			<Suspense fallback={<Text>Loading...</Text>}>
				<Nanoleaf />
			</Suspense>
		</Card>
	);
}
