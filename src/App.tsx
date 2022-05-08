import "./wdyr";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import Router from "./Router";
import { NativeRouter } from "react-router-native";
import { RealmProvider } from "./Database";
import { useDeviceContext } from "twrnc";
import tw from "./tailwind";

function App() {
	useDeviceContext(tw);
	return (
		<RealmProvider>
			<SafeAreaView>
				<NativeRouter>
					<Router />
				</NativeRouter>
			</SafeAreaView>
		</RealmProvider>
	);
}

export default App;
