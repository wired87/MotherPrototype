import {Text, TouchableOpacity} from "react-native";
import React from "react";



// @ts-ignore
export const DefaultPageNavigationBtn = ({ text, onPressAction, extraTextStyles, extraBtnStyles }) => {
    return(
        <TouchableOpacity style={[styles.roundBtn, ...extraBtnStyles]} onPress={onPressAction}>
            <Text style={[styles.btnTxtProfile, ...extraTextStyles]}>{text}</Text>
        </TouchableOpacity>
    );
}
