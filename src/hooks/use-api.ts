import { StorageKeys } from "./../utils/localStorage";
import { SUPPORTED_TYPES } from "./../types";
import { Integration } from "./../Database/Integration";
import { useObject } from "../Database";
import api from "../utils/api/api";
import { useEffect, useRef, useState } from "react";
import { useError } from "../ui/ErrorBoundary";

export const ROUTES = Object.freeze({
	NANOLEAF: {
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
	PHILIPS: {
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
	const renderError = useError();
	const [response, setResponse] = useState<R | null>(null);
	const ip = useObject(Integration, StorageKeys[type].IP_ADDRESS);
	const auth = useObject(Integration, StorageKeys[type].AUTH_TOKEN);
	const renderRef = useRef<boolean>(false);

	const bodyOptions = options.body;
	useEffect(() => {
		(async () => {
			if (ip == null) {
				throw Error();
			}

			if (auth == null) {
				throw Error();
			}

			if (options.method !== "GET" && !renderRef.current) {
				renderRef.current = true;
				return;
			}

			const url = `${END_POINTS[type](ip.value, auth.value, path)}`;

			const { json, error } = await api<R, unknown>(url, {
				...options,
			});

			if (error) {
				renderError({
					title: "An Error Occurred",
					description: typeof error != "string" ? JSON.stringify(error) : error,
				});
			}
			setResponse(json);
		})();
	}, [bodyOptions, path]);

	return [response];
}
