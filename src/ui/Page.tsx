import React, { isValidElement, ReactNode, ComponentProps } from "react";
import { Text, View, ScrollView, RefreshControlProps } from "react-native";
import tw from "../tailwind";
import { ArrowSmLeftIcon } from "react-native-heroicons/solid";
import { Link } from "react-router-native";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

type Props = {
	title: ReactNode;
	children: ReactNode;
	headerLeft?: ReactNode;
	headerRight?: ReactNode;
	scrollable?: boolean;
	refreshControl?: React.ReactElement<RefreshControlProps>;
};

function Page({ title, children, headerLeft, headerRight, scrollable = false, refreshControl }: Props) {
	const Component = scrollable ? ScrollView : View;
	return (
		<View style={tw`h-full`}>
			<View style={tw`flex-row p-2 bg-secondary-50 dark:bg-stone-800 px-4 items-center shadow-lg`}>
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
						<Text style={tw`text-center font-bold text-lg text-primary-900 dark:text-dark-primary-500`}>
							{String(title)}
						</Text>
					)}
				</View>
				<View style={tw`w-1/6 flex-row-reverse`}>{headerRight || <View />}</View>
			</View>
			<View style={tw`bg-gray-50 dark:bg-stone-700`}>
				<ErrorBoundary.Errors />
			</View>
			<Component style={tw`pb-4 bg-gray-50 dark:bg-stone-700 flex-1`} refreshControl={refreshControl}>
				{children}
			</Component>
		</View>
	);
}

function CustomModal({ onDismiss, onShow, visible, children, ...props }: Props & ComponentProps<typeof Modal>) {
	return (
		<Modal animationType="slide" onDismiss={onDismiss} onShow={onShow} visible={visible}>
			<Page {...props}>{children}</Page>
		</Modal>
	);
}

export default Object.assign(Page, { Modal: CustomModal });
