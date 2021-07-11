import React, { useState, useEffect } from "react";
import Slider from "../ui/Slider";
import api, { PATHS } from "../utils/api";
import { useDebouce } from "../hooks/useDebouce";
import { StateRange } from "../utils/api/types";

function Hue() {
	const [hue, setHue] = useState(0);

	useEffect(() => {
		const fetchHue = async () => {
			const response = await api<StateRange>(PATHS.hue, {
				method: "GET",
			});
			if (response) {
				setHue(response.value);
			}
		};
		fetchHue();
	}, []);

	const sendHue = async () => {
		await api(PATHS.state, {
			method: "PUT",
			body: {
				hue: {
					value: hue,
				},
			},
		});
	};

	const debouceHue = useDebouce(sendHue, 10);

	return (
		<Slider
			label="Hue"
			step={1}
			minimumValue={0}
			maximumValue={360}
			value={hue}
			onValueChange={(value) => {
				setHue(value);
				debouceHue();
			}}
		/>
	);
}

export default Hue;
