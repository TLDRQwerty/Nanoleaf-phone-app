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

async function api<T extends Object | Array<Object>>(url: string, options: RequestInit): Promise<Response | null> {
	console.log(url, options);
	try {
		const response = await fetch(url, options);

		console.log({ response })
		if (response.ok) {
			return response.json();
		}
		return null;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export default api;
