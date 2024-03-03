import React, {memo, ReactNode} from "react";
import {toolStyles, toolStyles as ts} from "../../screens/tools/toolStyles";
import LottieView, {AnimationObject} from "lottie-react-native";
import {DefaultText} from "../text/DefaultText";
import {View} from "react-native";
import defaultTools from "../../assets/animations/defaultTools.json";
import {StyleProps} from "react-native-reanimated";

interface LottieContainer {
  source: string | AnimationObject | { uri: string; };
  text: string;
  extraChild?: ReactNode;
  error?: boolean;
  extraStylesMore?: StyleProps
}

const LottieContainer: React.FC<LottieContainer> = (
  {
    source,
    text,
    extraChild,
    error,
    extraStylesMore
  }
) => {

  const finalSource: string | AnimationObject | { uri: string; } = source? source : defaultTools

  const autoLoop:boolean = !source

  return(
    <View style={ts.defaultLottieContainer}>
      <LottieView style={ts.lottie} source={finalSource} autoPlay loop={autoLoop} />
      <DefaultText error={error || false} moreStyles={[toolStyles.text, {marginHorizontal: 20}, extraStylesMore]} text={text} />
      {extraChild}
    </View>
  );
}

export default memo(LottieContainer);