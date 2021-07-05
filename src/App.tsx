import React from "react";
import { SafeAreaView } from "react-native";
import Router from "./Router";
import tw from "./tailwind";

function App() {
	return (
		<SafeAreaView style={tw`p-2`}>
			<Router />
		</SafeAreaView>
	);
}

export default App;
