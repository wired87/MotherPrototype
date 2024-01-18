import {DefaultContainer} from "../DefaultContainer";
import {DefaultText} from "../../text/DefaultText";

import {StyleSheet} from "react-native";
import React, {memo} from "react";
import LottieView from "lottie-react-native";

const localStyles = StyleSheet.create(
  {
    lottieStyles: {
      height: 200,
      width: 200
    },
    main: {
      paddingHorizontal: 20
    }
  }
);

interface StatusContainer {
  source: string | any;
  text: string;
  helpText: string;
}

const StatusContainer: React.FC<StatusContainer> = (

  {
    source,
    text,
    helpText
  }
) => {
  const textStyles = {fontSize: 22, fontFamily: "JetBrainsMono", textAlign: "center", gap: 10, marginBottom: 10};
  const helpTextStyles = {fontSize: 16, fontWeight: "bold", textAlign: "center", gap: 10}

  return(
    <DefaultContainer
      extraStyles={localStyles.main}>

      <LottieView
        style={localStyles.lottieStyles}
        source={source}
        autoPlay
        loop={false}
      />

      <DefaultText
        text={text}
        moreStyles={textStyles}
      />

      <DefaultText
        text={helpText}
        moreStyles={helpTextStyles}
      />

    </DefaultContainer>
  );
}

export default memo(StatusContainer);