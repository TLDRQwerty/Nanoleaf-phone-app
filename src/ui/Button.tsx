import React from 'react'
import { Pressable, GestureResponderEvent } from 'react-native'
import tw from '../tailwind'

type Props = {
	children: React.ReactChild,
	onPress: (press: GestureResponderEvent) => void,
}

function Button({ children, onPress }: Props) {
	return (
		<Pressable style={tw`bg-blue-500 font-bold py-2 px-4 border border-blue-700 rounded`} onPress={onPress}>
			{children}
		</Pressable>
	)
}

export default Button
