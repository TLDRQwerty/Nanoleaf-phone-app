import React, { ReactNode } from "react";
import { View } from "react-native";
import tw from "../tailwind";
import BottomBar from "./Navigation/BottomBar";
import { ArrowSmLeftIcon} from "react-native-heroicons/solid";
import { Link } from "react-router-native";

type Props = {
	title: ReactNode;
	children: ReactNode;
	headerLeft?: ReactNode;
	headerRight?: ReactNode;
};

function Page({ title, children, headerLeft, headerRight }: Props) {
	return (
		<View style={tw`h-full`}>
			<View style={tw`flex-row p-2 bg-secondary-50 px-4 items-center shadow-lg`}>
				<View style={tw`w-1/6`}>
					{headerLeft || (
						<Link to="..">
							<ArrowSmLeftIcon style={tw`text-primary-300`} />
						</Link>
					)}
				</View>
				<View style={tw`flex-1`}>{title}</View>
				<View style={tw`w-1/6 flex-row-reverse`}>{headerRight || <View />}</View>
			</View>
			<View style={tw`pb-4 bg-secondary-50 flex flex-1`}>{children}</View>
			<View style={tw`flex-row items-end bg-secondary-100 justify-evenly border-t-2 border-primary-100`}>
				<BottomBar />
			</View>
		</View>
	);
}

export default Page;
