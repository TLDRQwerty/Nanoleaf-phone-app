import React, { ComponentProps } from "react";
import { FlatList } from "react-native";

type Props<T> = {
	items: Array<T>;
} & Omit<ComponentProps<typeof FlatList>, "data">;

function List<T>({ items, ...rest }: Props<T>) {
	return <FlatList data={items} {...rest} />;
}

export default List;
