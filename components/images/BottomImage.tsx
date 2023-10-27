import {Image, Text, View} from "react-native";
import React from "react";
import {imgStyles} from "./imgStyles";
// @ts-ignore
import {logo_final} from "../../assets/images/logo_final.png";
export const BottomImage = () => {
    return(
        <View style={imgStyles.poweredBy}>
            <Text style={imgStyles.poweredTxt}>Powered By</Text>
            <Image style={imgStyles.logoBottom} source={logo_final}/>
        </View>
    );
}