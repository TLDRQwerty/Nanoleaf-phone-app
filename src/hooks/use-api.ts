import { StorageKeys } from "./../utils/localStorage";
import { SUPPORTED_TYPES } from "./../types";
import { Integration } from "./../Database/Integration";
import { useObject, useQuery } from "../Database";
import api from "../utils/api/api";
import { useEffect, useState } from "react";

export const PATHS = Object.freeze({
	nanoleaf: {
		new: "new",
		info: "",
		state: "state",
		on: "state/on",
		brightness: "state/brightness",
		hue: "state/hue",
		saturation: "state/sat",
		colorTemperature: "state/ct",
		effects: "effects",
		effectsList: "effects/effectsList",
		effectsSelect: "effects/select",
	},
	philips: {
		api: "",
		devices: "resource/device",
		change: (lightNumber: number) => `light/${lightNumber}`,
	},
} as const);

export const END_POINTS: { [K in SUPPORTED_TYPES]: (ip: string, token: string, path: string) => string } = {
	NANOLEAF: (ip, token, path) => `http://${ip}:16021/api/v1/${token}/${path}`,
	PHILIPS: (ip, _, path) => `https://${ip}/clip/v2/resource/${path}`,
};

export default function useApi(path: string, type: SUPPORTED_TYPES, options: RequestInit) {
	const [response, setResponse] = useState<Object | null>(null);
	const ip = useObject(Integration, StorageKeys[type].IP_ADDRESS);
	const auth = useObject(Integration, StorageKeys[type].AUTH_TOKEN);

	useEffect(() => {
		if (ip == null) {
			throw Error();
		}

		if (auth == null) {
			throw Error();
		}
		if (type === "PHILIPS") {
			options.headers = {
				"hue-application-key": auth.value,
			};
		}
		const url = `${END_POINTS[type](ip.value, auth.value, path)}`;
		(async () => {
			const r = await api(url, {
				...options,
			});
			setResponse(r);
		})();
	}, []);

	return [response];
}
