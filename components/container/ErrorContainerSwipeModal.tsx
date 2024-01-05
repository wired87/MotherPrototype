import React, {memo, useContext, useMemo} from "react";
import {toolStyles as ts} from "../../screens/tools/toolStyles";
import {DefaultText} from "../text/DefaultText";
import LottieView from "lottie-react-native";
import failLottie from "../../assets/animations/failLottie.json";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {DefaultButton} from "../buttons/DefaultButton";
import {ThemeContext} from "../../screens/Context";
import * as Linking from "expo-linking";

// STRINGS
const errorUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=codingWizardaix@gmail.com&su=Error-while-Application-Process-detected&body=Hey,"

interface ErrorContainerTypes {
  error?: any
}

const ErrorContainerSwipeModal: React.FC<ErrorContainerTypes> = (
  {
    error
  }
) => {
  // CONTEXT
  const { customTheme } = useContext(ThemeContext);

  const errorMessage = useMemo(() => {
    if (error) {
      return(
        <>
          <DefaultText moreStyles={ts.errorTextHeading} text={"This is an Error!"}/>
          <DefaultText moreStyles={ts.errorTextMessage} text={`Feel free to report it.\nWe will fix it ASAP`}/>
        </>
      );
    } else {
      return(
        <>
          <DefaultText moreStyles={ts.errorTextHeading} text={error.message}/>
          <DefaultText moreStyles={ts.errorTextMessage} text={`Feel free to report it.\nWe will fix it ASAP`}/>
        </>
      );
    }
  }, [])

  const emailLinkingButton = useMemo(() => {
    return(
      <>
        <DefaultButton
          extraStyles={[ts.errorLinkingButton,
            {backgroundColor: customTheme.primary}
          ]}
          onPressAction={() => Linking.openURL(errorUrl)}
          text={"Report it here"}
          secondIcon={undefined}
        />
        <DefaultText moreStyles={ts.mV} text={"or"}/>
        <DefaultButton
          extraStyles={[ts.contactLinkingButton,
            {backgroundColor: customTheme.primary
            } ]}
          // @ts-ignore
          onPressAction={() => navigation.navigate("Settings", {screen: "SettingsMain"})}
          text={"Contact Form"}
          secondIcon={undefined}
        />
      </>
    );
  }, [customTheme])

  return(
    <BottomSheetView style={ts.modalToolErrorContainer}>

      {errorMessage}

      <LottieView
        style={ts.errorLottieView}
        source={failLottie}
        loop={false}
        autoPlay={true}
        resizeMode={"contain"}
      />

      {emailLinkingButton}

    </BottomSheetView>
  );
}

export default memo(ErrorContainerSwipeModal);