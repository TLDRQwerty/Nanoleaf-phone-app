import { NetInfoStateType, useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { ScrollView, View } from "react-native";
import { Link } from "react-router-native";
import useNetworkListener from "../hooks/use-network-listener";
import tw from "../tailwind";
import Alert from "../ui/Alert";
import Page from "../ui/Page";
import Text from "../ui/Text";
import Nanoleaf from "./Nanoleaf";
import Philips from "./Philips";

export default function Home() {
	const netinfo = useNetworkListener();
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
			{netinfo?.type !== NetInfoStateType.wifi && (
				<Alert type="error">
					<Alert.Title>
						<Text style={tw.style(Alert.title({ type: "error" }))}>No Connection</Text>
					</Alert.Title>
					<Alert.Description>
						<Text style={tw.style(Alert.description({ type: "error" }))}>
							Connect to the local network that the devices are connected to.
						</Text>
					</Alert.Description>
				</Alert>
			)}
			<ScrollView>
				<Nanoleaf />
				<Philips />
			</ScrollView>
		</Page>
	);
}
