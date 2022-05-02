import React, { ComponentProps } from "react";
import { Modal as RNModal } from "react-native";
export default function Modal({ ...props }: {} & ComponentProps<typeof RNModal>) {
	return <RNModal {...props} />;
}
