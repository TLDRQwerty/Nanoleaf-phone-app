import React from "react";
import { SafeAreaView, Text } from "react-native";
import Router from "./Router";

const App = () => {
	return (
		<SafeAreaView>
			<Router />
			<Text>Foobar</Text>
		</SafeAreaView>
	);
};

export default App;
