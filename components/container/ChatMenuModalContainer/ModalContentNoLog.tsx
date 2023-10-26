import {View} from "react-native";
import {DefaultText} from "../../text/DefaultText";
import {DefaultPageNavigationBtn} from "../../buttons/DefaultPageNavigationBtn";
import React, {useCallback, useNavigation} from "react";

// Strings
const historyReminder = "To see your Chat History, you must be {\"\\n\"} logged in.";
const loginText = "Login";
const registerText = "Register";



export const ModalContentNoLog = // @ts-ignore
() => {
    const navigation = useNavigation();
    const onPressRegister = useCallback(() => navigation.navigate("Register"), []);
    const onPressLogin = useCallback(() => navigation.navigate("Login"), []);
    return(
        <View style={styles.reminderModalContainer}>
            <View style={{
                borderRadius: 10,
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center"}}>
                <DefaultText text={historyReminder} moreStyles={styles.reminderModalText}/>
            </View>

            <View style={styles.reminderModalBtnContainer}>
                <DefaultPageNavigationBtn text={loginText}
                                          extraTextStyles={styles.reminderModalBtnText}
                                          onPressAction={onPressLogin}
                                          extraBtnStyles={undefined}/>

                <DefaultPageNavigationBtn text={registerText}
                                          extraTextStyles={styles.reminderModalBtnText}
                                          onPressAction={onPressRegister}
                                          extraBtnStyles={undefined}/>
            </View>
        </View>
    );
}