import React, { useState, useEffect } from "react";
import Slider from "../ui/Slider";
import api, { PATHS } from "../utils/api";
import { useDebouce } from "../hooks/useDebouce";

function Brightness() {
	const [brightness, setBrightness] = useState(0);

	useEffect(() => {
		const fetchBrightness = async () => {
			const response = await api<{ value: 100; max: 100; min: 0 }>(PATHS.brightness, {
				method: "GET",
			});
			if (response) {
				console.log(response);
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

	const debouceBrightness = useDebouce(sendBrightness, 10);

	useEffect(() => {
		debouceBrightness();
	}, [brightness, debouceBrightness]);

	return (
		<Slider
			label="Brightness"
			step={1}
			minimumValue={0}
			maximumValue={100}
			value={brightness}
			onValueChange={setBrightness}
		/>
	);
}

export default Brightness;
