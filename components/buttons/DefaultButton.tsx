import {ActivityIndicator, Pressable, Text} from "react-native";
import React, {useContext} from "react";
import {userStyles} from "../../screens/user/userStyles";
import {PrimaryContext, ThemeContext} from "../../screens/Context";

// @ts-ignore
export const DefaultButton = ({ extraStyles, onPressAction, text, secondIcon }) => {
  const { loading } = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);

  return(
      <Pressable style={[extraStyles ? extraStyles: null, userStyles.changeInfoBtn,
        {backgroundColor: customTheme.primaryButton,
        color: '#fff'}]} onPress={onPressAction} >
        <Text style={{ color: "white", marginHorizontal: 5, fontSize: 16 }}>{text}</Text>
        {loading ? <ActivityIndicator size={"small"}/> : secondIcon?  secondIcon: null}
      </Pressable>
  );
}