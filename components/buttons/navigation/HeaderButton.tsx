import React, {memo, useContext} from "react";
import {GestureResponderEvent, Pressable, StyleSheet} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {ThemeContext} from "../../../screens/Context";
import {StyleProps} from "react-native-reanimated";

const iconStyles = StyleSheet.create(
  {
    headerIcon: {
      backgroundColor: "transparent",
    }
  }
)

interface HeaderButtonTypes {
  action: any;
  icon: string;
  eS?: StyleProps;
}

const HeaderButton: React.FC<HeaderButtonTypes> = (
  {
    action,
    icon,
    eS
  }
) => {
  const {customTheme} = useContext(ThemeContext);
  const buttonStyles = [iconStyles.headerIcon, eS]
  return(
    <Pressable
      style={buttonStyles}
      onPress={action}>
      <MaterialCommunityIcons
        name={icon}
        color={customTheme.headerIconColors}
        size={30}
      />
    </Pressable>
  );
}

export default memo(HeaderButton);