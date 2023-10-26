import {Text} from "react-native";
import React from "react";

// @ts-ignore
export const HeadingText = ({ text, extraStyles }) => {
    return(
        <Text style={extraStyles? extraStyles : styles.loginContainerHeaderText}>
            {text}
        </Text>
    );
}