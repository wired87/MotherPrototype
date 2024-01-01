import {KeyboardTypeOptions, TextInput} from "react-native";
import React, {useContext} from "react";
import {inputStyles} from "./styles";
import {themeColors} from "../../colors/theme";
import {ThemeContext} from "../../screens/Context";


export default interface DefaulttextInputTypes {
  placeholder?: string;
  value: string;
  onChangeAction?: ((text: string) => void);
  secure?: boolean;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  extraStyles?: object;
  multiline?: boolean;
  numberOfLines?: number
}

// @ts-ignore
export const DefaultInput: React.FC<DefaulttextInputTypes> = (
  {
    placeholder,
    value,
    onChangeAction,
    editable,
    keyboardType,
    extraStyles,
    multiline,
    numberOfLines
  }
) => {

  const { customTheme } = useContext(ThemeContext);
  const customBackground = customTheme.primary
  return(
    <TextInput
      selectionColor={customTheme.errorText}
      multiline={multiline || false}
      numberOfLines={numberOfLines || 1}
      style={[inputStyles.defaultInput, extraStyles || null, {backgroundColor: customBackground, color: customTheme.text}]} //->account no mb!!!<-
      placeholder={placeholder}
      placeholderTextColor={customTheme.placeholder}
      secureTextEntry={false}
      autoCapitalize={"none"}
      value={value}
      onChangeText={onChangeAction}
      editable={editable || true}
      keyboardType={keyboardType}
      blurOnSubmit={true}
    />
  );
}