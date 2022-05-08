export interface Info {
	lights: { [key: string]: Light };
	scenes: { [key: string]: Scene };
	groups: { [key: string]: Group };
}

export interface Light {
	state: State;
	swupdate: {
		state: string;
		lastinstall: string;
	};
	type: string;
	name: string;
	modelid: string;
	manufacturername: string;
	productname: string;
	capabilities: {
		certified: boolean;
		control: {
			mindimlevel: number;
			maxlumen: number;
			colorgamuttype: string;
			colorgamut: [[number, number], [number, number], [number, number]];
			ct: {
				min: number;
				max: number;
			};
		};
		streaming: {
			renderer: boolean;
			proxy: boolean;
		};
	};
	config: {
		archetype: string;
		function: string;
		direction: string;
	};
	uniqueid: string;
	swversion: string;
}

export interface State {
	on: boolean;
	bri: number;
	hue: number;
	sat: number;
	effect: "none" | "colorloop";
	xy: [number, number];
	ct: number;
	alert: string;
	colormode: string;
	mode: string;
	reachable: boolean;
}

export interface Scene {
	name: string;
	type: "LightScene" | "GroupScene";
	group: string;
	lights: Array<number>;
	owner: string;
	recycle: boolean;
	locked: boolean;
	appdata: { version: number; data: string };
	picture: string;
	image: string;
	lastupdated: string;
	version: number;
}

interface Group {
	name: string;
	lights: number[];
	type: "Luminaire" | "LightSource" | "LightGroup" | "Room" | "Entertainment" | "Zone";
	action: State & { effect: string | "none" };
}
