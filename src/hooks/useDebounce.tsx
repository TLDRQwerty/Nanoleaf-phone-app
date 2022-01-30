import { useRef, useCallback } from "react";

export function useDebounce(func: (...args: any[]) => void, wait: number = 50) {
	const timeout = useRef<NodeJS.Timeout>();

	return useCallback(
		(...args) => {
			const later = () => {
				if (timeout.current) {
					clearTimeout(timeout.current);
					func(...args);
				}
			};

			if (timeout.current) {
				clearTimeout(timeout.current);
			}
			timeout.current = setTimeout(later, wait);
		},
		[func, wait]
	);
}
