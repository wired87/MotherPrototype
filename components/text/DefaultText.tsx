import {Text} from "react-native";
import React from "react";


{/* ...more styles is like a optional parameter -> it its null
        it will be ignored. otherwise it will be take the value)*/}

// @ts-ignore
export const DefaultText = ({ text, moreStyles }) => {
    return(
        <Text style={[...moreStyles, {color: "black"}]}>
            {text}
        </Text>
    );
}