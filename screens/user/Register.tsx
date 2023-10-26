import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {styles} from "../../toolStyles";
import {themeColors} from "../../../../theme/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useCallback, useState} from "react";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {AlertBox} from "../../../universal/errorBox";
import errorImg from "../../../../assets/errorImg.png";
import successAuth from '../../../../assets/successAuth.png';
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";


// Text
const signUpText = "Sign up";
const signUpGoogleText = signUpText + " with Google";
const indicatorSize = "small";
const success = "success";
const emailPlaceholder = "Your Email";
const passwordPlaceholder = "Create a Password";
const successRedirectPage = "ToolsMain";
const goHomeText = "Go Home";
const tryAgain = "Try again";
const googleIcon = "google"

// @ts-ignore
export const SignUp = ({navigation}) => {

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

    const signUp = async () => {
        try {
            setLoading(true);
            setUser(await createUserWithEmailAndPassword(auth, email, password));
            await setError(success);
            console.log("user: ", user);
            setVisibility(true)
        // @ts-ignore
        } catch (error) {
            // @ts-ignore
            await setError(error.message);
            console.log("Error in signUp function while try to register the user: ", inputError);
            setVisibility(true);
            // @ts-ignore
            console.log("There was an error while signing you up: ", error.message);

        } finally {
            setLoading(false);
        }
    }

    return(
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.loginContainer}>

                    <HeadingText text={signUpText}/>

                    <DefaultInput placeholder={emailPlaceholder} value={email}
                                  onChangeAction={onChangeEmail}
                                  secure={false} editable={true}/>

                    <DefaultInput placeholder={passwordPlaceholder} value={password}
                                  onChangeAction={onChangePassword}
                                  secure={true} editable={true}/>

                    <DefaultButton text={signUpText} loading={loading}
                                   indicatorColor={themeColors.headerText}
                                   onPressAction={onSignUp}
                                   indicatorSize={indicatorSize}
                                   secondIcon={null} />

                    <Text style={styles.authTextInfo}>Or</Text>
                </View>

                <View style={styles.alternativeAuthMethodContainer}>
                    <DefaultButton text={signUpGoogleText} loading={loading}
                                   indicatorColor={themeColors.headerText}
                                   onPressAction={onSignUp}
                                   indicatorSize={indicatorSize}
                                   secondIcon={
                                       <MaterialCommunityIcons
                                           style={{marginRight: 5}}
                                           name={googleIcon}
                                           color={"#fff"} size={26}/>
                                   }/>
                </View>
            </KeyboardAvoidingView>
            <AlertBox
                alert={<ErrorAlert inputError={inputError} navigation={navigation} />}
                modalVisible={modalVisible}
                setModalVisible={setVisibility}
                buttonText={inputError.includes(success) ? goHomeText : tryAgain}
                redirectAction={inputError.includes(success) ? navigation.navigate(successRedirectPage) : null}
                errorImg={inputError.includes(success) ? successAuth : errorImg}
            />
        </SafeAreaView>
    );
}