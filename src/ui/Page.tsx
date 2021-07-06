import React, { ReactNode } from 'react'
import { View } from 'react-native'
import tw from '../tailwind'
import BottomBar from './Navigation/BottomBar'

type Props = {
	title: ReactNode,
	children: ReactNode,
	headerLeft?: ReactNode,
	headerRight?: ReactNode,
}

function Page({ title, children, headerLeft, headerRight }: Props) {
	return (
		<View style={tw`h-full`}>
			<View style={tw`flex-row justify-evenly p-2 bg-gray-800 px-4 items-center`}>
				<View>{headerLeft}</View>
				<View style={tw`w-4/5`}>{title}</View>
				<View>{headerRight}</View>
			</View>
			<View style={tw`p-2`}>
				{children}
			</View>
			<View style={tw`absolute bottom-0 flex-row bg-gray-700 w-full justify-evenly`}>
				<BottomBar />
			</View>
		</View>
	)
}

export default Page
