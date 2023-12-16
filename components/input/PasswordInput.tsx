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
export const PasswordInput: React.FC<DefaulttextInputTypes> = (
  { placeholder,
    value,
    onChangeAction,
    editable,
    keyboardType,
    extraStyles
  }) => {
  const [secure, setSecure] = useState(true);
  const [icon, setIcon]  = useState("eye-off-outline");
  const buttonStyles = [{}, localStyles.visibleButton]
  const { customTheme } = useContext(ThemeContext);


  useEffect(() => {
    if (secure) {
      setIcon("eye-off-outline")
    } else {
      setIcon("eye-outline")
    }
  }, [secure])


  const setPasswordVisibility = useCallback(() => {
    setSecure(!secure);
  },[secure])


  return(
    <View style={localStyles.main}>
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
      <IconButton onPress={setPasswordVisibility} iconColor={customTheme.headerIconColors} icon={icon} style={buttonStyles}/>
    </View>
  );
}