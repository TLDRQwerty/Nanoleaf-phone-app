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
		api: "api",
		devices: "clip/v2/resource/device",
		change: (lightNumber: number) => `light/${lightNumber}`,
	},
} as const);

export const END_POINTS: { [K in SUPPORTED_TYPES]: (ip: string, token: string, path: string) => string } = {
	NANOLEAF: (ip, token, path) => `http://${ip}:16021/api/v1/${token}/${path}`,
	PHILIPS: (ip, username, path) => `https://${ip}:443/${path}`,
};

export default function useApi<R extends Object | Array<Object>>(
	path: string,
	type: SUPPORTED_TYPES,
	options: RequestInit
): [R | null] {
	const [response, setResponse] = useState<R | null>(null);
	const ip = useObject(Integration, StorageKeys[type].IP_ADDRESS);
	const auth = useObject(Integration, StorageKeys[type].AUTH_TOKEN);

	const bodyOptions = JSON.stringify(options.body);
	useEffect(() => {
		(async () => {
			if (ip == null) {
				throw Error();
			}

			if (auth == null) {
				throw Error();
			}
			if (type === "PHILIPS") {
				console.log(auth.value);
				options.headers = new Headers();
				options.headers.append("hue-application-key", auth.value);
			}

			const url = `${END_POINTS[type](ip.value, auth.value, path)}`;
			console.log(url, options);

			const r = await api<R>(url, {
				...options,
			});
			setResponse(r);
		})();
	}, [bodyOptions]);

	return [response];
}
