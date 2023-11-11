import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {styles} from "./styles";
import {themeColors} from "../../colors/theme";



// @ts-ignore
export const DefaultPageNavigationBtn = ({ text, onPressAction, extraTextStyles, extraBtnStyles }) => {
    return(
        <TouchableOpacity style={[styles.roundBtn, extraBtnStyles? extraBtnStyles : null, {backgroundColor: themeColors.sexyBlue}]} onPress={onPressAction}>
            <Text style={[styles.btnTxtProfile, extraTextStyles ? extraTextStyles : null]}>{text}</Text>
        </TouchableOpacity>
    );
}
