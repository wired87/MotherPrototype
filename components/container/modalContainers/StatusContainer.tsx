import LottieView from "lottie-react-native";
import {DefaultContainer} from "../DefaultContainer";
import {DefaultText} from "../../text/DefaultText";
import successLottie from "../../../assets/animations/successLottie.json";

import {Image} from "react-native";
import React from "react";
// @ts-ignore
export const StatusContainer = ({ source, text, styles,extraContainerStyles }) => {
  return(
    <DefaultContainer
      extraStyles={extraContainerStyles}>
      <Image source={source} style={styles}/>
      <DefaultText
        text={text}
        moreStyles={{fontSize: 22}} />
    </DefaultContainer>
  );
}