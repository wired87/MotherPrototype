import {
    KeyboardAvoidingView, Platform,
    SafeAreaView,
    Text,
    View
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from "../../toolStyles";
import {themeColors} from "../../../../theme/theme";
import React, {useCallback, useEffect, useState} from "react";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithEmailAndPassword,
    updatePassword
} from "firebase/auth";
import {AlertBox} from "../../components/modals/AlertBox"
import successAuth from "../../../../assets/successAuth.png";
// @ts-ignore
import errorImg from "../../assets/images/errorImg.png";
import * as Google from "expo-auth-session/providers/google";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";

// Text
const googleIcon = "google"




// @ts-ignore
export default function Login({navigation}) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setError] = useState("");
    const [modalVisible, setVisibility] = useState(false);
    const auth = getAuth();


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

    const onSignIn = useCallback(async () => {
        try {
            setLoading(true);
            const manualLoginResponse = await signInWithEmailAndPassword(getAuth(), email, password);
            setError(success);
            console.log("response:", manualLoginResponse)
            setVisibility(true);
        } catch (error) {
            // @ts-ignore
            await setError(error.message);
            setVisibility(true);
            // @ts-ignore
            console.log("please check your Input and try again. \n" + error.message);
        } finally {
            setLoading(false);
        }
    }, [email, password]);

    return(
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.loginContainer}>

                    <HeadingText text={signInText}/>

                    <DefaultInput placeholder={emailPlaceholder} value={email}
                                  onChangeAction={onChangeEmail}
                                  secure={false} editable={true}/>

                    <DefaultInput placeholder={passwordPlaceholder} value={password}
                                  onChangeAction={onChangePassword}
                                  secure={true} editable={true}/>

                    <DefaultButton text={signInText} loading={loading}
                                   indicatorColor={themeColors.headerText}
                                   onPressAction={onSignIn}
                                   indicatorSize={indicatorSize}
                                   secondIcon={null}/>

                    <Text style={styles.authTextInfo}>
                        Or
                    </Text>

                </View>
                <View style={styles.alternativeAuthMethodContainer}>
                    <DefaultButton text={signInGoogleText} loading={loading}
                                   indicatorColor={themeColors.headerText}
                                   onPressAction={onSignIn}
                                   indicatorSize={indicatorSize}
                                   secondIcon={
                                       <MaterialCommunityIcons
                                           style={{marginRight: 5}}
                                           name={googleIcon}
                                           color={"#fff"} size={26}/>}/>
                </View>
            </KeyboardAvoidingView>
            <AlertBox
                alert={<ErrorAlert inputError={inputError} navigation={navigation} />}
                modalVisible={modalVisible}
                setModalVisible={setVisibility}
                buttonText={inputError.includes(success) ? goHomeText : tryAgain}
                redirectAction={inputError.includes(success) ? navigation.navigate(successRedirectPage) : null}
                errorImg={inputError.includes(success) ? successAuth : errorImg}/>
        </SafeAreaView>
    );
}























