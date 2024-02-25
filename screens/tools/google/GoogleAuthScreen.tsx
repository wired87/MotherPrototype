import React, {memo, useCallback, useContext, useState} from "react";
import {View, StyleSheet} from "react-native";
import {ThemeContext} from "../../Context";
import UniversalServiceScreen from "../UniversalServiceScreen";
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import {signIn} from "./AuthFunctions";
import {useGoogleAuthObject} from "../../../AppHooks/AuthHooks";
import {GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID} from "@env";

const ls = StyleSheet.create(
  {
    main: {
      width: 100,
      height: 100,
      backgroundColor: "red",
    }
  }
)


/*
accesstoken is not permanently accessible so build a func to refresh it / get a new whe chack failed
 */


const GoogleAuthScreen: React.FC = () => {

  const { customTheme } = useContext(ThemeContext);
  const [serviceUnlocked, setServiceUnLocked] = useState<boolean>(false);


  const { authObject, setAuthObject, updateAuthObject } = useGoogleAuthObject();



  // strings
  const title:string = serviceUnlocked ? "Google services" : "Unlock Google services!"

  const googleAuthProcess = () => {
    //
  };
  const lockService = () => {};


  const handleGooglePress = () => {
    GoogleSignin.configure(
      {
        scopes: [
          "https://mail.google.com/",
        ],
        webClientId: GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
        iosClientId: GOOGLE_IOS_CLIENT_ID
      })
      signIn(updateAuthObject)
      .then(() => {
        console.log("USER SUCCESSFULLY SIGNED IN!");
      }
    )
  }


  const actionButton = useCallback(() => {
    if ( serviceUnlocked ) {
      return(
        <DefaultButton
          onPressAction={lockService}/>
      )
    }
    return(
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGooglePress}
      />
    )
  }, []);

  return(
    <>
      <UniversalServiceScreen
        serviceUnLocked={false}
        serviceName={title}
        setServiceUnLocked={setServiceUnLocked}
        unLockService={googleAuthProcess}
        lockService={lockService}
      />
      {
        actionButton()
      }
    </>
  );
}

export default memo(GoogleAuthScreen);
