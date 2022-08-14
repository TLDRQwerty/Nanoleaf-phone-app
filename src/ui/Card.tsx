import React, { ReactNode } from 'react'
import { View } from 'react-native'
import tw from '~/tailwind'

interface Props {
  children: ReactNode
}
export default function Card({ children }: Props) {
  return <View style={tw`p-4 m-2 rounded-lg bg-gray-400/25`}>{children}</View>
}
