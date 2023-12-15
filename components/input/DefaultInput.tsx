import {KeyboardTypeOptions, TextInput} from "react-native";
import React from "react";
import {inputStyles} from "./styles";
import {themeColors} from "../../colors/theme";

export default interface DefaulttextInputTypes {
  placeholder?: string;
  value?: string;
  onChangeAction?: ((text: string) => void);
  secure?: boolean;
  editable: boolean;
  keyboardType?: KeyboardTypeOptions;
  extraStyles?: object;
}

// @ts-ignore
export const DefaultInput: React.FC<DefaulttextInputTypes> = (
  { placeholder,
    value,
    onChangeAction,
    secure,
    editable,
    keyboardType,
    extraStyles
  }) => {

  return(
    <TextInput
      multiline={false}
      maxLength={100}
      style={[inputStyles.defaultInput, extraStyles || null]} //->account no mb!!!<-
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