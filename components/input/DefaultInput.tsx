import {TextInput} from "react-native";
import React from "react";
import {inputStyles} from "./styles";
import {themeColors} from "../../colors/theme";

// @ts-ignore
export const DefaultInput = ({ placeholder, value, onChangeAction, secure, editable, keyboardType, extraStyles }) => {

  return(
    <TextInput
      multiline={false}
      maxLength={100}
      style={[inputStyles.defaultInput, extraStyles? extraStyles : null,
        {height: 50, marginBottom: 0, minWidth: 250, marginHorizontal: 5} //->account no mb!!!<-
      ]}
      placeholder={placeholder}
      placeholderTextColor={themeColors.mediumDark}
      secureTextEntry={secure}
      autoCapitalize={"none"}
      value={value}
      onChangeText={onChangeAction}
      editable={editable}
      keyboardType={keyboardType}
      blurOnSubmit={true}
    />
  );
}