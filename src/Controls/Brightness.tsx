import React, { useState, useEffect } from "react";
import Slider from "../ui/Slider";
import api, { PATHS } from "../utils/api";
import { useDebounce } from "../hooks/useDebounce";
import { StateRange } from "../utils/api/types";

function Brightness() {
	const [brightness, setBrightness] = useState(0);

	useEffect(() => {
		const fetchBrightness = async () => {
			const response = await api<StateRange>(PATHS.brightness, {
				method: "GET",
			});
			if (response) {
				setBrightness(response.value);
			}
		};
		fetchBrightness();
	}, []);

	const sendBrightness = async () => {
		await api(PATHS.state, {
			method: "PUT",
			body: {
				brightness: {
					value: brightness,
				},
			},
		});
	};

	const debounceBrightness = useDebounce(sendBrightness);

	return (
		<Slider
			label="Brightness"
			step={1}
			minimumValue={0}
			maximumValue={100}
			value={brightness}
			onValueChange={(value) => {
				setBrightness(value);
				debounceBrightness();
			}}
		/>
	);
}

export default Brightness;
