import { getItem, saveItem } from "../utils/localStorage";
import { useEffect, useRef, useState } from "react";

export default function useLocalStorage(key: string, defaultValue: string | null = "") {
	const [value, setValue] = useState(defaultValue);
	const oldValue = useRef<string | null>();

	useEffect(() => {
		(async () => {
			const v = await getItem(key, setValue);
			if (oldValue.current) {
				oldValue.current = v;
			}
		})();
	}, [key]);

	return [
		value,
		(v: string) => {
			setValue(v);
			saveItem(key, v);
		},
	];
}
