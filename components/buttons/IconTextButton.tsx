import {Text, TouchableOpacity} from "react-native";
import React from "react";


// @ts-ignore
export const IconTexttButton = ({ icon, size, text, iconColor,onPressAction }) => {
    return(
        <TouchableOpacity style={styles.changeInfoBtn} onPress={onPressAction}>
            <Text style={styles.buttonTextProfile}>{text}</Text>

            <MaterialCommunityIcons name={icon} size={size} color={iconColor ? iconColor : "rgb(255,255,255)"}
                                    style={styles.buttonIcon} />
        </TouchableOpacity>
    );
}


