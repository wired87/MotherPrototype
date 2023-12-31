import {Text} from "react-native";
import React, {useContext} from "react";
import {textStyles} from "./textStyles";
import {ThemeContext} from "../../screens/Context";


interface DefaultTextTypes {
    text: string;
    moreStyles?: object;
    error?: string;
}


// @ts-ignore
export const DefaultText: react.FC<DefaultTextTypes> = ({ text, moreStyles, error }) => {
    const { customTheme } = useContext(ThemeContext);
    const defaultTextStyles = [ textStyles.defaultText,
        {color: error? customTheme.errorText : customTheme.text}]
    return(
        <Text style={[moreStyles || null, defaultTextStyles]}>
            {text}
        </Text>
    );
}