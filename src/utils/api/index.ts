import { StorageKeys, getItem } from "../localStorage";
import Logger from "../Logger";

type ApiOptions = {
	method: "GET" | "POST" | "PUT";
	body?: Object;
};

export const PATHS = {
	new: "new",
	info: "",
	state: "state",
	on: "state/on",
	brightness: "state/brightness",
	hue: "state/hue",
	saturation: "state/st",
	colorTemperature: "state/ct",
};

async function api<T>(path: string, options: ApiOptions): Promise<T | null> {
	const ip = await getItem(StorageKeys.NANOLEAF_IP_ADDRESS);
	const authToken = (await getItem(StorageKeys.AUTH_TOKEN)) || "";
	const url = `http://${ip}:16021/api/v1/${authToken ? authToken + "/" : ""}${path}`;

	Logger.info(`Fetch -> ${url} -> ${JSON.stringify(options)}`);

	const response = await fetch(url, {
		...options,
		body: JSON.stringify(options.body),
	});

	if (!response.ok) {
		Logger.error(
			`Failed to fetch ${url} -> ${JSON.stringify(options)} -> ${response.status} -> ${response.statusText}`
		);
		return null;
	}

	if (response.status === 204) {
		Logger.info(`API -> ${url} -> 204`);
		return null;
	}

	const json = (await response.json()) as any as T;
	Logger.info(`API -> ${url} -> `, json);
	return json;
}

export default api;
