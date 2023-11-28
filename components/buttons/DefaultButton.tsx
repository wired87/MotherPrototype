import {ActivityIndicator, Pressable, Text} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {userStyles} from "../../screens/user/userStyles";




// @ts-ignore
export const DefaultButton = ({ extraStyles, onPressAction, text, secondIcon }) => {
  // @ts-ignore
  const loading = useSelector(state => state.loading.value);

    return(
        <Pressable style={[extraStyles ? extraStyles: null, userStyles.changeInfoBtn,
          {backgroundColor:'#01152a',
          color: '#fff'}]} onPress={onPressAction} >
          <Text style={{ color: "white", marginHorizontal: 5, fontSize: 16 }}>{text}</Text>
          {loading ? <ActivityIndicator size={"small"}/> : secondIcon?  secondIcon: null}
        </Pressable>
    );
}