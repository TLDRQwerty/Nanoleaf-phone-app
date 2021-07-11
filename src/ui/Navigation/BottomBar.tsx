import React from "react";
import { useLocation, Link } from "react-router-native";
import Text from "../Text";
import tw from "../../tailwind";

type Props = {};

const selectedStyle = "bg-primary-300 text-primary-600";

function BottomBar({}: Props) {
	const location = useLocation();

	return (
		<>
			<Link to="/">
				<Text style={tw.style("text-lg px-4", { [selectedStyle]: location.pathname === "/" })}>Controls</Text>
			</Link>
			<Link to="/effects">
				<Text style={tw.style("text-lg px-4", { [selectedStyle]: location.pathname.includes("effects") })}>
					Effects
				</Text>
			</Link>
		</>
	);
}

export default BottomBar;
