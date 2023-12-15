import {Text} from "react-native";
import React from "react";
import {textStyles} from "./textStyles";


interface DefaultTextTypes {
    text: string;
    moreStyles?: object;
}


// @ts-ignore
export const DefaultText: react.FC<DefaultTextTypes> = ({ text, moreStyles }) => {
    return(
        <Text style={[moreStyles || null, textStyles.defaultText]}>
            {text}
        </Text>
    );
}