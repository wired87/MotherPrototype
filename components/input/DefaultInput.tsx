import {TextInput} from "react-native";
import React from "react";
import {inputStyles} from "./styles";
import {themeColors} from "../../colors/theme";

// @ts-ignore
export const DefaultInput = ({ placeholder, value, onChangeAction, secure, editable, keyboardType }) => {
    return(
        <TextInput multiline={false}
                   maxLength={100}
                   style={[inputStyles.defaultInput, {marginBottom: 20, height: 50,}]}
                   placeholder={placeholder}
                   placeholderTextColor={themeColors.mediumDark}
                   secureTextEntry={secure} autoCapitalize={"none"}
                   value={value}
                   onChangeText={onChangeAction}
                   editable={editable}
                   keyboardType={keyboardType}
                   blurOnSubmit={true}

        />
    );
}