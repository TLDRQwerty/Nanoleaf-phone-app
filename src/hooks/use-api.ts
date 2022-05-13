import { StorageKeys } from "./../utils/localStorage";
import { SUPPORTED_TYPES } from "./../types";
import { Integration } from "./../Database/Integration";
import { useObject } from "../Database";
import api from "../utils/api/api";
import { useEffect, useRef, useState } from "react";
import * as Philips from "../utils/api/PhilipsTypes";

export const ROUTES = Object.freeze({
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
		newdeveloper: "api/newdeveloper",
		light: {
			get: (id: string) => `lights/${id}`,
			set: (id: string) => `lights/${id}/state`,
		},
		group: {
			get: (id: string) => `groups/${id}`,
			setAction: (id: string) => `groups/${id}/action`,
		},
	},
} as const);

export const END_POINTS: { [K in SUPPORTED_TYPES]: (ip: string, token: string, path: string) => string } = {
	NANOLEAF: (ip, token, path) => `http://${ip}:16021/api/v1/${token}/${path}`,
	PHILIPS: (ip, username, path) => `http://${ip}/api/${username}/${path}`,
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

			// if (type === "PHILIPS") {
			// 	options.headers = new Headers();
			// 	options.headers.append("hue-application-key", auth.value);
			// }

			const url = `${END_POINTS[type](ip.value, auth.value, path)}`;
			// console.log({ url, options })

			const r = await api<R>(url, {
				...options,
			});
			setResponse(r);
		})();
	}, [bodyOptions, path]);

	return [response];
}
