import React, { useState, useEffect } from "react";
import tw from "../tailwind";
import { Text, View, Pressable } from "react-native";
import Page from "../ui/Page";
import api, { PATHS } from "../utils/api";
import List from "../ui/List";

function Effects() {
	const [effects, setEffects] = useState<Array<string>>([]);
	const [effect, setEffect] = useState<string>("");

	useEffect(() => {
		const fetchEffects = async () => {
			const response = await api<Array<string>>(PATHS.effectsList, {
				method: "GET",
			});
			if (response) {
				setEffects(response);
			}
		};
		fetchEffects();
	}, []);

	useEffect(() => {
		const fetchSelectedEffect = async () => {
			const response = await api<{ select: string }>(PATHS.effectsSelect, {
				method: "GET",
			});
			if (response) {
				setEffect(response.select);
			}
		};
		fetchSelectedEffect();
	}, []);

	const selectEffect = async (effectName: string) => {
		await api(PATHS.effects, { method: "PUT", body: { select: effectName } });
		setEffect(effectName);
	};

	function renderItem(item: string) {
		return (
			<Pressable
				key={item}
				onPress={() => selectEffect(item)}
				style={tw.style({ ["bg-gray-400"]: item === effect }, "py-2 pl-4")}
			>
				<Text>{item}</Text>
			</Pressable>
		);
	}

	return (
		<Page title={<Text style={tw`text-white text-lg font-bold text-center`}>Effects</Text>}>
			<View>
				<List items={effects} renderItem={renderItem} />
			</View>
		</Page>
	);
}
export default Effects;
