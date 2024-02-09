import DefaultContainer from "../DefaultContainer";
import {DefaultText} from "../../text/DefaultText";
import {View} from "react-native";

import React, {memo, useContext} from "react";
import {ThemeContext} from "../../../screens/Context";
import { StyleSheet } from "react-native";

const localStyles = StyleSheet.create(
  {
    footerMainContainer: {
      marginVertical: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      marginHorizontal: 10,
      paddingVertical: 20,

    },
    extraTextStyles: {
      fontSize: 16,
      marginTop: 30,
      textAlign: "center",
      lineHeight: 50,
      fontFamily: "JetBrainsMono",
      color: "white",
    },
    extraDefaultContainerStyles: {
      paddingVertical: 40,
    },
    sectionContainer: {
      paddingVertical: 30
    }
  }
)

// STRINGS
const notHere: string = "Do you have any ideas for future tools?";
const contactFeatureText:string = "Please fill out the Contact Form with your wishes. \nWe will contact you ASAP.";

const FeaturesInFuture: React.FC = () => {
  const { customTheme } = useContext(ThemeContext);
  const extraTextStyles = [localStyles.extraTextStyles, {color: customTheme.text}];

  const moreMainStyles = [localStyles.footerMainContainer, {
    backgroundColor: "transparent", borderBottomWidth: 1, borderColor: customTheme.borderColor
  }]

  return(
    <DefaultContainer
      extraStyles={localStyles.extraDefaultContainerStyles}>
      <View style={localStyles.sectionContainer}>

        <View style={moreMainStyles}>
          <DefaultText
            text={notHere}
            moreStyles={extraTextStyles}
          />
          <DefaultText
            text={contactFeatureText}
            moreStyles={extraTextStyles}/>
        </View>
      </View>
    </DefaultContainer>
  );
}

export default memo(FeaturesInFuture);


