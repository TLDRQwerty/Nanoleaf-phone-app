import React, { useEffect } from "react";
import { Route } from "react-router-native";
import Connect from "./Connect/Connect";
import { useHistory } from "react-router-native";
import { BackHandler } from "react-native";
import Home from "./Home/Home";

const Router = () => {
	const history = useHistory();

	useEffect(() => {
		const handleBack = () => {
			// @ts-ignore next-line
			if (history.index === 0) {
				BackHandler.exitApp();
				return false;
			} else {
				history.goBack();
				return true;
			}
		};

		BackHandler.addEventListener("hardwareBackPress", handleBack);
		return () => {
			BackHandler.removeEventListener("hardwareBackPress", handleBack);
		};
	}, [history]);

	return (
		<>
			<Route exact component={Home} path="/" />
			<Route exact component={Connect} path="/connect" />
		</>
	);
};

export default Router;
