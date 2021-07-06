import React from "react";
import { View, Text } from "react-native";
import { useHistory, useLocation } from "react-router-native";
import tw from "../../tailwind";

type Props = {};

function BottomBar({}: Props) {
	const history = useHistory();
	const location = useLocation();

	return (
		<>
			<Text
				style={tw.style("text-white text-lg", { "bg-gray-200": location.pathname === "/" })}
				onPress={() => history.push("/")}
			>
				Controls
			</Text>
			<Text
				style={tw.style("text-white text-lg", { "bg-gray-400": location.pathname === "/effects" })}
				onPress={() => history.push("/effects")}
			>
				Effects
			</Text>
		</>
	);
}

export default BottomBar;
