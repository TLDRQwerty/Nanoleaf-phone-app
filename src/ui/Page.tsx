import React, { ReactNode } from "react";
import { View, ScrollView } from "react-native";
import tw from "../tailwind";
import BottomBar from "./Navigation/BottomBar";
import { Link } from "react-router-native";
import Text from "./Text";
import Power from "../Controls/Power";

type Props = {
	title: ReactNode;
	children: ReactNode;
	headerLeft?: ReactNode;
	headerRight?: ReactNode;
};

function Page({ title, children, headerLeft, headerRight }: Props) {
	return (
		<View style={tw`h-full`}>
			<View style={tw`flex-row p-2 bg-secondary-200 px-4 items-center border-b-2 border-primary-100 w-full`}>
				<View style={tw`w-1/6`}>
					{headerLeft || (
						<Link to="..">
							<Text>Back</Text>
						</Link>
					)}
				</View>
				<View style={tw`flex-1`}>{title}</View>
				<View style={tw`w-1/6 flex-row-reverse`}>{headerRight || <Power buttonStyle={tw`p-1`} />}</View>
			</View>
			<ScrollView style={tw`pb-4 p-2`}>
				<View style={tw`pb-4`}>{children}</View>
			</ScrollView>
			<View style={tw`flex-row bg-secondary-200 justify-evenly border-t-2 border-primary-100`}>
				<BottomBar />
			</View>
		</View>
	);
}

export default Page;
