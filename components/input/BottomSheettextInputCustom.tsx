import {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import {inputStyles} from "./styles";
import {themeColors} from "../../colors/theme";
import DefaulttextInputTypes from "./DefaultInput";
import React from "react";

export const BottomSheetTextInputCustom: React.FC<DefaulttextInputTypes> = (
  {
    placeholder,
    value,
    onChangeAction,
    secure,
    editable,
    keyboardType,
    extraStyles
  }
) => {
  return(
    <BottomSheetTextInput
      multiline={false}
      maxLength={100}
      style={[inputStyles.defaultInput,  extraStyles || null //->account no mb!!!<-
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
