import {View} from "react-native";
import {DefaultText} from "../../text/DefaultText";
import {DefaultPageNavigationBtn} from "../../buttons/DefaultPageNavigationBtn";
import React, {useCallback} from "react";
import {uniStyles} from "../../../screens/universalStyles"
import {useNavigation} from "@react-navigation/native";
// Strings
const historyReminder = "To see your Chat History, \n you must be logged in.";
const loginText = "Login";
const registerText = "Register";
import {useSelector} from "react-redux";
import {themeColors} from "../../../colors/theme";




export const ModalContentNoLog = (// @ts-ignore
  {extraAction}
) => {
    // @ts-ignore
    const screen = useSelector(state => state.screens.value)
    const navigation = useNavigation();


  const onPressRegister = useCallback(() => // @ts-ignore
    navigation.navigate("Chat", {screen: 'AuthNavigator', params: {screen: screen.register}}), []);

  const onPressLogin = useCallback(() => // @ts-ignore
    navigation.navigate('Chat', {screen: 'AuthNavigator', params: {screen: 'Login'}}),[]);

    return(
        <View style={uniStyles.reminderModalContainer}>
            <View style={{
                borderRadius: 10,
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
                }}>
                <DefaultText text={historyReminder} moreStyles={uniStyles.reminderModalText}/>
            </View>

            <View style={uniStyles.reminderModalBtnContainer}>
                <DefaultPageNavigationBtn
                  text={loginText}
                  extraTextStyles={uniStyles.reminderModalBtnText}
                  onPressAction={() => {
                    onPressLogin()
                    extraAction()
                  }}
                  extraBtnStyles={undefined}/>

                <DefaultPageNavigationBtn
                  text={registerText}
                  extraTextStyles={uniStyles.reminderModalBtnText}
                  onPressAction={() => {
                    onPressRegister()
                    extraAction()
                  }}
                  extraBtnStyles={undefined}/>
            </View>
        </View>
    );
}