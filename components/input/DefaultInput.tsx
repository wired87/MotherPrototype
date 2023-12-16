import {KeyboardTypeOptions, TextInput, StyleSheet, View} from "react-native";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {inputStyles} from "./styles";
import {themeColors} from "../../colors/theme";
import {IconButton} from "react-native-paper";
import {ThemeContext} from "../../screens/Context";

const localStyles = StyleSheet.create(
  {
    visibleButton: {
      position: "absolute",
      right: 5,
      marginVertical: 15
    },
    main: {
      padding: 0,
      flexDirection: "row",
    }
  }
)



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
        secureTextEntry={false}
        autoCapitalize={"none"}
        value={value}
        onChangeText={onChangeAction}
        editable={editable}
        keyboardType={keyboardType}
        blurOnSubmit={true}
      />

  );
}