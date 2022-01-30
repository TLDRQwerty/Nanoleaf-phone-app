import React, { useState, useEffect } from "react";
import Slider from "../ui/Slider";
import api, { PATHS } from "../utils/api";
import { useDebounce } from "../hooks/useDebounce";
import { StateRange } from "../utils/api/types";

function Saturation() {
	const [saturation, setSaturation] = useState(0);

	useEffect(() => {
		const fetchSaturation = async () => {
			const response = await api<StateRange>(PATHS.saturation, {
				method: "GET",
			});
			if (response) {
				setSaturation(response.value);
			}
		};
		fetchSaturation();
	}, []);

	const sendSaturation = async () => {
		await api(PATHS.state, {
			method: "PUT",
			body: {
				sat: {
					value: saturation,
				},
			},
		});
	};

	const debounceSaturation = useDebounce(sendSaturation);

	return (
		<Slider
			label="Saturation"
			step={1}
			minimumValue={0}
			maximumValue={100}
			value={saturation}
			onValueChange={(value) => {
				setSaturation(value);
				debounceSaturation();
			}}
		/>
	);
}

export default Saturation;
