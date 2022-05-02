import "./wdyr";
import React from "react";
import { SafeAreaView } from "react-native";
import Router from "./Router";
import { NativeRouter } from "react-router-native";
import { RealmProvider } from "./Database";

function App() {
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
