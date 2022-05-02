import AsyncStorage from "@react-native-async-storage/async-storage";
import { SUPPORTED_LIGHTS } from "../types";
import Logger from "./Logger";

type Keys = "IP_ADDRESS" | "AUTH_TOKEN";

export const StorageKeys: { [s in SUPPORTED_LIGHTS]: { [k in Keys]: `${s}_${k}` } } & {
	PHILIPS: { CLIENT_KEY: string };
} = {
	NANOLEAF: {
		IP_ADDRESS: "NANOLEAF_IP_ADDRESS",
		AUTH_TOKEN: "NANOLEAF_AUTH_TOKEN",
	},
	PHILIPS: {
		AUTH_TOKEN: "PHILIPS_AUTH_TOKEN",
		IP_ADDRESS: "PHILIPS_IP_ADDRESS",
		CLIENT_KEY: "PHILIPS_CLIENT_KEY",
	},
};

export async function getItem(key: string, cb?: (value: string) => any): Promise<string | null> {
	try {
		const value = await AsyncStorage.getItem(key);
		if (!value) {
			Logger.error(`Failed localStorage -> key ${key}`);
			return null;
		}
		Logger.info(`localStorage -> key ${key} -> data ${value}`);
		if (cb) cb(value);
		return value;
	} catch (e) {
		Logger.error(e);
		return null;
	}
}

export async function saveItem(key: string, data: string): Promise<void> {
	try {
		await AsyncStorage.setItem(key, data);
		Logger.info(`Saved data ${data} using key ${key}`);
	} catch (e) {
		Logger.error(e);
	}
}

export async function removeItem(key: string): Promise<void> {
	try {
		await AsyncStorage.removeItem(key);
		Logger.info(`Removed data using key ${key}`);
	} catch (e) {
		Logger.error(e);
	}
}
