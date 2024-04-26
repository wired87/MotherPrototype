import React, {memo, ReactNode, useCallback, useContext, useRef} from "react";
import {PrimaryContext} from "../screens/Context";
import UniversalServiceScreen from "../screens/tools/UniversalServiceScreen";
import {
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {DefaultButton} from "../components/buttons/DefaultButton";
import {useGoogleAuthObject} from "../AppHooks/AuthHooks";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StatusModalContent from "../components/modals/modalContent/StatusModalContent";

import successLottie from "../assets/animations/successLottie.json"
import failLottie from "../assets/animations/failLottie.json"
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {ActivityIndicator} from "react-native";

const TITLE:string = "Google";

const GoogleAuthScreen: React.FC = () => {
  const { user } = useContext(PrimaryContext);
  const { deleteResponse, saveResponse,
    setDeleteResponse, setSaveResponse } = useGoogleAuthObject();
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const updateBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(1);
      setDeleteResponse("");
      setSaveResponse("");
    }
  };


  const modalContent = useCallback((): ReactNode => {
    if (saveResponse.includes("saveSuccess")) {
      return <StatusModalContent lottieSource={successLottie} text={"Google service unlocked!"} />

    }else if ( saveResponse.includes("saveError")) {
      return <StatusModalContent lottieSource={failLottie} text={"Serverside Error occurred. Please try again."} />

    }else if (deleteResponse.includes("deleteSuccess")) {
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
      confirmClick={() => {}}
      statusChildren={modalContent()}
      sheetRef={bottomSheetRef}
    />
  );
}

export default memo(GoogleAuthScreen);
