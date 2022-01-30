import React, { useState, useEffect } from "react";
import tw from "../tailwind";
import { View, Pressable } from "react-native";
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

	const selectEffect = React.useCallback(async (effectName: string) => {
		await api(PATHS.effects, { method: "PUT", body: { select: effectName } });
		setEffect(effectName);
	}, []);

	const renderItem = ({ item }) => {
		return (
			<Pressable
				key={item}
				onPress={() => selectEffect(item)}
				style={tw.style(
					{ ["bg-primary-100 rounded-lg border border-primary-200 shadow-lg"]: item === effect },
					"py-2 pl-4 mx-2"
				)}
			>
				<Text>{item}</Text>
			</Pressable>
		);
	};

	return (
		<Page
			title={<Text style={tw`text-primary-700 text-lg font-bold text-center`}>Effects</Text>}
			headerRight={
				<Link to="effects/create">
					<Text>Create</Text>
				</Link>
			}
		>
			<View>
				<List
					items={effects}
					renderItem={renderItem}
					ListEmptyComponent={
						<Text style={tw`text-center font-bold`} type="secondary">
							Failed to find any effects
						</Text>
					}
				/>
			</View>
		</Page>
	);
}
export default Effects;
