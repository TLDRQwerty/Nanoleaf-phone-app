import React, { ReactNode, useEffect } from 'react'
import { ViewProps, ScrollViewProps, ScrollView, View } from 'react-native'
import create from 'zustand'
import tw from '~/tailwind'
import Pressable from './Pressable'
import Text from './Text'

const useStore = create<{
  selected: any
  setSelected: (selected: any) => void
}>()((set) => ({
  selected: null,
  setSelected: (selected) => set({ selected }),
}))

type Props<Scrollable extends boolean, Item> = {
  value: Item
  options: Item[]
  children: (v: Item) => ReactNode
  scrollable: Scrollable
}

function Chips<Scrollable extends boolean, Item>({
  value,
  options,
  children,
  scrollable,
  ...rest
}: Props<Scrollable, Item> &
  Omit<Scrollable extends true ? ScrollViewProps : ViewProps, 'children'>) {
  const setSelected = useStore((s) => s.setSelected)

  useEffect(() => {
    setSelected(value)
  }, [value])

  const Component = scrollable ? ScrollView : View
  return (
    <Component {...rest}>
      {React.useMemo(() => options.map((v) => children(v)), [options])}
    </Component>
  )
}

function Chip({
  children,
  onPress,
  value,
}: {
  children: ReactNode
  onPress: (value: any) => void
  value: any
}) {
  const selected = useStore((s) => s.selected)
  return (
    <Pressable style={tw`flex-row`} onPress={() => onPress(value)}>
      <Text>{selected === value ? '*' : ''}</Text>
      {children}
    </Pressable>
  )
}

export default Object.assign(Chips, { Chip })
