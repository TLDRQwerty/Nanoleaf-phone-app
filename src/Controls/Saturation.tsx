import React, { useState, useEffect } from "react";
import Slider from "../ui/Slider";
import api, { PATHS } from "../utils/api";
import { useDebouce } from "../hooks/useDebouce";

function Saturation() {
	const [saturation, setSaturation] = useState(0);

	useEffect(() => {
		const fetchSaturation = async () => {
			const response = await api<{ value: 100; max: 100; min: 0 }>(PATHS.saturation, {
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

	const debouceSaturation = useDebouce(sendSaturation, 10);

	useEffect(() => {
		debouceSaturation();
	}, [saturation, debouceSaturation]);

	return (
		<Slider
			label="Saturation"
			step={1}
			minimumValue={0}
			maximumValue={100}
			value={saturation}
			onValueChange={setSaturation}
		/>
	);
}

export default Saturation;
