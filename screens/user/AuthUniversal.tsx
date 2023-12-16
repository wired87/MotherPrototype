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
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Firebase stuff
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
import {FIREBASE_AUTH} from "../../firebase.config";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';

import {DefaultButton} from "../../components/buttons/DefaultButton";
import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";
import {useSelector} from "react-redux";

// @ts-ignore
import {userStyles as styles} from "./userStyles";
import {useRoute} from "@react-navigation/native";
import {DefaultText} from "../../components/text/DefaultText";

import {AuthContext, PrimaryContext, ThemeContext} from "../Context";
import {PasswordInput} from "../../components/input/PasswordInput";

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
  navigation
}) => {
  const route = useRoute();
  const [error, setError] = useState("");
  const { user, setLoading } = useContext(PrimaryContext);
  const {
    password,
    setPassword,
  } = useContext(AuthContext);

  const login: boolean = route.name === "Login";
  const buttonText: string = login ? "Sign in with Google" : "Sign up with Google";
  const [email, setEmail] = useState("");

  // GOOGLE AUTH FUNCTIONS
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  const signInWithGoogleCustom = useCallback(() => {
    promptAsync().then(r => console.log("SignIn with Google started."));
  }, [promptAsync, response, request])

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
            editable={true}
            keyboardType={"email-address"}
            extraStyles={styles.extraMargin}
          />

          <PasswordInput
            placeholder={"Your Password"}
            value={password}
            onChangeAction={onChangePassword}
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
            onPressAction={() => promptAsync()}
            secondIcon={
            <MaterialCommunityIcons
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
