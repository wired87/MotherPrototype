import {DefaultContainer} from "../DefaultContainer";
import {DefaultText} from "../../text/DefaultText";

import {StyleSheet} from "react-native";
import React, {memo} from "react";
import LottieView from "lottie-react-native";

const localStyles = StyleSheet.create(
  {
    lottieStyles: {
      height: 40,
      width: 40
    },
  }
);

interface StatusContainer {
  source: string | any;
  text?: string;
  styles?: object;
  extraContainerStyles?: object;
}

const StatusContainer: React.FC<StatusContainer> = (

  { source, text, styles,extraContainerStyles }
) => {

  return(
    <DefaultContainer
      extraStyles={extraContainerStyles}>
      <LottieView
        style={localStyles.lottieStyles}
        source={source} autoPlay
        // loop
      />
      <DefaultText
        text={text}
        moreStyles={{fontSize: 22}}
      />
    </DefaultContainer>
  );
}
export default memo(StatusContainer);