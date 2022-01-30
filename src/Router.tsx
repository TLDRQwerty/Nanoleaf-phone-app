import React, { useEffect } from "react";
import { Route } from "react-router-native";
import Controls from "./Controls";
import Effects from "./Effects";
import CreateEffect from "./Effects/Create";
import Connect from "./Connect";
import { useHistory } from "react-router-native";
import { BackHandler } from "react-native";

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
			<Route exact component={Connect} path="/connect" />
			<Route exact component={Controls} path="/" />
			<Route exact component={Effects} path="/effects" />
			<Route exact component={CreateEffect} path="/effects/create" />
		</>
	);
};

export default Router;
