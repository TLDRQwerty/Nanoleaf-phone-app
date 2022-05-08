import React, { isValidElement, ReactNode } from "react";
import { Text, View, ScrollView } from "react-native";
import tw from "../tailwind";
import { ArrowSmLeftIcon } from "react-native-heroicons/solid";
import { Link } from "react-router-native";

type Props = {
	title: ReactNode;
	children: ReactNode;
	headerLeft?: ReactNode;
	headerRight?: ReactNode;
	scrollable?: boolean;
};

function Page({ title, children, headerLeft, headerRight, scrollable = false }: Props) {
	const Component = scrollable ? ScrollView : View;
	return (
		<View style={tw`h-full`}>
			<View style={tw`flex-row p-2 bg-secondary-50 dark:bg-dark-primary-800 px-4 items-center shadow-lg`}>
				<View style={tw`w-1/6`}>
					{headerLeft || (
						<Link to="..">
							<ArrowSmLeftIcon style={tw`text-primary-300 dark:text-primary-100`} />
						</Link>
					)}
				</View>
				<View style={tw`flex-1`}>
					{isValidElement(title) ? (
						title
					) : (
						<Text style={tw`text-center font-bold text-lg text-primary-900 dark:text-dark-primary-300`}>{String(title)}</Text>
					)}
				</View>
				<View style={tw`w-1/6 flex-row-reverse`}>{headerRight || <View />}</View>
			</View>
			<Component style={tw`pb-4 bg-secondary-50 dark:bg-dark-primary-700 flex flex-1`}>{children}</Component>
		</View>
	);
}

export default Page;
