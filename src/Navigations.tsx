import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {View} from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Main from "~/screens/Main";
import Connect from "./screens/Connect";
import Status from "./components/Status";

export type RootStackParamList = {
	Home: undefined;
	Connect: undefined;
};

export type RootDrawerParamList = {
	Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function Home() {
	return (
		<Drawer.Navigator
			initialRouteName="Main"
			screenOptions={{
				drawerType: "back",
				swipeEdgeWidth: 100,
			}}
			drawerContent={_props => (
				<View>
					<Status />
				</View>
			)}>
			<Drawer.Screen
				name="Main"
				component={Main}
				options={{headerShown: false}}
			/>
		</Drawer.Navigator>
	);
}

export default function Navigations() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				options={{headerShown: false}}
				component={Home}
			/>
			<Stack.Screen
				name="Connect"
				options={{headerShown: false}}
				component={Connect}
			/>
		</Stack.Navigator>
	);
}
