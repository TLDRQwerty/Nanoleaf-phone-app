import React, { useState, useEffect } from "react";
import { Text, View, PressableProps, StyleProp } from "react-native";
import api, { PATHS } from "../utils/api";
import Button from "../ui/Button";
import tw from "../tailwind";
import { On } from "../utils/api/types";

type Props = {
	buttonStyle?: StyleProp<PressableProps>;
};

function Power({ buttonStyle }: Props) {
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
			<Button onPress={handleOn} active={!on} style={buttonStyle} label={on ? "Off" : "On"} />
		</View>
	);
}

export default Power;
