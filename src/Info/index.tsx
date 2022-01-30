import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import Text from "../ui/Text";
import api, { PATHS } from "../utils/api";
import { Info as InfoType } from "../utils/api/types";

function Info() {
	const [info, setInfo] = useState<InfoType | null>(null);
	const [showInfo, setShowInfo] = useState(false)

	useEffect(() => {
		const fetch = async () => {
			const response = await api<InfoType>(PATHS.info, {
				method: "GET",
			});

			if (response) {
				setInfo(response);
			}
		};
		fetch();
	}, []);

	return (
		<View>
			<Pressable onPress={() => setShowInfo((prev) => !prev)}>
				{showInfo &&<Text>{JSON.stringify(info)}</Text>}
			</Pressable>
		</View>
	);
}

export default Info;
