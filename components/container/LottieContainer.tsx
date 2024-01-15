import React, {memo, ReactNode} from "react";
import {toolStyles as ts} from "../../screens/tools/toolStyles";
import LottieView, {AnimationObject} from "lottie-react-native";
import {DefaultText} from "../text/DefaultText";
import {View} from "react-native";
import defaultTools from "../../assets/animations/defaultTools.json";

interface LottieContainer {
  source: string | AnimationObject | { uri: string; };
  text: string;
  extraChild?: ReactNode;
}

const LottieContainer: React.FC<LottieContainer> = (

  {
    source,
    text,
    extraChild
  }

) => {

  const finalSource: string | AnimationObject | { uri: string; } = source? source : defaultTools

  const autoLoop:boolean = !source

  return(
    <View style={ts.defaultLottieContainer}>
      <LottieView style={ts.lottie} source={finalSource} autoPlay loop={autoLoop} />
      <DefaultText moreStyles={{marginTop: 0}} text={text} />
      {extraChild}
    </View>
  );
}

export default memo(LottieContainer);