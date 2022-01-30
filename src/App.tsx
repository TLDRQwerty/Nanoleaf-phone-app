import "./wdyr";
import React from "react";
import { SafeAreaView } from "react-native";
import Router from "./Router";
import { NativeRouter } from "react-router-native";

function App() {
	return (
		<SafeAreaView>
			<NativeRouter>
				<Router />
			</NativeRouter>
		</SafeAreaView>
	);
}

export default App;
