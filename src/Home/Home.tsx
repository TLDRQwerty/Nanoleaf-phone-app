import React from "react";
import { ScrollView, Text } from "react-native";
import { Link } from "react-router-native";
import Page from "../ui/Page";
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
				<Philips />
				<Nanoleaf />
			</ScrollView>
		</Page>
	);
}
