import React, { createContext, Dispatch, useContext, useEffect, useReducer, useState } from "react";
import { View } from "react-native";
import { Integration, useObject } from "../Database";
import tw from "../tailwind";
import Text from "../ui/Text";
import Pressable from "../ui/Pressable";
import { StorageKeys } from "../utils/localStorage";
import useApi, { ROUTES } from "../hooks/use-api";
import { Info } from "../utils/api/NanoleafTypes";
import Chips from "../ui/Chips";
import Slider from "../ui/Slider";
import Card from "../ui/Card";

interface State {
	info: Info | null;
}

enum ActionTypes {
	SetInformation,
}

type Actions = { type: ActionTypes.SetInformation; info: Info | null };

const reducers: { [P in ActionTypes]: (state: State, action: Extract<Actions, { type: P }>) => State } = {
	[ActionTypes.SetInformation]: (state, action) => ({ ...state, info: action.info }),
};

const NanoleafContext = createContext<[State, Dispatch<Actions>] | null>(null);

function useNanoleafContext() {
	const context = useContext(NanoleafContext);

	if (context == null) {
		throw Error();
	}
	return context;
}

export default function ContextWrapper() {
	const [state, dispatch] = useReducer((state: State, action: Actions) => reducers[action.type](state, action), {
		info: null,
	});

	return (
		<NanoleafContext.Provider value={[state, dispatch]}>
			<Nanoleaf />
		</NanoleafContext.Provider>
	);
}

function Nanoleaf() {
	const authToken = useObject(Integration, StorageKeys.NANOLEAF.AUTH_TOKEN)?.value || "";
	const ipAddress = useObject(Integration, StorageKeys.NANOLEAF.IP_ADDRESS)?.value || "";

	const [info] = useApi<Info>(ROUTES.NANOLEAF.info, "NANOLEAF", { method: "GET" });
	const [, dispatch] = useNanoleafContext();

	useEffect(() => {
		dispatch({ type: ActionTypes.SetInformation, info: info });
	}, [info]);

	return (
		<Card>
			<View style={tw`flex-row flex flex-1 justify-between items-center`}>
				<Text style={tw`text-center font-bold`}>Nanoleaf</Text>
				<View>
					<Power />
				</View>
			</View>
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

			<Information />
		</Card>
	);
}

function Power() {
	const [state] = useNanoleafContext();
	const [on, setOn] = useState(state.info?.state.on.value || false);

	useApi(ROUTES.NANOLEAF.state, "NANOLEAF", { method: "PUT", body: JSON.stringify({ on: { value: !on } }) });

	if (state.info == null) {
		return null;
	}

	const type = on ? "filled" : "tonal";

	return (
		<Pressable style={tw`mb-2`} type={type} onPress={() => setOn((p) => !p)}>
			<Text style={Pressable.text({ type })}>{on ? "On" : "Off"}</Text>
		</Pressable>
	);
}

function Information() {
	const [state] = useNanoleafContext();

	if (state.info == null) {
		return null;
	}

	return (
		<View style={tw`flex-1`}>
			<View style={tw`mb-2`}>
				<Text>{state.info.name}</Text>
			</View>
			<Effects />

			<Controls />
		</View>
	);
}

function Effects() {
	const [state] = useNanoleafContext();
	const effects = state.info?.effects;
	const [selected, setSelected] = useState(effects?.select || null);

	useApi(ROUTES.NANOLEAF.effects, "NANOLEAF", { method: "PUT", body: JSON.stringify({ select: selected }) });

	if (effects?.effectsList == null) {
		return null;
	}

	return (
		<Chips options={effects.effectsList}>
			{(v) => (
				<Chips.Chip key={v} value={v} selected={v === selected} onPress={setSelected}>
					<Text>{v}</Text>
				</Chips.Chip>
			)}
		</Chips>
	);
}

function Controls() {
	const [state] = useNanoleafContext();
	const r = state.info?.state;
	const [brightness, setBrightness] = useState(r?.brightness.value || 0);
	const [colorTemperature, setColorTemperature] = useState(r?.ct.value || 0);
	const [hue, setHue] = useState(r?.hue.value || 0);
	const [saturation, setSaturation] = useState(r?.sat.value || 0);

	const jr = JSON.stringify(r);
	useEffect(() => {
		if (r == null) {
			return;
		}
		setBrightness(r?.brightness.value);
		setColorTemperature(r?.ct.value);
		setHue(r?.hue.value);
		setSaturation(r?.sat.value);
	}, [jr]);

	useApi(ROUTES.NANOLEAF.state, "NANOLEAF", {
		method: "PUT",
		body: JSON.stringify({
			brightness: {
				value: brightness,
			},
		}),
	});
	useApi(ROUTES.NANOLEAF.state, "NANOLEAF", {
		method: "PUT",
		body: JSON.stringify({
			hue: {
				value: hue,
			},
		}),
	});
	useApi(ROUTES.NANOLEAF.state, "NANOLEAF", {
		method: "PUT",
		body: JSON.stringify({
			sat: {
				value: saturation,
			},
		}),
	});
	useApi(ROUTES.NANOLEAF.state, "NANOLEAF", {
		method: "PUT",
		body: JSON.stringify({
			ct: {
				value: colorTemperature,
			},
		}),
	});

	if (r == null) {
		return null;
	}
	return (
		<View>
			<View>
				<Slider
					label="Brightness"
					value={brightness}
					onValueChange={setBrightness}
					minimumValue={0}
					maximumValue={100}
					step={1}
				/>
				<Slider label="Hue" value={hue} onValueChange={setHue} minimumValue={0} maximumValue={360} step={1} />
				<Slider
					label="Color Temperature"
					value={colorTemperature}
					onValueChange={setColorTemperature}
					minimumValue={1200}
					maximumValue={6500}
					step={1}
				/>
				<Slider
					label="Saturation"
					value={saturation}
					onValueChange={setSaturation}
					minimumValue={0}
					maximumValue={100}
					step={1}
				/>
			</View>
		</View>
	);
}
