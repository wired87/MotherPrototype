import {Text} from "react-native";
import React from "react";
import {textStyles} from "./textStyles";
import { useSelector } from "react-redux";
// @ts-ignore
export const HeadingText = ({ text, extraStyles }) => {
    // @ts-ignore
    const darkmode = useSelector(state => state.darkmode.value)
    return(
        <Text style={[extraStyles? extraStyles : textStyles.loginContainerHeaderText, {color: darkmode.switchTextColorLD}]}>
            {text}
        </Text>
    );
}