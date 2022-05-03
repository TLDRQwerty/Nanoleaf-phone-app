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

async function api<R extends Object | Array<Object>>(url: string, options: RequestInit): Promise<R | null> {
	try {
		const response = await fetch(url, options);

		if (response.ok) {
			if (response.status === 200) {
				return response.json();
			} else {
				return null;
			}
		}
		return null;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export default api;
