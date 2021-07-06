import React from "react";
import { View, Text } from "react-native";
import { useHistory, useLocation } from "react-router-native";
import tw from "../../tailwind";

type Props = {};

const selectedStyle = 'bg-gray-300'

function BottomBar({}: Props) {
	const history = useHistory();
	const location = useLocation();

	return (
		<>
			<Text
				style={tw.style("text-white text-lg px-4", { [selectedStyle]: location.pathname === "/" })}
				onPress={() => history.push("/")}
			>
				Controls
			</Text>
			<Text
				style={tw.style("text-white text-lg px-4", { [selectedStyle]: location.pathname === "/effects" })}
				onPress={() => history.push("/effects")}
			>
				Effects
			</Text>
		</>
	);
}

export default BottomBar;
