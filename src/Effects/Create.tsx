import React from "react";
import Page from "../ui/Page";
import Text from "../ui/Text";
import { View, ListRenderItemInfo } from "react-native";
import tw from "../tailwind";
import { Palette, WithUuid } from "../utils/api/types";
import Slider from "../ui/Slider";
import TextInput from "../ui/TextInput";
import { v4 } from "uuid";
import List from "../ui/List";
import Button from "../ui/Button";

function Create() {
	const [palette, setPalette] = React.useState<Array<WithUuid<Palette>>>([]);
	const [animName, setAnimName] = React.useState<string>();

	const handleAdd = () => {
		setPalette((prev) => [...prev, { id: v4() }]);
	};

	const handlePaletteChange = <T extends Palette[keyof Palette]>(id: string, key: keyof Palette, value: T) =>
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

	const renderItem = ({ item, index, seperator }: ListRenderItemInfo<WithUuid<Palette>>) => (
		<View style={tw`mb-1 bg-white`} key={item.id}>
			<View style={tw`flex-row`}>
				<View style={tw`justify-center mr-4`}>
					<Text>{index + 1}</Text>
				</View>
				<View style={tw`flex-col flex-1`}>
					<Slider
						label="Brightness"
						value={item.brightness}
						onValueChange={(value) => handlePaletteChange(item.id, "brightness", value)}
					/>
					<Slider label="Hue" value={item.hue} onValueChange={(value) => handlePaletteChange(item.id, "hue", value)} />
					<Slider label="Saturation" onValueChange={(value) => handlePaletteChange(item.id, "saturation", value)} />
					<Slider
						label="Propability"
						value={item.propability}
						onValueChange={(value) => handlePaletteChange(item.id, "propability", value)}
					/>
				</View>
			</View>
		</View>
	);

	return (
		<Page
			title={<Text style={tw`text-center text-secondary-700 font-bold text-lg`}>Create Effect</Text>}
			headerRight={<Text onPress={handleAdd}>Add</Text>}
		>
			<View>
				<Text>Animation Name</Text>
				<TextInput value={animName} onChangeText={setAnimName} placeholder="name..." />
				<View style={tw`bg-gray-200 border-t-2 mt-2`}>
					<Text style={tw`text-center bg-white`}>Animation Palette</Text>
					<List items={palette} renderItem={renderItem} />
				</View>
				<Button onPress={() => {}}>
					<Text style={tw`text-center`}>Save</Text>
				</Button>
			</View>
		</Page>
	);
}

export default Create;
