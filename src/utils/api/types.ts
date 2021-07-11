export type WithUuid<T extends Object> = T & { id: string };

export enum CommandType {
	add = "add",
	request = "reqest",
	delete = "delete",
	display = "display",
	rename = "rename",
	requestAll = "requestAll",
}

export enum AnimType {
	random = "random",
	flow = "flow",
	wheel = "wheel",
	fade = "fade",
	highlight = "highlight",
	custom = "custom",
	static = "static",
}

export type Palette = {
	hue?: number;
	saturation?: number;
	brightness?: number;
	propability?: number;
};

export type BrightnessRange = {
	maxValue: number;
	minValue: number;
};

export type TransTime = {
	minValue: number;
	maxValue: number;
};

export type DelayTime = {
	minValue: number;
	maxValue: number;
};

export type On = boolean;

export type StateRange = {
	value: number;
	max: number;
	min: number;
};

export type State = {
	on: On;
	brightness: StateRange;
	hue: StateRange;
	sat: StateRange;
	ct: StateRange;
	colorMode: string;
};

export type Effects = {
	select: string;
	effectsList: Array<string>;
};

export type Position = {
	x: number;
	y: number;
	o: number;
};

export type PositionData = {
	panelId: number;
	shapeType: number;
} & Position;

export type GlobalOrientation = {
	value: number;
	max: number;
	min: number;
};

export type Layout = {
	numPanels: number;
	sideLength: number;
	positionData: Array<PositionData>;
};

export type PanelLayout = {
	layout: Array<Layout>;
	globalOrientation: GlobalOrientation;
};

export type Rhythm = {
	rhythmConnected: boolean;
	rhythmActive: boolean;
	rhythmId: boolean;
	hardwareVersion: number;
	firmwareVersioN: number;
	auxAvailable: boolean;
	rhythmMode: number;
	rhythmPos: Position;
};

export type Info = {
	name: string;
	serialNo: number;
	manufacturer: string;
	firmwareVersion: number;
	model: string;
	state: StateRange;
	effects: Effects;
	panelLayout: PanelLayout;
	rhythm: Rhythm;
};

export type X_Effects = {
	comomand: CommandType;
	version: 1.0;
	duration?: number;
	animName?: string;
	newName?: string;
	animType: AnimType;
	animData?: string;
	colorType: "HSB";
	palette?: Array<Palette>;
	brightnessRange?: BrightnessRange;
	transTime?: TransTime;
	delayTime?: DelayTime;
	flowFactor?: number;
	windowSize?: number;
	direction?: string;
	loop: boolean;
};
