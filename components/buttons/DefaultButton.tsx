import {ActivityIndicator, Text, TouchableOpacity} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {userStyles} from "../../screens/user/userStyles";



// @ts-ignore
export const DefaultButton = ({ extraStyles, onPressAction, indicatorColor, indicatorSize, text, secondIcon }) => {
    // @ts-ignore
    const loading = useSelector(state => state.loading.value);

    return(
        <TouchableOpacity style={extraStyles ? extraStyles: userStyles.changeInfoBtn} onPress={onPressAction}>
            {loading ? (
                // @ts-ignore
                <ActivityIndicator style={{marginRight: 10}} color={!(indicatorColor ? "rgb(255,255,255)": indicatorColor)} size={indicatorSize} />
            ) : (
                secondIcon ? secondIcon : null
            )}
            <Text style={{color: "#fff"}}>{text}</Text>
        </TouchableOpacity>
    );
}