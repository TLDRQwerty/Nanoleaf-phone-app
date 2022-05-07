import React, { createContext, Dispatch, useContext, useEffect, useReducer, useState } from "react";
import { View } from "react-native";
import { Integration, useObject } from "../Database";
import useApi, { PATHS } from "../hooks/use-api";
import tw from "../tailwind";
import Pressable from "../ui/Pressable";
import Text from "../ui/Text";
import { StorageKeys } from "../utils/localStorage";
import { Info } from "../utils/api/PhilipsTypes";
import Slider from "../ui/Slider";

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

	const [info] = useApi<Info>(PATHS.philips.api, "PHILIPS", { method: "GET" });
	const [, dispatch] = usePhilipsContext();

	useEffect(() => {
		dispatch({ type: ActionTypes.SetInformation, info });
	}, [info]);

	return (
		<View style={tw`shadow rounded bg-gray-50 p-4 m-4`}>
			<Text style={tw`text-center text-primary-800 font-bold`}>Philips Hue</Text>
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
		</View>
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
				{Object.values(state.info.lights).map((light, idx) => (
					<Light key={light.uniqueid} id={idx + 1} />
				))}
			</View>
		</View>
	);
}

function Light({ id }: { id: number }) {
	const [state] = usePhilipsContext();
	const info = state.info?.lights[id];
	const [on, setOn] = useState(false);

	useApi(PATHS.philips.lightState(id), "PHILIPS", { method: "PUT", body: JSON.stringify({ on }) });

	const type = on ? "filled" : "tonal";

	const jr = JSON.stringify(info);
	useEffect(() => {
		if (info == null) {
			return;
		}
		setOn(info.state.on);
	}, [jr]);

	if (info == null) {
		return null;
	}

	return (
		<View>
			<Text>{info.name}</Text>
			<Pressable type={type} onPress={() => setOn((o) => !o)}>
				<Text style={Pressable.text({ type })}>{on ? "On" : "Off"}</Text>
			</Pressable>
			<Controls id={id} />
		</View>
	);
}

function Controls({ id }: { id: number }) {
	const [state] = usePhilipsContext();
	const [bri, setBri] = useState(0);
	const [hue, setHue] = useState(0);
	const [sat, setSat] = useState(0);
	const [ct, setCt] = useState(0);

	useApi(PATHS.philips.lightState(id), "PHILIPS", { method: "PUT", body: JSON.stringify({ bri }) });
	useApi(PATHS.philips.lightState(id), "PHILIPS", { method: "PUT", body: JSON.stringify({ hue }) });
	useApi(PATHS.philips.lightState(id), "PHILIPS", { method: "PUT", body: JSON.stringify({ ct }) });
	useApi(PATHS.philips.lightState(id), "PHILIPS", { method: "PUT", body: JSON.stringify({ sat }) });

	const jState = JSON.stringify(state.info?.lights[id].state);
	useEffect(() => {
		if (state.info == null) {
			return;
		}

		setBri(state.info.lights[id].state.bri);
		setSat(state.info.lights[id].state.sat);
		setCt(state.info.lights[id].state.ct);
		setHue(state.info.lights[id].state.hue);
	}, [jState]);

	if (state.info == null) {
		return null;
	}

	return (
		<View>
			<View>
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
