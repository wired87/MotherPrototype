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
import {AuthUniversal} from "./AuthUniversal";




// Text
const googleIcon = "google"

// @ts-ignore
export default function Login({navigation}) {

  return(
    <AuthUniversal
      navigation={navigation}
      googleAuthButtonAction={undefined}
    />
  );
}




/*
// @ts-ignore
import LottieView = require("lottie-react-native");
<LottieView
                    source={error.includes(text.success) ? failLottie : successLottie}
                    style={styles.lottieAnimationViewContainer}/>





      <SafeAreaView style={{
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: darkmode.primary
      }}>
        <KeyboardAvoidingView style={{backgroundColor: darkmode.primary}}
                              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={[userStyles.loginContainer, {backgroundColor: darkmode.primary, borderColor: darkmode.borderColor}]}>

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
              onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={{color: themeColors.dotNineWhite}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <DefaultButton
              text={text.signInText}
              onPressAction={onSignIn}
              secondIcon={null}
              extraStyles={undefined}/>

            <Text style={[userStyles.authTextInfo, {color: darkmode.text}]}>
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

 */


















