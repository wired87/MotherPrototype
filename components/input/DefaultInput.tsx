import {TextInput} from "react-native";
import React from "react";

// @ts-ignore
export const DefaultInput = ({ placeholder, value, onChangeAction, secure, editable }) => {
    return(
        <TextInput multiline={false} maxLength={100} style={styles.loginContainerInput}
                   placeholder={placeholder} placeholderTextColor={themeColors.mediumDark}
                   secureTextEntry={secure} autoCapitalize={"none"}
                   value={value}
                   onChangeText={onChangeAction}
                   editable={editable}
        />
    );
}