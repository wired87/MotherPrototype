import {Text} from "react-native";
import React, {useContext} from "react";
import {textStyles} from "./textStyles";
import {ThemeContext} from "../../screens/Context";


interface DefaultTextTypes {
    text: string;
    moreStyles?: object;
}


// @ts-ignore
export const DefaultText: react.FC<DefaultTextTypes> = ({ text, moreStyles }) => {
    const { customTheme } = useContext(ThemeContext);
    const defaultTextStyles = [ textStyles.defaultText, {color: customTheme.text}]
    return(
        <Text style={[moreStyles || null, defaultTextStyles]}>
            {text}
        </Text>
    );
}