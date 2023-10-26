import {Image, Text, View} from "react-native";
import React from "react";
import logo_final from "../../../assets/logo_final.png";

export const BottomImage = () => {
    return(
        <View style={styles.poweredBy}>
            <Text style={styles.poweredTxt}>Powered By</Text>
            <Image style={styles.logoBottom} source={logo_final}/>
        </View>
    );
}