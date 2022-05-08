import React from "react";
import { ScrollView } from "react-native";
import { Link } from "react-router-native";
import Page from "../ui/Page";
import Text from "../ui/Text";
import Nanoleaf from "./Nanoleaf";
import Philips from "./Philips";

export default function Home() {
	return (
		<Page
			title="Home"
			headerRight={
				<Link to="connect">
					<Text>Connect</Text>
				</Link>
			}
			scrollable
		>
			<ScrollView>
				<Nanoleaf />
				<Philips />
			</ScrollView>
		</Page>
	);
}
