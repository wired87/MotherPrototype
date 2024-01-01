import React, {memo, useContext, useEffect, useMemo, useRef, useState} from "react";
import {ResumeContext, ThemeContext} from "../../../Context";

import {ScrollView} from "react-native";
import {toolStyles as ts} from "../../toolStyles";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import ResumeContent from "./Content";
import {SwipeModal} from "../../../../components/modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import LottieView from "lottie-react-native";
import failLottie from "../../../../assets/animations/failLottie.json"
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {DefaultText} from "../../../../components/text/DefaultText";
import * as Linking from 'expo-linking';
import {DefaultButton} from "../../../../components/buttons/DefaultButton";
import {useNavigation} from "@react-navigation/native";

// STRINGS
const errorUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=codingWizardaix@gmail.com&su=Error-while-Application-Process-detected&body=Hey,"

const heading = "AI Job Application creator"
const placeholderResume = "Your written Application will be shown here.."

const ResumeCreator = () => {
  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [resume, setResume] = useState<string>("");
  // Context
  const { customTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  // STYLES
  const backgroundColor = {backgroundColor: customTheme.primary};

  const Content = useMemo(() => {
    return <ResumeContent
              setError={setError}
              setResume={setResume}
    />
  }, [])

  const updateModalIndex = () => {
    bottomSheetRef?.current?.snapToIndex(2);
  }

  useEffect(() => {
    if (error) {
      updateModalIndex()
    }
  }, [error]);


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
  }, [])


  const errorContent = useMemo(() => {
    if (error) {
      return(
        <BottomSheetView style={ts.modalToolErrorContainer}>

          <DefaultText moreStyles={ts.errorTextHeading} text={"This is an Error!"}/>
          <DefaultText moreStyles={ts.errorTextMessage} text={`Feel free to report it.\nWe will fix it ASAP`}/>

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
  }, [error])

  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        value={resume}
        placeholder={placeholderResume}
        editable={editable}
        changeText={setResume}
        heading={heading}
        Content={Content}
      />
      <SwipeModal
        bottomSheetRef={bottomSheetRef}
        Content={errorContent}
      />
    </ScrollView>
  );
}

export default memo(ResumeCreator);