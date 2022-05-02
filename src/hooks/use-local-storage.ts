import { getItem, saveItem } from "../utils/localStorage";
import { useEffect, useRef, useState } from "react";

export default function useLocalStorage(key: string, defaultValue: string = "") {
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

	useEffect(() => {
		(async () => {
			if (value !== oldValue.current) {
				await saveItem(key, value);
				setValue(value);
				oldValue.current = value;
			}
		})();
	}, [value, key]);

	return [value];
}
