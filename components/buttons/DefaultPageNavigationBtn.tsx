import {Pressable, Text} from "react-native";
import React, {memo, useContext} from "react";
import {styles} from "./styles";
import {ThemeContext} from "../../screens/Context";


const DefaultPageNavigationBtn =
  (// @ts-ignore
    { text, onPressAction, extraTextStyles, extraBtnStyles
  }
) => {
  // vars
  const { customTheme } = useContext(ThemeContext);
  const extraLocalStyles = [styles.roundBtn, extraBtnStyles] // authHeader not , {backgroundColor: customTheme.primaryButton}
  const extraLocalTextStyles = [styles.btnTxtProfile, extraTextStyles || null];

  return(
  <Pressable style={extraLocalStyles} onPress={onPressAction}>
    <Text style={extraLocalTextStyles}>{text}</Text>
  </Pressable>
  );
}
export default memo(DefaultPageNavigationBtn);
