import { SUPPORTED_LIGHTS } from "../../types";
import { StorageKeys, getItem } from "../localStorage";

type ApiOptions = {
	method: "GET" | "POST" | "PUT";
	body?: Object;
};

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

const END_POINTS: { [K in SUPPORTED_LIGHTS]: (ip: string, token: string, path: string) => string } = {
	NANOLEAF: (ip, token, path) => `http://${ip}:16021/api/v1/${token}/${path}`,
	PHILIPS: (ip, _, path) => `https://${ip}/clip/v2/resource/${path}`,
};

async function api<T extends Object | Array<Object>>(
	path: string,
	type: SUPPORTED_LIGHTS,
	options: ApiOptions
): Promise<T | null> {
	const ip = await getItem(StorageKeys[type].IP_ADDRESS);
	const authToken = (await getItem(StorageKeys[type].AUTH_TOKEN)) || "";

	if (ip == null) {
		throw Error("No ip address given");
	}

	const url = `${END_POINTS[type](ip, authToken, path)}`;
	console.log({ url, type, path });

	try {
		if (options.method === "GET") {
			delete options.body;
		} else {
			options.body = JSON.stringify(options.body);
		}

		if (type === "PHILIPS") {
			options.headers = {
				"hue-application-key": authToken,
			};
		}
		const response = await fetch(url, {
			...options,
		});

		console.log(response);

		if (!response.ok) {
			return null;
		}

		if (response.status === 204) {
			return null;
		}

		const json = (await response.json()) as any as T;

		return json;
	} catch (e) {
		throw Error("Network request failed \n" + e);
	}
}

export default api;
