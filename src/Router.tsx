import React from "react";
import { NativeRouter, Route } from "react-router-native";
import Home from "./Home";
import Connect from "./Connect";

const Router = () => {
	return (
		<NativeRouter>
			<Route exact component={Connect} path="/connect" />
			<Route exact component={Home} />
		</NativeRouter>
	);
};

export default Router;
