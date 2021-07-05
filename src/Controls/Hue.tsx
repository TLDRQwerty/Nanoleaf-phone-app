import React, { useState, useEffect } from "react";
import Slider from "../ui/Slider";
import api, { PATHS } from "../utils/api";
import { useDebouce } from "../hooks/useDebouce";

function Hue() {
	const [hue, setHue] = useState(0);

	useEffect(() => {
		const fetchHue = async () => {
			const response = await api<{ value: 100; max: 100; min: 0 }>(PATHS.hue, {
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

	useEffect(() => {
		debouceHue();
	}, [debouceHue, hue]);

	return <Slider label="Hue" step={1} minimumValue={0} maximumValue={360} value={hue} onValueChange={setHue} />;
}

export default Hue;
