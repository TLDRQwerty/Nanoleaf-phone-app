import React, { useState, useEffect } from "react";
import Slider from "../ui/Slider";
import api, { PATHS } from "../utils/api";
import { useDebounce } from "../hooks/useDebounce";
import { StateRange } from "../utils/api/types";

function ColorTemperature() {
	const [color, setColor] = useState(0);

	useEffect(() => {
		const fetchColor = async () => {
			const response = await api<StateRange>(PATHS.colorTemperature, {
				method: "GET",
			});
			if (response) {
				setColor(response.value);
			}
		};
		fetchColor();
	}, []);

	const sendColorTemperature = async () => {
		await api(PATHS.state, {
			method: "PUT",
			body: {
				ct: {
					value: color,
				},
			},
		});
	};

	const debounceColorTemperature = useDebounce(sendColorTemperature);

	return (
		<Slider
			label="Color Temperature"
			step={1}
			minimumValue={1200}
			maximumValue={6500}
			value={color}
			onValueChange={(value) => {
				setColor(value);
				debounceColorTemperature();
			}}
		/>
	);
}

export default ColorTemperature;
