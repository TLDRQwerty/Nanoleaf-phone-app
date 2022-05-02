import { useEffect } from "react";
import { config, useObject, useRealm } from "../Database";

export default function useFindOrCreate(object: any, id: string, defaultValue: any, update: (A: any, B: any) => any) {
	const realm = useRealm();
	let value = useObject(object, id);
    const dv = object.create(defaultValue)

	useEffect(() => {
		if (value == null) {
			realm.write(() => {
				value = realm.create(object, dv);
			});
		}
	}, []);

	return [
		value || dv,
		(newValue) => {
			realm.write(() => {
				update(value, newValue);
			});
		},
	];
}
