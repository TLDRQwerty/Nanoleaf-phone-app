import { StorageKeys, getItem } from "../localStorage";

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
	saturation: "state/sat",
	colorTemperature: "state/ct",
	effects: "effects",
	effectsList: "effects/effectsList",
	effectsSelect: "effects/select",
};

async function api<T>(path: string, options: ApiOptions): Promise<T | null> {
	const ip = await getItem(StorageKeys.NANOLEAF_IP_ADDRESS);
	const authToken = (await getItem(StorageKeys.AUTH_TOKEN)) || "";
	const url = `http://${ip}:16021/api/v1/${authToken ? authToken + "/" : ""}${path}`;

	const response = await fetch(url, {
		...options,
		body: JSON.stringify(options.body),
	});

	if (!response.ok) {
		return null;
	}

	if (response.status === 204) {
		return null;
	}

	const json = (await response.json()) as any as T;
	return json;
}

export default api;
