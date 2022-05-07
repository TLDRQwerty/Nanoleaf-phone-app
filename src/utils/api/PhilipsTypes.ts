export interface Info {
	lights: { [key: number]: Light };
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

interface State {
	on: boolean;
	bri: number;
	hue: number;
	sat: number;
	effect: string;
	xy: [number, number];
	ct: number;
	alert: string;
	colormode: string;
	mode: string;
	reachable: boolean;
}
