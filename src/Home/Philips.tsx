import React, { createContext, Dispatch, useContext, useEffect, useReducer, useState } from "react";
import { View } from "react-native";
import { Integration, useObject } from "../Database";
import useApi, { ROUTES } from "../hooks/use-api";
import tw from "../tailwind";
import Pressable from "../ui/Pressable";
import Text from "../ui/Text";
import { StorageKeys } from "../utils/localStorage";
import { Info } from "../utils/api/PhilipsTypes";
import Slider from "../ui/Slider";
import Card from "../ui/Card";
import Chips from "../ui/Chips";
import Toggle from "../ui/Toggle";

interface State {
	info: Info | null;
}

enum ActionTypes {
	SetInformation,
}

type Actions = { type: ActionTypes.SetInformation; info: any | null };

const reducers: { [P in ActionTypes]: (state: State, action: Extract<Actions, { type: P }>) => State } = {
	[ActionTypes.SetInformation]: (state, action) => ({ ...state, info: action.info }),
};

const PhilipsContext = createContext<[State, Dispatch<Actions>] | null>(null);

function usePhilipsContext() {
	const context = useContext(PhilipsContext);

	if (context == null) {
		throw Error();
	}

	return context;
}

export default function Wrapper() {
	const [state, dispatch] = useReducer((state: State, action: Actions) => reducers[action.type](state, action), {
		info: null,
	});

	return (
		<PhilipsContext.Provider value={[state, dispatch]}>
			<Philips />
		</PhilipsContext.Provider>
	);
}

function Philips() {
	const authToken = useObject(Integration, StorageKeys.PHILIPS.AUTH_TOKEN)?.value || "";
	const ipAddress = useObject(Integration, StorageKeys.PHILIPS.IP_ADDRESS)?.value || "";
	const clientKey = useObject(Integration, StorageKeys.PHILIPS.CLIENT_KEY)?.value || "";

	const [info] = useApi<Info>(ROUTES.philips.api, "PHILIPS", { method: "GET" });
	const [, dispatch] = usePhilipsContext();

	useEffect(() => {
		dispatch({ type: ActionTypes.SetInformation, info });
	}, [info]);

	return (
		<Card>
			<Text style={tw`font-bold`}>Philips Hue</Text>
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

			<Information />
		</Card>
	);
}

function Information() {
	const [state] = usePhilipsContext();

	if (state.info == null) {
		return null;
	}

	return (
		<View>
			<View>
				{Object.keys(state.info.groups).map((key) => (
					<Group key={key} id={key} />
				))}
				{Object.keys(state.info.lights).map((key) => (
					<Light key={state.info?.lights[key].uniqueid} id={key} />
				))}
			</View>
		</View>
	);
}

function Group({ id }: { id: string }) {
	const [state] = usePhilipsContext();

	const group = state.info?.groups[id];

	if (state.info == null || group == null || group?.type !== "Room") {
		return null;
	}

	return (
		<View style={tw`pb-2`}>
			<View style={tw`flex flex-row items-center justify-between`}>
			<Text>{group.name}</Text>
				<View>
					<Power endpoint={ROUTES.philips.group.setAction(id)} />
				</View>
			</View>
			<View style={tw`pb-2`}>
				<Scenes endpoint={ROUTES.philips.group.setAction(id)} />
			</View>
			<View>
				<Controls endpoint={ROUTES.philips.group.setAction(id)} />
			</View>
		</View>
	);
}

function Light({ id }: { id: string }) {
	const [state] = usePhilipsContext();
	const info = state.info?.lights[id];

	if (info == null) {
		return null;
	}

	return (
		<View>
			<View style={tw`flex flex-row items-center justify-between`}>
				<Text>{info.name}</Text>
				<View>
					<Power endpoint={ROUTES.philips.light.set(id)} />
				</View>
			</View>
			<Controls endpoint={ROUTES.philips.light.set(id)} />
		</View>
	);
}

