import React from 'react'
import { Switch as RNSwitch, SwitchProps } from 'react-native'
type Props = {

} & SwitchProps

export default function Switch({ ...props }: Props) {
	return <RNSwitch {...props} />
}
