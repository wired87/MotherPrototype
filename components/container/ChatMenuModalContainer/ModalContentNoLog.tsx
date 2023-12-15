import { View, StyleSheet } from "react-native";
import {DefaultText} from "../../text/DefaultText";
import DefaultPageNavigationBtn from "../../buttons/DefaultPageNavigationBtn";
import React, {useCallback, useContext} from "react";
import {uniStyles} from "../../../screens/universalStyles"
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {ThemeContext} from "../../../screens/Context";

// Strings
const historyReminder = "To see your Chat History, \n you must be logged in.";
const loginText = "Login";
const registerText = "Register";
export const ModalContentNoLog = () => {
  const { customTheme } = useContext(ThemeContext);


  // @ts-ignore
  const screen = useSelector(state => state.screens.value)
  const navigation = useNavigation();

  const onPressAuth = useCallback((navScreen: string) => // @ts-ignore
    navigation.navigate("Chat", {screen: 'AuthNavigator', params: {screen: navScreen}}), []);

  const background = {backgroundColor: customTheme.primaryButton};

  return(
    <View style={uniStyles.reminderModalContainer}>
      <View style={localStyles.main}>
        <DefaultText text={historyReminder} moreStyles={[uniStyles.reminderModalText, {color: customTheme.text}]}/>
      </View>
      <View style={uniStyles.reminderModalBtnContainer}>
        <DefaultPageNavigationBtn
          text={loginText}
          extraTextStyles={uniStyles.reminderModalBtnText}
          onPressAction={() => onPressAuth(screen.login)}
          extraBtnStyles={background}/>

        <DefaultPageNavigationBtn
          text={registerText}
          extraTextStyles={uniStyles.reminderModalBtnText}
          onPressAction={() => onPressAuth(screen.register)}
          extraBtnStyles={background}/>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create(
  {
    main: {
      borderRadius: 10,
      paddingHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
    }
  }
)