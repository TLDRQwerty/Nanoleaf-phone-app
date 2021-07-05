import React, { useState, useRef, useCallback } from "react";

export function useDebouce(func: (...args: any[]) => void, wait: number) {
	const timeout = useRef<NodeJS.Timeout>();

	return useCallback(
		(...args) => {
			const later = () => {
				clearTimeout(timeout.current);
				func(...args);
			};

			clearTimeout(timeout.current);
			timeout.current = setTimeout(later, wait);
		},
		[func, wait]
	);
}
