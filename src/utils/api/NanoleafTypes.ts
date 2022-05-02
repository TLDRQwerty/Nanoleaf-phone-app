export interface Info {
	name: string;
	serialNo: string;
	manufacturer: string;
	firmwareVersion: string;
	model: string;
	state: State;
	effects: Effects;
	panelLayout: PanelLayout;
	rhythm: Rhythm;
}

export interface State {
	on: On;
	brightness: RangeValue;
	hue: RangeValue;
	sat: RangeValue;
	ct: RangeValue;
	colorMode: string;
}

export interface RangeValue {
	value: number;
	min: number;
	max: number;
}

export interface On {
	value: boolean;
}

export interface Effects {
	select: string;
	effectsList: string[];
}

export interface PanelLayout {
	layout: Layout;
	globalOrientation: GlobalOrientation;
}

export interface Layout {
	numPanels: number;
	sideLength: number;
	positionData: PositionDaum[];
}

export interface PositionDaum {
	panelId: number;
	x: number;
	y: number;
	o: number;
}

export interface GlobalOrientation {
	value: number;
	max: number;
	min: number;
}

export interface Rhythm {
	rhythmConnected: boolean;
	rhythmActive: any;
	rhythmId: any;
	hardwareVersion: any;
	firmwareVersion: any;
	auxAvailable: any;
	rhythmMode: any;
	rhythmPos: any;
}
