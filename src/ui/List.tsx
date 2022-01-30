import React, { ComponentProps } from "react";
import { FlatList, ListRenderItem } from "react-native";

type Props<T> = {
	items: Array<T>;
	renderItem: ListRenderItem<T>;
} & Omit<ComponentProps<typeof FlatList>, "data" | "renderItem">;

function List<T>({ items, renderItem, ...rest }: Props<T>) {
	return <FlatList data={items} renderItem={renderItem} {...rest} />;
}

export default List;
