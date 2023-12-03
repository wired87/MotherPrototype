import {Pressable, Text} from "react-native";
import React, {memo} from "react";
import {styles} from "./styles";


const DefaultPageNavigationBtn =
  (// @ts-ignore
    { text, onPressAction, extraTextStyles, extraBtnStyles
  }
) => {
    return(
    <Pressable style={[styles.roundBtn, extraBtnStyles]} onPress={onPressAction}>
      <Text style={[styles.btnTxtProfile, extraTextStyles ? extraTextStyles : null]}>{text}</Text>
    </Pressable>
  );
}
export default memo(DefaultPageNavigationBtn);
