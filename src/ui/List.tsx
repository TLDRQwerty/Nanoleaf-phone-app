import React, { ReactNode } from "react";
import { ScrollView } from "react-native";

type Props<T> = { items: Array<T>; renderItem: (item: T) => ReactNode };

function List<T>({ items, renderItem }: Props<T>) {
	return <ScrollView>{items.map((item) => renderItem(item))}</ScrollView>;
}

export default List;