function Scenes({ endpoint }: { endpoint: unknown }) {
	const [state] = usePhilipsContext();
	const [selected, setSelected] = useState<string | null>("none");

	useApi(endpoint, "PHILIPS", { method: "PUT", body: JSON.stringify({ scene: selected }) });

	if (state.info == null) {
		return null;
	}

	const options: { id: string; name: string }[] = Object.keys(state.info.scenes).reduce(
		(carry, value) => [...carry, { id: value, name: state.info?.scenes[value].name }],
		[]
	);

	options.push({ name: "none", id: "none" });

	return (
		<Chips options={options}>
			{({ id, name }) => (
				<Chips.Chip value={id} key={id} selected={selected === id} onPress={setSelected}>
					<Text>{name}</Text>
				</Chips.Chip>
			)}
		</Chips>
	);
}

function Power({ endpoint }: { endpoint: unknown}) {
	const [state] = usePhilipsContext();
	const [on, setOn] = useState(false);

	useApi(endpoint, "PHILIPS", { method: "PUT", body: JSON.stringify({ on }) });

	// const jr = JSON.stringify(info);

	// useEffect(() => {
	// 	if (info == null) {
	// 		return;
	// 	}
	// 	setOn(info.state.on);
	// }, [jr]);

	const type = on ? "filled" : "tonal";

	// if (info == null) {
	// 	return null;
	// }

	return (
		<Pressable type={type} onPress={() => setOn((o) => !o)}>
			<Text style={Pressable.text({ type })}>{on ? "On" : "Off"}</Text>
		</Pressable>
	);
}

function Controls({ endpoint }: { endpoint: unknown }) {
	const [state] = usePhilipsContext();
	const [bri, setBri] = useState(0);
	const [hue, setHue] = useState(0);
	const [sat, setSat] = useState(0);
	const [ct, setCt] = useState(0);
	const [effect, setEffect] = useState<"none" | "colorloop">("none");

	useApi(endpoint, "PHILIPS", { method: "PUT", body: JSON.stringify({ bri }) });
	useApi(endpoint, "PHILIPS", { method: "PUT", body: JSON.stringify({ hue }) });
	useApi(endpoint, "PHILIPS", { method: "PUT", body: JSON.stringify({ ct }) });
	useApi(endpoint, "PHILIPS", { method: "PUT", body: JSON.stringify({ sat }) });
	useApi(endpoint, "PHILIPS", { method: "PUT", body: JSON.stringify({ effect }) });

	// const jState = JSON.stringify(state.info?.lights[id].state);
	// useEffect(() => {
	// 	if (state.info == null) {
	// 		return;
	// 	}

	// 	setBri(state.info.lights[id].state.bri);
	// 	setSat(state.info.lights[id].state.sat);
	// 	setCt(state.info.lights[id].state.ct);
	// 	setHue(state.info.lights[id].state.hue);
	// 	setEffect(state.info.lights[id].state.effect);
	// }, [jState]);

	if (state.info == null) {
		return null;
	}

	return (
		<View>
			<View>
				<Toggle options={["none", "colorloop"]}>
					<Toggle.Left value={"none"} selected={"none" === effect} onPress={setEffect}>
						<Text>None</Text>
					</Toggle.Left>
					<Toggle.Right value={"colorloop"} selected={"colorloop" === effect} onPress={setEffect}>
						<Text>colorloop</Text>
					</Toggle.Right>
				</Toggle>
				<Slider label="Brightness" value={bri} onValueChange={setBri} minimumValue={1} maximumValue={254} step={1} />
				<Slider label="Hue" value={hue} onValueChange={setHue} minimumValue={0} maximumValue={65535} step={1} />
				<Slider
					label="Color Temperature"
					value={ct}
					onValueChange={setCt}
					minimumValue={153}
					maximumValue={500}
					step={1}
				/>
				<Slider label="Saturation" value={sat} onValueChange={setSat} minimumValue={0} maximumValue={254} step={1} />
			</View>
		</View>
	);
}
