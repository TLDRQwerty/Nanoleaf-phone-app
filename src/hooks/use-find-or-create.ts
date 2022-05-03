import { useEffect, useRef } from "react";
import { useObject, useRealm } from "../Database";

export default function useFindOrCreate(object: any, id: string, defaultValue: any, update: (A: any, B: any) => any) {
	const realm = useRealm();
	let value = useRef(useObject(object, id));
	const dv = object.create(defaultValue);

	useEffect(() => {
		if (value == null) {
			realm.write(() => {
				value.current = realm.create(object, dv);
			});
		}
	}, []);

	return [
		value?.current || dv,
		(newValue) => {
			realm.write(() => {
				update(value.current, newValue);
			});
		},
	];
}
