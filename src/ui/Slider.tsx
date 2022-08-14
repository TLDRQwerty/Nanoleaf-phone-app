import React from "react";
import RNSlider, { SliderProps } from "@react-native-community/slider";

interface Props extends SliderProps { }

export default function Slider({ ...rest }: Props) {
  return <RNSlider {...rest} />;
}
