import {TouchableOpacity} from "react-native";
import {IconButton} from "react-native-paper";
import {themeColors} from "../../colors/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {DefaultText} from "../text/DefaultText";

// @ts-ignore
export const BreakButton = ({ onPress,extraStyles }) => {
  return(
    <TouchableOpacity
      onPress={onPress}
      style={[{
         borderRadius: 20,
        paddingVertical: 1, paddingHorizontal: 10, elevation: 10,   // @ts-ignore
        elevationColor: themeColors.deleteRed, width: 150, color: themeColors.mediumDarkDark, flexDirection: "row",
        backgroundColor: "rgba(4,10,49, 1)"
      }, extraStyles? extraStyles : null]}>
      {/*@ts-ignore*/}
      <DefaultText text={"break request"} moreStyles={{color: "white", marginRight: 5}}/>
      <MaterialCommunityIcons name={"close"} size={15} color={"white"}/>
    </TouchableOpacity>
  );
}

