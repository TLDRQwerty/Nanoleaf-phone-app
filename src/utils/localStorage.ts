import AsyncStorage from "@react-native-async-storage/async-storage";
import Logger from "./Logger";

export enum StorageKeys {
	"AUTH_TOKEN" = "AUTH_TOKEN",
	"NANOLEAF_IP_ADDRESS" = "NANOLEAF_IP_ADDRESS",
}

export async function getItem(key: StorageKeys): Promise<string | null> {
	try {
		const value = await AsyncStorage.getItem(key);
		if (!value) {
			Logger.error(`Failed localStorage -> key ${key}`);
			return null;
		}
		Logger.info(`localStorage -> key ${key} -> data ${value}`);
		return value;
	} catch (e) {
		Logger.error(e);
		return null;
	}
}

export async function saveItem(key: StorageKeys, data: string): Promise<void> {
	try {
		await AsyncStorage.setItem(key, data);
		Logger.info(`Saved data ${data} using key ${key}`);
	} catch (e) {
		Logger.error(e);
	}
}

export async function removeItem(key: StorageKeys): Promise<void> {
	try {
		await AsyncStorage.removeItem(key);
		Logger.info(`Removed data using key ${key}`);
	} catch (e) {
		Logger.error(e);
	}
}
