import {ActivityIndicator, Text, TouchableOpacity} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {userStyles} from "../../screens/user/userStyles";



// @ts-ignore
export const DefaultButton = ({ extraStyles, onPressAction, text, secondIcon }) => {
    // @ts-ignore
    const loading = useSelector(state => state.loading.value);

    return(
        <TouchableOpacity style={extraStyles ? extraStyles: userStyles.changeInfoBtn} onPress={onPressAction}>
          <Text style={{color: "#fff", marginHorizontal: 5, fontSize: 16}}>{text}</Text>
          {secondIcon ? secondIcon : null}
        </TouchableOpacity>
    );
}