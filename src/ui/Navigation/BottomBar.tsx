import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-native";
import Text from "../Text";
import tw from "../../tailwind";
import { getItem, StorageKeys } from "../../utils/localStorage";
import { View } from "react-native";

type Props = {};

const selectedStyle = "bg-primary-200 rounded text-primary-600 shadow-md";

export default function BottomBar({}: Props) {
	const [apiToken, setApiToken] = useState<String | null>(null);
	const location = useLocation();

	useEffect(() => {
		(async () => {
			setApiToken(await getItem(StorageKeys.AUTH_TOKEN));
		})();
	}, []);

	if (apiToken == null) {
		return null;
	}

	return (
		<View style={tw`flex-row shadow shadow-offset-[0px]/[-2px]`}>
			<Link to="/">
				<Text style={tw.style("text-lg px-4 m-1", { [selectedStyle]: location.pathname === "/" })}>Controls</Text>
			</Link>
			<Link to="/effects">
				<Text style={tw.style("text-lg px-4 m-1", { [selectedStyle]: location.pathname.includes("effects") })}>
					Effects
				</Text>
			</Link>
		</View>
	);
}
