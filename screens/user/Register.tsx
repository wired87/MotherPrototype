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
import {useDispatch} from "react-redux";
import LottieView from "lottie-react-native";
import failLottie from "../../assets/animations/failLottie.json";
import successLottie from "../../assets/animations/successLottie.json";
import {themeColors} from "../../colors/theme";
import {AlertBox} from "../../components/modals/errorBox";
import {styles} from "../../components/modals/styles";
import {userStyles} from "./userStyles";

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
    const text = useSelector(state => state.text.text)
    // @ts-ignore
    const screen = useSelector(state => state.screens.screen)

    const auth = getAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setVisibility] = useState(false);
    const [inputError, setError] = useState("");
    const [user, setUser] = useState("");

    const onChangeEmail = useCallback((text: React.SetStateAction<string>) => setEmail(text), []);
    const onChangePassword = useCallback((text: React.SetStateAction<string>) => setPassword(text), []);
    const onSignUp = useCallback(() => signUp(), []); // change onSignUp on google login btn to right funcktion -> creat right fucntion
    const dispatch = useDispatch()
    const signUp = async () => {
        try {
            // @ts-ignore
            let action = {
                type: 'LOADING',
                payload: true
            };
            dispatch(action);
            // @ts-ignore
            setUser(await createUserWithEmailAndPassword(auth, email, password));
            setError(success);
            console.log("user: ", user);
            setVisibility(true)
        // @ts-ignore
        } catch (error) {
            // @ts-ignore
            setError(error.message);
            console.log("Error in signUp function while try to register the user: ", inputError);
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
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={userStyles.loginContainer}>

                    <HeadingText text={signUpText} extraStyles={undefined}/>

                    <DefaultInput placeholder={emailPlaceholder} value={email}
                                  onChangeAction={onChangeEmail}
                                  secure={false} editable={true}/>

                    <DefaultInput placeholder={passwordPlaceholder} value={password}
                                  onChangeAction={onChangePassword}
                                  secure={true} editable={true}/>

                    <DefaultButton text={signUpText}
                                   indicatorColor={themeColors.headerText}
                                   onPressAction={onSignUp}
                                   indicatorSize={indicatorSize}
                                   secondIcon={null}
                                   extraStyles={undefined} />

                    <Text style={userStyles.authTextInfo}>Or</Text>
                </View>

                <View style={userStyles.alternativeAuthMethodContainer}>
                    <DefaultButton
                        text={signUpGoogleText}
                        indicatorColor={themeColors.headerText}
                        onPressAction={onSignUp}
                        indicatorSize={indicatorSize}
                        extraStyles={undefined}
                        secondIcon={
                            <MaterialCommunityIcons
                                           style={{marginRight: 5}}
                                           name={googleIcon}
                                           color={"#fff"} size={26}/>
                        }
                    />
                </View>
            </KeyboardAvoidingView>
            <AlertBox
                modalVisible={modalVisible}
                setModalVisible={setVisibility}
                buttonText={inputError.includes(text.success) ? text.goHomeText : text.tryAgain}
                redirectAction={inputError.includes(text.success) ? navigation.navigate(screen.account) : null}
                errorAnimation={
                    <LottieView
                        source={inputError.includes(text.success) ? failLottie : successLottie}
                        style={styles.lottieAnimationView}/>
                }
            />
        </SafeAreaView>
    );
}