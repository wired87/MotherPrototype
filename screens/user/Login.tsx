import {
  KeyboardAvoidingView, Platform,
  SafeAreaView,
  Text, TouchableOpacity,
  View
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useCallback, useEffect, useState} from "react";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
  onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";
import {useDispatch, useSelector} from "react-redux";
import {themeColors} from "../../colors/theme";
// @ts-ignore
import {userStyles} from "./userStyles";
import {AlertBox} from "../../components/modals/errorBox";




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
    const text = useSelector(state => state.text.value)

  // @ts-ignore
    const screen = useSelector(state => state.screens.value)
  const[request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '638697637722-kgj3icuat9ggo05qn6uetsjsr7vcug27.apps.googleusercontent.com',
    androidClientId: '638697637722-n50nno2tho7dob2hpd6fr186mdr48lio.apps.googleusercontent.com',
  });

    useEffect(() => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token); //response.params.accessToken
        signInWithCredential(getAuth(), credential).then(() => console.log("success"));
      }
    }, [response])

    // useCallback to not load your function every time the user visits the webspagfe.
    // this increase the performence of the mobileapp
  const onChangeEmail = useCallback((text: React.SetStateAction<string>) => setEmail(text), []);
  const onChangePassword = useCallback((text: React.SetStateAction<string>) => setPassword(text), []);

  const dispatch = useDispatch()

  useEffect(() => {
    console.log("1111user: ", auth.currentUser)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("AuthNavigator", {screen: screen.account}); // Use 'replace' to prevent going back to the login screen
      } else {
        setError("Could not sign in")
      }
    });
  }, []);

    const onSignIn = async () => {
      // @ts-ignore
      dispatch({
        type: 'LOADING',
        payload: true
      });
      try {
        await signInWithEmailAndPassword(auth, email, password).then(() => {
          setError(text.success);
        })
      } catch (error) {
        // @ts-ignore
        setError(error.message);
        setVisibility(true);
        // @ts-ignore
        console.log("please check your Input and try again. \n" + error.message);
      } finally {
        // @ts-ignore
        dispatch({
          type: 'LOADING',
          payload: false
        });
      }
  };

  return(
      <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "rgb(2,2,100)"}}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={userStyles.loginContainer}>

            <HeadingText
              text={text.signInText}
              extraStyles={undefined}/>

            <DefaultInput
              placeholder={text.defaultEmailPlaceholder}
              value={email}
              onChangeAction={onChangeEmail}
              secure={false}
              editable={true}
              keyboardType={"email-address"}
              extraStyles={{marginTop: 30}}
            />


            <DefaultInput
              placeholder={"Your Password"}
              value={password}
              onChangeAction={onChangePassword}
              secure={true}
              editable={true}
              keyboardType={undefined}
              extraStyles={{marginVertical: 20}}
            />
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: themeColors.borderThin, borderRadius: 14, // @ts-ignore
                elevation: 20, paddingVertical: 4, paddingHorizontal: 7,
                marginVertical: 10
              }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={{color: themeColors.dotNineWhite}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <DefaultButton
              text={text.signInText}
              onPressAction={onSignIn}
              secondIcon={null}
              extraStyles={undefined}/>

            <Text style={userStyles.authTextInfo}>
                Or
            </Text>
          </View>
          <View style={userStyles.alternativeAuthMethodContainer}>
            <DefaultButton
              text={text.signInWithGoogle}
              onPressAction={() => promptAsync()}
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
        {!error.includes(text.success) ?(
          <AlertBox
            modalVisible={modalVisible}
            setModalVisible={setVisibility}
            buttonText={error.includes(text.success) ? text.goHomeText : text.tryAgain}
          />
        ):null}
      </SafeAreaView>
    );
}




/*
// @ts-ignore
import LottieView = require("lottie-react-native");
<LottieView
                    source={error.includes(text.success) ? failLottie : successLottie}
                    style={styles.lottieAnimationViewContainer}/>
 */


















