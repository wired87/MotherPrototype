import {Text, View, StyleSheet} from "react-native";
import React, {memo, useContext} from "react";
import {imgStyles} from "./imgStyles";
import {ThemeContext} from "../../screens/Context";


const localStyles = StyleSheet.create(
  {
    mainText: {
      fontSize: 28,
      fontFamily: "wizardFont",
    }
  }
)

const BottomImage = () => {

  const {customTheme} = useContext(ThemeContext);
  const textStyles = [localStyles.mainText, {color: customTheme.text}];
  const poweredTextStyles = [imgStyles.poweredTxt, {color: customTheme.text}];

  return(
    <View style={imgStyles.poweredBy}>
      <Text style={poweredTextStyles}>Powered By</Text>
      <Text style={textStyles}>codingWizard</Text>
    </View>
  );
}

export default memo(BottomImage);