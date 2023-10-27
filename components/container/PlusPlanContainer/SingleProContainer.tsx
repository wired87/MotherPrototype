import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Text, View} from "react-native";
import React from "react";
import {styles} from "./plusContainerStyles";


export const SingleProContainer= (
    // @ts-ignore
    { text }
) => {
    return(
        <View style={styles.singleProtextContainer}>
            <Icon name={"check"} size={20} color="#2eb82e" />
            <Text style={styles.topBtnTxt}>
                {text}
            </Text>
        </View>
    );

}