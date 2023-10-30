import {Text} from "react-native";
import React from "react";
import {themeColors} from "../../colors/theme";
import {textStyles} from "./textStyles";


{/* ...more styles is like a optional parameter -> it its null
        it will be ignored. otherwise it will be take the value)*/}

// @ts-ignore
export const DefaultText = ({ text, moreStyles }) => {
    return(
        <Text style={[moreStyles? moreStyles : null, textStyles.defaultText]}>
            {text}
        </Text>
    );
}