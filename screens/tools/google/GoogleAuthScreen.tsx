import React, {memo, ReactNode, useCallback, useContext, useEffect, useRef} from "react";
import {PrimaryContext} from "../../Context";
import UniversalServiceScreen from "../UniversalServiceScreen";
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import {signIn} from "./AuthFunctions";
import {useGoogleAuthObject} from "../../../AppHooks/AuthHooks";
import {GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID} from "@env";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StatusModalContent from "../../../components/modals/modalContent/StatusModalContent";

import successLottie from "../../../assets/animations/successLottie.json"
import failLottie from "../../../assets/animations/failLottie.json"
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {ActivityIndicator} from "react-native";

const TITLE:string = "Google";

const GoogleAuthScreen: React.FC = () => {
  const { user, setLoading } = useContext(PrimaryContext);
  const { updateDeleteObject, updateAuthObject, deleteResponse, saveResponse, setGoogleService,setDeleteResponse, setSaveResponse } = useGoogleAuthObject();
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const updateBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(1);
      setDeleteResponse("");
      setSaveResponse("");
    }
  };

  const googleProcessConfig = () => {
    GoogleSignin.configure(
      {
        scopes: [
          "https://mail.google.com/",
        ],
        webClientId: GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
        iosClientId: GOOGLE_IOS_CLIENT_ID
      })
  };

  const handleGoogleSignIn = () => {
    googleProcessConfig();
    updateDeleteObject(false);
    try {
      signIn(updateAuthObject)
        .then(() => {
            console.log("USER SUCCESSFULLY SIGNED IN!");
          }
        )
    }catch {
      console.log("error occurred while try unlock Google services...")
    }finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    console.log("SignOut process started...");
    googleProcessConfig();
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      updateDeleteObject(true);
      console.log('Access Revoked. Delete Request Started...');
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };


  const handleConfirm = useCallback(() => {
    console.log("ConfirmButton clicked...");
    setLoading(true);
    if (user?.googleServices) {
      handleSignOut()
        .then(() => {
          console.log("User successful signed out...")
        })
    }else {
      handleGoogleSignIn();
    }
  }, [user, user?.googleServices]);

  const modalContent = useCallback((): ReactNode => {
    if (saveResponse.includes("saveSuccess")) {
      return <StatusModalContent lottieSource={successLottie} text={"Google service unlocked!"} />

    }else if ( saveResponse.includes("saveError")) {
      return <StatusModalContent lottieSource={failLottie} text={"Serverside Error occurred. Please try again."} />

    }else if(deleteResponse.includes("deleteSuccess")) {
      console.log("Google Account revoked and removed in Backend...");
      return <StatusModalContent lottieSource={successLottie} text={"Google service account removed!"} />

    }else if (deleteResponse.includes("deleteError")){
      console.log("Could not remove the user in backend...");
      return(
        <StatusModalContent
          lottieSource={failLottie}
          text={"Error on our Server. Please try again"}
        />
      )
    }
  }, [saveResponse, deleteResponse]);


  const actionButton = useCallback(() => {
    if ( user?.googleServices ) {
      return(
        <DefaultButton
          onPressAction={updateBottomSheet}
          text={"Lock Google services"}
          secondIcon={
            <MaterialCommunityIcons size={20} color={"white"} name={"lock"} />
          }
        />
      )
    } else if (!user?.googleServices) {
      return(
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={updateBottomSheet}
        />
      )
    }
    return <ActivityIndicator />

  }, [user]);

  return(
    <UniversalServiceScreen
      serviceUnLocked={user?.googleServices || false}
      serviceName={TITLE}
      actionButton={actionButton}
      children={undefined}
      confirmClick={handleConfirm}
      statusChildren={modalContent()}
      sheetRef={bottomSheetRef}
    />
  );
}

export default memo(GoogleAuthScreen);
