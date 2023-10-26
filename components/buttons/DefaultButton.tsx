import {ActivityIndicator, Text, TouchableOpacity} from "react-native";
import React from "react";
import {styles} from "../styles";
import { useSelector } from "react-redux";

// @ts-ignore
const loading = useSelector(state => state.loading.loading);

// @ts-ignore
export const DefaultButton = ({ extraStyles, onPressAction, indicatorColor, indicatorSize, text, secondIcon }) => {
    return(
        <TouchableOpacity style={extraStyles ? extraStyles: styles.changeInfoBtn} onPress={onPressAction}>
            {loading ? (
                <ActivityIndicator style={{marginRight: 10}} color={!(indicatorColor ? "rgb(255,255,255)": indicatorColor)} size={indicatorSize} />
            ) : (
                secondIcon ? secondIcon : null
            )}
            <Text style={{color: "#fff"}}>{text}</Text>
        </TouchableOpacity>
    );

}