import React from "react";
import { NativeRouter, Route } from "react-router-native";
import Controls from "./Controls";
import Effects from "./Effects";
import Connect from "./Connect";

const Router = () => {
	return (
		<NativeRouter>
			<Route exact component={Connect} path="/connect" />
			<Route exact component={Controls} path="/" />
			<Route exact component={Effects} path="/effects" />
		</NativeRouter>
	);
};

export default Router;
