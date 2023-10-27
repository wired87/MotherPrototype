import {Text} from "react-native";
import React from "react";
import {textStyles} from "./textStyles";

// @ts-ignore
export const HeadingText = ({ text, extraStyles }) => {
    return(
        <Text style={extraStyles? extraStyles : textStyles.loginContainerHeaderText}>
            {text}
        </Text>
    );
}