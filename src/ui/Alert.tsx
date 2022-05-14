import { cva, VariantProps } from "class-variance-authority";
import React, { ReactNode } from "react";
import { View } from "react-native";
import tw from "../tailwind";

const alert = cva("border rounded p-2 m-2", {
	variants: {
		type: {
			info: "bg-blue-50 border-blue-200 dark:bg-blue-600 dark:border-blue-500",
			warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-600 dark:border-yellow-500",
			error: "bg-red-50 border-red-200 dark:bg-red-600 dark:border-red-100",
		},
	},
});

function Alert({ children, type }: { children: ReactNode } & VariantProps<typeof alert>) {
	return <View style={tw.style(alert({ type }))}>{children}</View>;
}

const title = cva("font-bold capitalize", {
	variants: {
		type: {
			info: "text-blue-500 dark:text-blue-100",
			warning: "text-yellow-500 dark:text-yellow-100",
			error: "text-red-500 dark:text-red-200",
		},
	},
});

function Title({ children }: { children: ReactNode }) {
	return <>{children}</>;
}


const description = cva("", {
	variants: {
		type: {
			info: "text-blue-400 dark:text-blue-100",
			warning: "text-yellow-400 dark:text-yellow-100",
			error: "text-red-400 dark:text-red-50",
		},
	},
});

function Description({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

export default Object.assign(Alert, { Title, Description, title, description });
