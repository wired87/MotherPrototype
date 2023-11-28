import {Text} from "react-native";
import React, {useContext} from "react";
import {textStyles} from "./textStyles";
import { useSelector } from "react-redux";
import {ThemeContext} from "../../screens/Context";
// @ts-ignore
export const HeadingText = ({ text, extraStyles }) => {

    const { customTheme } = useContext(ThemeContext)
    return(
        <Text style={[extraStyles? extraStyles : textStyles.loginContainerHeaderText, {color: customTheme.text}]}>
            {text}
        </Text>
    );
}