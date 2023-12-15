import {
  KeyboardAvoidingView, Platform,
  Text,
  View,
  Pressable
} from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";

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
import {useSelector} from "react-redux";

// @ts-ignore
import {userStyles as styles} from "./userStyles";
import {useRoute} from "@react-navigation/native";
import {DefaultText} from "../../components/text/DefaultText";
import {FIREBASE_AUTH} from "../../firebase.config";
import {AuthContext, PrimaryContext, ThemeContext} from "../Context";

// Text
const googleIcon: string = "google"
const success: string = "success";
const forgotPassword: string = "ForgotPassword"

// component values
const iconSize: number = 26;
const isIos = Platform.OS === 'ios';
const auth = getAuth();
const firebaseAuth = FIREBASE_AUTH;

export const AuthUniversal = ({
// @ts-ignore
  navigation, googleAuthButtonAction
}) => {
  const route = useRoute()
  const [error, setError] = useState("")
  const { user, setLoading } = useContext(PrimaryContext);

  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(AuthContext);

  const login: boolean = route.name === "Login";
  const buttonText: string = login ? "Sign in with Google" : "Sign up with Google";

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
  }, [response]);

  // @ts-ignore
  const text = useSelector(state => state.text.value);

  // @ts-ignore
  const screen = useSelector(state => state.screens.value);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token); //response.params.accessToken
      signInWithCredential(getAuth(), credential).then(() => console.log("success"));
    }
  }, [response])

  const onChangeEmail = useCallback((text: React.SetStateAction<string>) => setEmail(text), []);
  const onChangePassword = useCallback((text: React.SetStateAction<string>) => setPassword(text), []);

  const {customTheme} = useContext(ThemeContext);

  const authButtonText = login ? text.signInText : "Sign Up";

  // redirect after login
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("AuthNavigator", {screen: screen.account});
      }
    });
  }, [user]);

  const onSignIn = useCallback(async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log("User Input E-Mail:", email);
      console.log("User Input Password:", password);
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setError(text.success);
    } catch (e: unknown) {
      // @ts-ignore
      setError(e.message);
      console.log("Error in signIn function occurred", e)
    } finally {
      setLoading(false);
      setPassword("");
      setEmail("");
    }
  }, [email, password])

  const errorText = useMemo(() => {
    return <DefaultText text={error} moreStyles={{color: customTheme.errorText}}/>
  }, [error])

  const signUp = useCallback(async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log("User Input E-Mail:", email);
      console.log("User Input Password:", password);
    }
    try {
      setLoading(true);
      const user_response = await createUserWithEmailAndPassword(firebaseAuth, email, password);

      setError(success);
      if (process.env.NODE_ENV === 'development') {
        console.log("user: ", user_response);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
        console.error("Error in signUp function:", error.message)
      }
      console.log("Error while authenticate the user ")
    } finally {
      setLoading(false);
      setPassword("");
      setEmail("");
    }
  }, [password, email])

  const textColor = {color: customTheme.text}

  return (
    <KeyboardAvoidingView style={[styles.main, { backgroundColor: customTheme.primary }]}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'}>
        <View style={[styles.loginContainer, { backgroundColor: customTheme.primary, borderColor: customTheme.borderColor }]}>
          <HeadingText text={authButtonText} extraStyles={undefined} />

          <DefaultInput
            placeholder={text.defaultEmailPlaceholder}
            value={email}
            onChangeAction={onChangeEmail}
            secure={false}
            editable={true}
            keyboardType={"email-address"}
            extraStyles={styles.extraMargin}
          />

          <DefaultInput
            placeholder={"Your Password"}
            value={password}
            onChangeAction={onChangePassword}
            secure={true}
            editable={true}
            keyboardType={undefined}
            extraStyles={styles.extraMargin}
          />

          {error.length > 0 && !error.includes(text.success) && errorText}

          {login && (
            <Pressable
              style={[styles.forgotPasswordButton, { borderColor: customTheme.borderColor }]}
              onPress={() => navigation.navigate(forgotPassword)}>
              <Text style={textColor}>Forgot Password?</Text>
            </Pressable>
          )}

          <DefaultButton
            text={authButtonText}
            onPressAction={() => login ? onSignIn() : signUp()}
            extraStyles={styles.extraMargin} secondIcon={undefined} />

          <DefaultText text={"Or"} moreStyles={textColor} />

        </View>
        <View style={styles.alternativeAuthMethodContainer}>
          <DefaultButton
            text={buttonText}
            onPressAction={googleAuthButtonAction}
            secondIcon={<MaterialCommunityIcons
              style={styles.extraMarginRight}
              name={googleIcon} color={"#fff"}
              size={iconSize}
            />
          }
            extraStyles={undefined}
          />
        </View>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
}


/*


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
    <KeyboardAvoidingView style={{

    }}>
      <KeyboardAvoidingView style={{backgroundColor: customTheme.primary}}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View


          <HeadingText
            text={login ? text.signInText : "Sign Up"}
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
              style={}
              onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={{color: themeColors.dotNineWhite}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          ):null}
{
              }
          <DefaultButton
            text={text.signInText}
            onPressAction={() => login ? onSignIn() : signUp()}
            secondIcon={null}
            extraStyles={undefined}/>

          <Text style={[userStyles.authTextInfo, {color: customTheme.text}]}>
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

    </KeyboardAvoidingView>
  );

  const[request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '638697637722-kgj3icuat9ggo05qn6uetsjsr7vcug27.apps.googleusercontent.com',
    androidClientId: '638697637722-n50nno2tho7dob2hpd6fr186mdr48lio.apps.googleusercontent.com',
  });

<View style={userStyles.alternativeAuthMethodContainer}>
  <DefaultButton
    text={login? text.signInWithGoogle : signUpGoogleText}
    onPressAction={googleAuthButtonAction}
    extraStyles={undefined}
    secondIcon={
      <MaterialCommunityIcons
        style={}
        name={googleIcon}
        color={"#fff"} size={26}
      />
    }
  />
</View>

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