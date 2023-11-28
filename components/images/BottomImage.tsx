import {Image, Text, View} from "react-native";
import React, {useContext} from "react";
import {imgStyles} from "./imgStyles";
// @ts-ignore
import logo_final1 from "../../assets/images/logo_final1.png";
import {ThemeContext} from "../../screens/Context";

export const BottomImage = () => {
  // @ts-ignore
  const {customTheme} = useContext(ThemeContext)
  return(
    <View style={imgStyles.poweredBy}>
      <Text style={[imgStyles.poweredTxt, {color: customTheme.text}]}>Powered By</Text>
      <Image style={imgStyles.logoBottom} source={logo_final1}/>
    </View>
  );
}