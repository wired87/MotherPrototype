





import React, {memo, useContext} from "react";
import {StyleSheet, View} from "react-native";
import {MotherNavContext, ThemeContext} from "../../screens/Context";
import DefaultPageNavigationBtn from "./DefaultPageNavigationBtn";
import {useRoute} from "@react-navigation/native";
import {uniStyles as us} from "../../screens/universalStyles";


const ls = StyleSheet.create(
  {
    main: {
      width: 100,
      height: 100,
      backgroundColor: "red",
    }
  }
)

const SingleErrorMessage: React.FC = () => {

  const { customTheme, darkmode } = useContext(ThemeContext);
  const {toggleScreen, updateToggleScreen} = useContext(MotherNavContext);

  const route = useRoute();

  const talkBtnColor =
    toggleScreen ? darkmode ? "white" : "rgb(0,0,0)" : "rgb(255,255,255)";

  const talkBtnBackgroundColor =
    toggleScreen ? "transparent" : customTheme.primaryButton;

  const chatBtnColor =
    !toggleScreen ? darkmode ? "white" : "rgb(0,0,0)" : "rgb(255,255,255)";

  const chatBtnBackgroundColor =
    !toggleScreen ? "transparent" : customTheme.primaryButton;


  return(
    <View style={[us.justifyAlignCenter, {zIndex: 10000000000, flexDirection: "row"}]}>
      <DefaultPageNavigationBtn
        text={"Talk"}
        onPressAction={() => updateToggleScreen()}
        extraTextStyles={{
          color: talkBtnColor,
          fontSize: 16,
          textAlign: "center"
        }}
        extraBtnStyles={{
          backgroundColor: talkBtnBackgroundColor
        }}
      />
      <DefaultPageNavigationBtn
        text={"Write"}
        onPressAction={() => updateToggleScreen()}
        extraTextStyles={{
          color: chatBtnColor,
          fontSize: 16,
          textAlign: "center"
        }}
        extraBtnStyles={{
          backgroundColor: chatBtnBackgroundColor
        }}
      />
    </View>
  );
}

export default memo(SingleErrorMessage);
