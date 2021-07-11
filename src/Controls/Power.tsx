import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import api, { PATHS } from "../utils/api";
import Button from "../ui/Button";
import tw from "../tailwind";
import { On } from "../utils/api/types";

function Power() {
	const [on, setOn] = useState(false);

	useEffect(() => {
		const fetchOn = async () => {
			const response = await api<{ value: On }>(PATHS.on, {
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
			<Button onPress={handleOn} active={!on}>
				<Text style={tw.style(`text-center text-secondary-900`)}>{on ? "Off" : "On"}</Text>
			</Button>
		</View>
	);
}

export default Power;
