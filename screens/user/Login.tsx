import {
    KeyboardAvoidingView, Platform,
    SafeAreaView,
    Text,
    View
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useCallback, useEffect, useState} from "react";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithEmailAndPassword,
    updatePassword
} from "firebase/auth";

// @ts-ignore
import errorImg from "../../assets/images/errorImg.png";
// @ts-ignore
import * as Google from "expo-auth-session/providers/google";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";
import {useDispatch, useSelector} from "react-redux";
import {themeColors} from "../../colors/theme";
// @ts-ignore
import successAuth from "../../assets/images/successAuth";
import {userStyles} from "./userStyles";
import {AlertBox} from "../../components/modals/errorBox";
import failLottie from "../../assets/animations/failLottie.json";
import successLottie from "../../assets/animations/successLottie.json";
import {styles} from "../../components/modals/styles";
import LottieView from "lottie-react-native";
// Text
const googleIcon = "google"

// @ts-ignore
export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [modalVisible, setVisibility] = useState(false);
    const auth = getAuth();

    // @ts-ignore
    const text = useSelector(state => state.text.text)
    // @ts-ignore
    const screen = useSelector(state => state.screens.screen)

    const[request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '638697637722-kgj3icuat9ggo05qn6uetsjsr7vcug27.apps.googleusercontent.com',
        androidClientId: '638697637722-n50nno2tho7dob2hpd6fr186mdr48lio.apps.googleusercontent.com',
    });
    // declare allways inside component at the top of return

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token); //response.params.accessToken
            signInWithCredential(auth, credential).then(() => console.log("success"));
        }
    }, [response])



    // Memisierte funktion
    // useCallback to not load your function every time the user visits the webspagfe.
    // this increase the performence of the mobileapp
    const onChangeEmail = useCallback((text: React.SetStateAction<string>) => setEmail(text), []);
    const onChangePassword = useCallback((text: React.SetStateAction<string>) => setPassword(text), []);
    const dispatch = useDispatch()
    const onSignIn = useCallback(async () => {
        try {
            // @ts-ignore
            let action = {
                type: 'LOADING',
                payload: true
            };
            dispatch(action);
            const manualLoginResponse = await signInWithEmailAndPassword(getAuth(), email, password);
            setError(text.success);
            console.log("response:", manualLoginResponse)
            setVisibility(true);
        } catch (error) {
            // @ts-ignore
            setError(error.message);
            setVisibility(true);
            // @ts-ignore
            console.log("please check your Input and try again. \n" + error.message);
        } finally {
            // @ts-ignore
            let action = {
                type: 'LOADING',
                payload: false
            };
            dispatch(action);
        }
    }, [email, password]);

    return(
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={userStyles.loginContainer}>

                    <HeadingText text={text.signInText} extraStyles={undefined}/>

                    <DefaultInput placeholder={text.defaultEmailPlaceholder} value={email}
                                  onChangeAction={onChangeEmail}
                                  secure={false} editable={true}/>

                    <DefaultInput placeholder={text.defaultPasswordPlaceholder} value={password}
                                  onChangeAction={onChangePassword}
                                  secure={true} editable={true}/>

                    <DefaultButton text={text.signInText}
                                   indicatorColor={themeColors.headerText}
                                   onPressAction={onSignIn}
                                   indicatorSize={text.indicatorSizeSmall}
                                   secondIcon={null} extraStyles={undefined}/>

                    <Text style={userStyles.authTextInfo}>
                        Or
                    </Text>

                </View>
                <View style={userStyles.alternativeAuthMethodContainer}>
                    <DefaultButton text={text.signInWithGoogle}
                                   indicatorColor={themeColors.headerText}
                                   onPressAction={onSignIn}
                                   indicatorSize={text.indicatorSizeSmall}
                                   secondIcon={<MaterialCommunityIcons
                                       style={{marginRight: 5}}
                                       name={googleIcon}
                                       color={"#fff"} size={26}/>} extraStyles={undefined}/>
                </View>
            </KeyboardAvoidingView>
            <AlertBox
                modalVisible={modalVisible}
                setModalVisible={setVisibility}
                buttonText={error.includes(text.success) ? text.goHomeText : text.tryAgain}
                redirectAction={error.includes(text.success) ? navigation.navigate(screen.account) : null}
                errorAnimation={
                <LottieView
                    source={error.includes(text.success) ? failLottie : successLottie}
                    style={styles.lottieAnimationView}/>
                }
            />
        </SafeAreaView>
    );
}























