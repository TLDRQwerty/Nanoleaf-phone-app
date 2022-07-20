import { useEffect, useRef, useState, useCallback } from "react";
import { getItem, saveItem } from "../utils/localStorage";

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

	const set = useCallback((v) => {
		setValue(v);
		saveItem(key, v);
	}, [key]);

	return [value, set];
}
