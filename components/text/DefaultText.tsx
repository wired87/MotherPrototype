import {Text} from "react-native";
import React from "react";
import {textStyles} from "./textStyles";

// @ts-ignore
export const DefaultText = ({ text, moreStyles }) => {
    return(
        <Text style={[moreStyles? moreStyles : null, textStyles.defaultText]}>
            {text}
        </Text>
    );
}