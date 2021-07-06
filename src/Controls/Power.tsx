import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import api, { PATHS } from "../utils/api";
import Button from "../ui/Button";
import tw from "../tailwind";

function Power() {
	const [on, setOn] = useState(false);

	useEffect(() => {
		const fetchOn = async () => {
			const response = await api<{ value: boolean }>(PATHS.on, {
				method: "GET",
			});

			if (response) {
				setOn(response.value);
			}
		};
		fetchOn();
	}, []);

	const handleOn = async () => {
		await api(PATHS.state, {
			method: "PUT",
			body: {
				on: {
					value: !on,
				},
			},
		});
		setOn((prev) => !prev);
	};

	return (
		<View>
			<Button onPress={handleOn} style={tw.style({ 'bg-white': on })}>
				<Text style={tw.style(`text-center text-black`, { 'text-white': !on })}>{on ? "Off" : "On"}</Text>
			</Button>
		</View>
	);
}

export default Power;
