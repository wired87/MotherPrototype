import {Image, Text, View} from "react-native";
import React from "react";
import {imgStyles} from "./imgStyles";
// @ts-ignore
import logo_final1 from "../../assets/images/logo_final1.png";
import {useSelector} from "react-redux";
export const BottomImage = () => {
  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)
  return(
    <View style={imgStyles.poweredBy}>
      <Text style={[imgStyles.poweredTxt, {color: darkmode.text}]}>Powered By</Text>
      <Image style={imgStyles.logoBottom} source={logo_final1}/>
    </View>
  );
}