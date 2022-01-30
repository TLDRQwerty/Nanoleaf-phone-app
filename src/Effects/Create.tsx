import React from "react";
import "react-native-get-random-values";
import Page from "../ui/Page";
import Text from "../ui/Text";
import { View, ListRenderItemInfo, Pressable } from "react-native";
import { TrashIcon, PlusIcon } from "react-native-heroicons/solid";
import tw from "../tailwind";
import { Palette, WithUuid } from "../utils/api/types";
import Slider from "../ui/Slider";
import TextInput from "../ui/TextInput";
import { v4 as uuidV4 } from "uuid";
import List from "../ui/List";
import Button from "../ui/Button";

function Create() {
	const [palette, setPalette] = React.useState<Array<WithUuid<Palette>>>([]);
	const [animName, setAnimName] = React.useState<string>();

	const handleAdd = () => {
		setPalette((prev) => [...prev, { id: uuidV4() }]);
	};

	const handlePaletteChange = <K extends keyof Palette, T extends Palette[K]>(id: string, key: K, value: T) =>
		setPalette((prev) =>
			prev.map((i) => {
				if (i.id === id) {
					return {
						...i,
						[key]: value,
					};
				}
				return i;
			})
		);

	const removePalette = (id: string) => setPalette((prev) => prev.filter((i) => i.id !== id));

	const renderItem = ({ item, index }: ListRenderItemInfo<WithUuid<Palette>>) => (
		<View style={tw.style("mb-1 bg-secondary-50 rounded-full")} key={item.id}>
			<View style={tw`flex-row border-2 p-2 rounded border-primary-100`}>
				<View style={tw`justify-center pr-2 mr-2 border-r-2 border-primary-100`}>
					<Text>{index + 1}</Text>
				</View>
				<View style={tw`flex-col flex-1`}>
					<Pressable onPress={() => removePalette(item.id)}>
						<TrashIcon style={tw`text-primary-300 flex-none items-end`} />
					</Pressable>
					<Slider
						label="Brightness"
						value={item.brightness}
						onValueChange={(value) => handlePaletteChange(item.id, "brightness", value)}
					/>
					<Slider label="Hue" value={item.hue} onValueChange={(value) => handlePaletteChange(item.id, "hue", value)} />
					<Slider label="Saturation" onValueChange={(value) => handlePaletteChange(item.id, "saturation", value)} />
					<Slider
						label="Probability"
						value={item.probability}
						onValueChange={(value) => handlePaletteChange(item.id, "probability", value)}
					/>
				</View>
			</View>
		</View>
	);

	return (
		<Page
			title={<Text style={tw`text-center text-secondary-700 font-bold text-lg`}>Create Effect</Text>}
			headerRight={<PlusIcon style={tw`text-primary-300`} onPress={handleAdd} />}
		>
			<View style={tw`shadow-lg bg-secondary-50 pb-1 px-4`}>
				<Text>Animation Name</Text>
				<TextInput value={animName} onChangeText={setAnimName} placeholder="name..." />
			</View>
			<View style={tw`px-2`}>
				<List
					items={palette}
					renderItem={renderItem}
					ListHeaderComponent={<Text style={tw`text-center bg-white`}>Animation Palette</Text>}
					ListFooterComponent={<Button disabled={animName === ""} onPress={() => {}} label="Save" />}
					ListEmptyComponent={
						<View style={tw`flex-row flex flex-1 justify-center items-center py-2`}>
							<Text type="secondary">Click </Text>
							<PlusIcon style={tw`text-primary-300`} />
							<Text type="secondary"> to add a new palette</Text>
						</View>
					}
				/>
			</View>
		</Page>
	);
}

export default Create;
