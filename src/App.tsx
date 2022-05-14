import "./wdyr";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import Router from "./Router";
import { NativeRouter } from "react-router-native";
import { RealmProvider } from "./Database";
import { useDeviceContext } from "twrnc";
import tw from "./tailwind";
import ErrorBoundary from "./ui/ErrorBoundary";

function App() {
	useDeviceContext(tw);
	return (
		<RealmProvider>
			<SafeAreaView>
				<ErrorBoundary>
					<NativeRouter>
						<Router />
					</NativeRouter>
				</ErrorBoundary>
			</SafeAreaView>
		</RealmProvider>
	);
}

export default App;
