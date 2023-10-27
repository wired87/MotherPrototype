import {View} from "react-native";
import {DefaultText} from "../../text/DefaultText";
import {DefaultPageNavigationBtn} from "../../buttons/DefaultPageNavigationBtn";
import React, {useCallback} from "react";
import {uniStyles} from "../../../screens/universalStyles"
import {useNavigation} from "@react-navigation/native";
// Strings
const historyReminder = "To see your Chat History, you must be {\"\\n\"} logged in.";
const loginText = "Login";
const registerText = "Register";
import {useSelector} from "react-redux";



export const ModalContentNoLog = // @ts-ignore
() => {
    // @ts-ignore
    const screen = useSelector(state => state.screens.screen)
    const navigation = useNavigation();

    // @ts-ignore
    const onPressRegister = useCallback(() => navigation.navigate(screen.register), []);
    // @ts-ignore
    const onPressLogin = useCallback(() => navigation.navigate(screen.login), []);

    return(
        <View style={uniStyles.reminderModalContainer}>
            <View style={{
                borderRadius: 10,
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center"}}>
                <DefaultText text={historyReminder} moreStyles={uniStyles.reminderModalText}/>
            </View>

            <View style={uniStyles.reminderModalBtnContainer}>
                <DefaultPageNavigationBtn text={loginText}
                                          extraTextStyles={uniStyles.reminderModalBtnText}
                                          onPressAction={onPressLogin}
                                          extraBtnStyles={undefined}/>

                <DefaultPageNavigationBtn text={registerText}
                                          extraTextStyles={uniStyles.reminderModalBtnText}
                                          onPressAction={onPressRegister}
                                          extraBtnStyles={undefined}/>
            </View>
        </View>
    );
}