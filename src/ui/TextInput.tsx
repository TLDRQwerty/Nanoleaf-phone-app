import React from "react";
import { TextInput as NTextInput } from "react-native";
import tw from "../tailwind";

type Props = {} & React.ComponentProps<typeof NTextInput>;

function TextInput({ style, ...rest }: Props) {
	return <NTextInput style={[tw`border rounded w-full py-2 px-3 text-black`, style]} {...rest} />;
}

export default TextInput;
