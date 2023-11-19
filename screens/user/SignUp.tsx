import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    View
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useCallback, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";

import {DefaultButton} from "../../components/buttons/DefaultButton";
import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";
import {useDispatch, useSelector} from "react-redux";

import {AlertBox} from "../../components/modals/errorBox";
import {userStyles} from "./userStyles";
import {FIREBASE_AUTH} from "../../firebase.config";
import {themeColors} from "../../colors/theme";
import {AuthUniversal} from "./AuthUniversal";

// Text
const signUpText = "Sign up";
const signUpGoogleText = signUpText + " with Google";
const indicatorSize = "small";
const success = "success";
const emailPlaceholder = "Your Email";
const passwordPlaceholder = "Create a Password";
const googleIcon = "google"


export const SignUp = (
    // @ts-ignore
    {navigation}
) => {

  return(
    <AuthUniversal
      navigation={navigation}
      googleAuthButtonAction={undefined} // change later to google auth signup

    />
  );
}


/*
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    View
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useCallback, useState} from "react";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";

import {DefaultButton} from "../../components/buttons/DefaultButton";
import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";
import {useDispatch, useSelector} from "react-redux";

import {AlertBox} from "../../components/modals/errorBox";
import {userStyles} from "./userStyles";
import {FIREBASE_AUTH} from "../../firebase.config";
import {themeColors} from "../../colors/theme";

// Text
const signUpText = "Sign up";
const signUpGoogleText = signUpText + " with Google";
const indicatorSize = "small";
const success = "success";
const emailPlaceholder = "Your Email";
const passwordPlaceholder = "Create a Password";
const googleIcon = "google"


export const SignUp = (
    // @ts-ignore
    {navigation}
) => {

    // @ts-ignore
    const text = useSelector(state => state.text.value)
    // @ts-ignore
    const screen = useSelector(state => state.screens.value)
  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)

  const auth = FIREBASE_AUTH;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setVisibility] = useState(false);
    const [inputError, setError] = useState("");

    const onChangeEmail = useCallback((text: React.SetStateAction<string>) => {
      console.log("text", text)
        setEmail(text)
    }, []);

    const onChangePassword = useCallback((text: React.SetStateAction<string>) => setPassword(text), []);
    const onSignUp = useCallback(() => signUp(), [email, password]); // change onSignUp on google login btn to right funcktion -> creat right fucntion
    const dispatch = useDispatch();

    const signUp = async () => {
        console.log("User Input E-Mail:", email)
        console.log("User Input Password:", password)
        try {
            // @ts-ignore
            let action = {
                type: 'LOADING',
                payload: true
            };
            dispatch(action);
            // @ts-ignore
            const user = await createUserWithEmailAndPassword(auth, email, password);
            setError(success);
            console.log("user: ", user);
            setVisibility(true)
        // @ts-ignore
        } catch (error) {
            // @ts-ignore
            setError(error.message);
            // @ts-ignore
            console.log("Error in signUp function while try to register the user: ", error.message);
            setVisibility(true);
            // @ts-ignore
            console.log("There was an error while signing you up: ", error.message);

        } finally {
            let action = {
                type: 'LOADING',
                payload: false
            };
            dispatch(action);
        }
    }

    return(
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center",
          backgroundColor: darkmode.primary}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={[userStyles.loginContainer, {borderBottomColor: darkmode.text}]}>
                    <HeadingText text={signUpText} extraStyles={undefined}/>

                    <DefaultInput
                      placeholder={emailPlaceholder}
                      value={email}
                      onChangeAction={onChangeEmail}
                      secure={false}
                      editable={true}
                      keyboardType={"email-address"}
                      extraStyles={{marginVertical: 30}}
                    />

                    <DefaultInput
                      placeholder={passwordPlaceholder}
                      value={password}
                      onChangeAction={onChangePassword}
                      secure={true}
                      editable={true}
                      keyboardType={undefined}
                      extraStyles={{marginVertical: 30}}
                    />

                    <DefaultButton
                      text={signUpText}
                       onPressAction={onSignUp}
                       secondIcon={undefined}
                       extraStyles={undefined}
                    />

                    <Text style={[userStyles.authTextInfo, {color: darkmode.text}]}>Or</Text>
                </View>

                <View style={userStyles.alternativeAuthMethodContainer}>
                    <DefaultButton
                        text={signUpGoogleText}
                        onPressAction={onSignUp}
                        extraStyles={undefined}
                        secondIcon={
                            <MaterialCommunityIcons
                               style={{marginRight: 5}}
                               name={googleIcon}
                               color={"#fff"} size={26}
                            />
                        }
                    />
                </View>
            </KeyboardAvoidingView>
            <AlertBox
                modalVisible={modalVisible}
                setModalVisible={setVisibility}
                buttonText={inputError.includes(text.success) ? text.goHomeText : text.tryAgain}
            />
        </SafeAreaView>
    );
}
 */