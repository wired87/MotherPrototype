import {
  KeyboardAvoidingView, Platform,
  SafeAreaView,
  Text, TouchableOpacity,
  View
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useCallback, useContext, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
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
import {useRoute} from "@react-navigation/native";
import {DefaultText} from "../../components/text/DefaultText";
import {FIREBASE_AUTH} from "../../firebase.config";
import {AuthContext, PrimaryContext} from "../Context";







// Text
const googleIcon = "google"
const signUpText = "Sign up";
const signUpGoogleText = signUpText + " with Google";
const indicatorSize = "small";
const success = "success";
const emailPlaceholder = "Your Email";
const passwordPlaceholder = "Create a Password";
const errorTextMessage = "There is something wrong with your input"

const errorText = (text: any) => {
  return(
    <DefaultText text={text} moreStyles={{color: themeColors.deleteRed}} />
  );

}


export const AuthUniversal = ({ // @ts-ignore
  navigation, googleAuthButtonAction,

}) => {
  const route = useRoute()

  const { darkmode, user } = useContext(PrimaryContext);

  const { email,
    setEmail,
    password,
    setPassword,
    error,
    setError } = useContext(AuthContext);

  // @ts-ignore
  const colors = useSelector(state => state.colors.value);

  const auth = getAuth();
  const firebaseAuth = FIREBASE_AUTH;
  const login = route.name === "Login"

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







  // @ts-ignore
  const text = useSelector(state => state.text.value)
  // @ts-ignore
  const screen = useSelector(state => state.screens.value)


  //const onSignUp = useCallback(() => signUp(), [email, password]);



  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token); //response.params.accessToken
      signInWithCredential(getAuth(), credential).then(() => console.log("success"));
    }
  }, [response])

  const onChangeEmail = useCallback((text: React.SetStateAction<string>) => setEmail(text), []);
  const onChangePassword = useCallback((text: React.SetStateAction<string>) => setPassword(text), []);


  const dispatch = useDispatch()


  useEffect(() => {
    console.log("user ", user)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("AuthNavigator", {screen: screen.account}); // Use 'replace' to prevent going back to the login screen
      }
    });
  }, []);


  useEffect(() => {
    console.log("email", email.length, email)
    console.log("password", password.length, password)
    console.log("error", error.length, error)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("AuthNavigator", {screen: screen.account}); // Use 'replace' to prevent going back to the login screen
      }
    });
  }, [email, password, error]);

  const onSignIn = async () => {
    // @ts-ignore
    dispatch({
      type: 'LOADING',
      payload: true
    });
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setError(text.success);
        })
    } catch (error) {
      // @ts-ignore
      setError(error.message);
      // @ts-ignore
      console.log("please check your Input and try again. \n" + error.message);
    } finally {
      // @ts-ignore
      dispatch({
        type: 'LOADING',
        payload: false
      });
      setPassword("");
      setEmail("");
    }
  };


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
      const user_response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      setError(success);
      console.log("user: ", user_response);
      // @ts-ignore

    } catch (error) {
      // @ts-ignore
      setError(error.message);

      // @ts-ignore
      console.log("Error in signUp function while try to register the user: ", error.message);

      // @ts-ignore
      console.log("There was an error while signing you up: ", error.message);

    } finally {
      let action = {
        type: 'LOADING',
        payload: false
      };
      dispatch(action);
      setPassword("");
      setEmail("");
    }
  }

  return(
    <SafeAreaView style={{
      flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.primary[darkmode? 1 : 0]
    }}>
      <KeyboardAvoidingView style={{backgroundColor: colors.primary[darkmode? 1 : 0]}}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={[userStyles.loginContainer,
            {backgroundColor: colors.primary[darkmode? 1 : 0]
          , borderColor: colors.borderColor[darkmode? 1 : 0]}]}>

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

          {(error.length > 0 && !error.includes(text.success)) ? (
            errorText(errorTextMessage)
          ):null}

          {login? (
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: colors.borderColor[darkmode? 1 : 0] /*themeColors.borderThin*/, borderRadius: 14, // @ts-ignore
                elevation: 20, paddingVertical: 4, paddingHorizontal: 7,
                marginVertical: 10
              }}
              onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={{color: themeColors.dotNineWhite}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          ):null}

          <DefaultButton
            text={text.signInText}
            onPressAction={() => login ? onSignIn() : signUp()}
            secondIcon={null}
            extraStyles={undefined}/>

          <Text style={[userStyles.authTextInfo, {color: colors.text[darkmode? 1 : 0]}]}>
            Or
          </Text>

        </View>
        <View style={userStyles.alternativeAuthMethodContainer}>
          <DefaultButton
            text={login? text.signInWithGoogle : signUpGoogleText}
            onPressAction={googleAuthButtonAction}
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

    </SafeAreaView>
  );
}



/*


  const[request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '638697637722-kgj3icuat9ggo05qn6uetsjsr7vcug27.apps.googleusercontent.com',
    androidClientId: '638697637722-n50nno2tho7dob2hpd6fr186mdr48lio.apps.googleusercontent.com',
  });


const onSignIn = async () => {
    // @ts-ignore
    dispatch({
      type: 'LOADING',
      payload: true
    });// @ts-ignore
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
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
 */