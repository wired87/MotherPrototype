import {TextInput, StyleSheet} from "react-native";
import {inputStyles as styles} from "./styles";
import {themeColors} from "../../colors/theme";
import React from "react";

interface Form {
  e_mail: string;
  message: string;
  options: string;
  first_name: string;
  last_name: string;
}

interface MultilineInputTypes {
    value?: Form;
    onChangeText: (text: string) => void;
    placeholder: string;
}

const localStyles = StyleSheet.create(
  {
    inputExtraStyles: {
      minHeight: 100,
      textAlignVertical: "top",
      paddingTop: 12
    }
  }
)

export const MultilineInput: React.FC<MultilineInputTypes> = ({ value, onChangeText, placeholder }) => {
    return(
      <TextInput
        multiline={true}
        value={value as any}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={false}
        editable={true}
        blurOnSubmit={true}
        maxLength={1200}
        style={[styles.defaultInput, localStyles.inputExtraStyles]}
        placeholderTextColor={themeColors.mediumDark}
      />
    );
}