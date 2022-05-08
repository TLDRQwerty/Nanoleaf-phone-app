import { cva, VariantProps } from "class-variance-authority";
import React, { ReactNode } from "react";
import { View } from "react-native";
import tw from "../tailwind";

const alert = cva("border rounded p-2 m-2", {
	variants: {
		type: {
			info: "bg-blue-50 border-blue-200",
			warning: "bg-yellow-50 border-yellow-200",
			error: "bg-red-50 border-red-200",
		},
	},
});

function Alert({ children, type }: { children: ReactNode } & VariantProps<typeof alert>) {
	return <View style={tw.style(alert({ type }))}>{children}</View>;
}

const title = cva("font-bold", {
	variants: {
		type: {
			info: "text-blue-800",
			warning: "text-yellow-500",
			error: "text-red-500",
		},
	},
});

function Title({ children }: { children: ReactNode }) {
	return <>{children}</>;
}


const description = cva("", {
	variants: {
		type: {
			info: "text-blue-400",
			warning: "text-yellow-400",
			error: "text-red-400",
		},
	},
});

function Description({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

export default Object.assign(Alert, { Title, Description, title, description });
