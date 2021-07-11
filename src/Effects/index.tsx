import React, { useState, useEffect } from "react";
import tw from "../tailwind";
import { View, Pressable, ListRenderItemInfo } from "react-native";
import Text from "../ui/Text";
import Page from "../ui/Page";
import api, { PATHS } from "../utils/api";
import List from "../ui/List";
import { Link } from "react-router-native";

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
			const response = await api<string>(PATHS.effectsSelect, {
				method: "GET",
			});
			if (response) {
				setEffect(response);
			}
		};
		fetchSelectedEffect();
	}, []);

	const selectEffect = async (effectName: string) => {
		await api(PATHS.effects, { method: "PUT", body: { select: effectName } });
		setEffect(effectName);
	};

	function renderItem({ item  }: ListRenderItemInfo<string>) {
		return (
			<Pressable
				key={item}
				onPress={() => selectEffect(item)}
				style={tw.style({ ["bg-primary-100"]: item === effect }, "py-2 pl-4")}
			>
				<Text>{item}</Text>
			</Pressable>
		);
	}

	return (
		<Page
			title={<Text style={tw`text-secondary-700 text-lg font-bold text-center`}>Effects</Text>}
			headerRight={
				<Link to="effects/create">
					<Text>Create</Text>
				</Link>
			}
		>
			<View>
				<List items={effects} renderItem={renderItem} />
			</View>
		</Page>
	);
}
export default Effects;
