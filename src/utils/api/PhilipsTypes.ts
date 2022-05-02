enum AllTypes {
	Device = "device",
	BehaviorScript = "behavior_script",
	Bridge = "bridge",
	BridgeHome = "bridge_home",
	Entertainment = "entertainment",
	Geolocation = "geolocation",
	GroupedLight = "grouped_light",
	Homekit = "homekit",
	Light = "light",
	Scene = "scene",
	ZigbeeConnectivity = "zigbee_connectivity",
}

export interface BehaviorScript {
	configuration_schema: ConfigurationSchema;
	description: string;
	id: string;
	metadata: Metadata<{ category: string }>;
	state_schema: unknown;
	supported_features: unknown;
	trigger_schema: TriggerSchema;
	type: AllTypes.BehaviorScript;
	version: number;
}

interface ConfigurationSchema {
	$ref: string;
}

interface TriggerSchema {
	$ref: string;
}

type Metadata<OB extends Object> = {
	name: string;
} & Omit<OB, "name">;

export interface Bridge {
	bridge_id: string;
	id: string;
	id_v1: string;
	time_zone: TimeZone;
	type: AllTypes.Bridge;
}

interface TimeZone {
	time_zone: string;
}

export interface BridgeHome {
	children: Array<Children>;
	services: Array<Service>;
	type: AllTypes.BridgeHome;
}

interface Children {
	rid: string;
	rtype: AllTypes;
}

interface Service {
	rid: string;
	rtype: AllTypes;
}

export interface Device {
	id: string;
	id_v1: string;
	identify: unknown;
	metadata: Metadata<{ archtype: string }>;
	product_data: ProductData;
	services: Array<Service>;
	type: AllTypes.Device;
}

interface ProductData {
	certified: boolean;
	manufacture_name: string;
	model_id: string;
	product_archtype: string;
	product_name: string;
	software_version: string;
}

export interface Entertainment {
	id: string;
	id_v1: string;
	owner: Owner;
	proxy: boolean;
	renderer: boolean;
	segments: Segment;
	type: AllTypes.Entertainment;
}

interface Owner {
	rid: string;
	rtype: AllTypes;
}

interface Segment {
	configurable: boolean;
	max_segments: number;
	segments: Array<{ length: number; start: number }>;
}

export interface Geolocation {
	id: string;
	is_configurable: boolean;
	type: AllTypes.Geolocation;
}

export interface GroupedLight {
	alert: Alert;
	color: unknown;
	color_temperature: unknown;
	color_temperature_delta: unknown;
	dimming: unknown;
	dimming_delta: unknown;
	dynamics: unknown;
	id: string;
	id_v1: string;
	on: On;
	type: AllTypes.GroupedLight;
}

interface Alert {
	action_values: Array<string>;
}

interface On {
	on: boolean;
}

export interface Homekit {
	id: string;
	status: string;
	status_values: Array<string>;
	type: AllTypes.Homekit;
}

export interface Light {
	alert: Alert;
	color: Color;
	color_temperature: ColorTemperature;
	color_temperature_delta: unknown;
	dimming: Dimming;
	dimming_delta: unknown;
	effects: Effect;
	id: string;
	id_v1: string;
	metadata: Metadata<{ archtype: string }>;
	mode: string;
	on: On;
	owner: Owner;
	type: AllTypes.Light;
}

interface Color {
	gamut: {
		[K in "blue" | "green" | "red"]: { x: number; y: number };
	};
	gamut_type: string;
	xy: { x: number; y: number };
}

interface ColorTemperature {
	mirek: unknown;
	mirek_schema: { mirek_maximum: number; mirek_minimum: number };
	mirek_valid: boolean;
}

interface Dimming {
	brightness: number;
	min_dim_level: number;
}

interface Effect {
	effect_values: Array<string>;
	status: string;
	status_values: Array<string>;
}

export interface Room {
	children: Array<Children>;
	id: string;
	id_v1: string;
	metadata: Metadata<{ archtype: string }>;
	services: Array<Service>;
}

export interface Scene {
	actions: Array<Action>;
	group: Group;
	id: string;
	rid: string;
	metadata: Metadata<{ image: { rid: string; id: string } }>;
	palette: Palette;
	speed: number;
	type: AllTypes.Scene;
}

interface Action {
	action: { color_temperature: ColorTemperature; dimming: Dimming; on: On };
	target: { id: string; rid: string };
}

interface Group {
	rid: string;
	rtype: string;
}

interface Palette {
	color: unknown;
	color_temperature: unknown;
	dimming: unknown;
}

export interface ZigbeeConnectivity {
	id: string;
	id_v1: string;
	mac_address: string;
	owner: Owner;
	status: string;
	type: AllTypes.ZigbeeConnectivity;
}
