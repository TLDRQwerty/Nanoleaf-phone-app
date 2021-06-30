import React from "react";
import { NativeRouter, Route } from "react-router-native";
import Home from "./Home";

const Router = () => {
	return (
		<NativeRouter>
			<Route exact component={Home} />
		</NativeRouter>
	);
};

export default Router;
