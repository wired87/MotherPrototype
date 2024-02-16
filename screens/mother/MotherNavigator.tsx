import React, {memo, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {PrimaryContext} from "../Context";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MotherMain} from "./MotherMain";
import MotherTools from "./MotherTools";
import HeaderButton from "../../components/buttons/navigation/HeaderButton";
import {motherMainStyles as mms} from "./styles";
import {useNavigation, useRoute} from "@react-navigation/native";
import EmailAuthScreen from "./ToolScreens/EmailAuthScreen";
import {SpeechErrorEvent, SpeechResultsEvent} from "@react-native-voice/voice";
import {MOTHER_URL} from "@env";
import {useLoading, useMotherError} from "../../AppHooks/PrimaryHooks";
import {getMotherRequestData} from "../../AppFunctions/GetObjectFunctions";
import {Vibration} from "react-native";
import {textToSpeech} from "../../AppFunctions/TTSFunctions";
import {useMotherResponse, useSound, useStt} from "../../AppHooks/AudioHooks";
import {TranscriptHookPropsInterface} from "../../AppInterfaces/HookInterfaces/AudioHookInterface";


const MotherStack = createNativeStackNavigator();

const MotherNavigator: React.FC = () => {
  // STATES
  const navigation = useNavigation()
  // HOOKS
  const {updateLoading, loading} = useLoading();
  const { updateSound } = useSound();
  const { updateMotherError , setMotherError} = useMotherError();
  const { setMotherResponse } = useMotherResponse();

  // Context
  const {user, defaultPostRequest } = useContext(PrimaryContext);

  const errorHandling = () => {};

  const navigate = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  }
  const route = useRoute();

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.error("Error occurred while handling the speech:", e);
    textToSpeech(
      "Sorry, i couldn't hear anything. Please repeat it a bit louder. Im not the youngest",
      errorHandling,
      updateMotherError,
      updateLoading,
      updateSound,
      )
      .then(() => {
        console.log("ErrorMessage Sent")
      })
  }


  const onSpeechResults = (r:SpeechResultsEvent) => {
    console.log("Speech Result created. Begin sending Process...");
    const newTranscript:string | undefined = r?.value?.[0];
    if ( newTranscript && newTranscript.length > 0 ) {
      updateLoading();
      console.log("Send the transcript...")
      sendData(newTranscript)
        .then(() => {
            console.log("Talk Data sent...");
          }
        )
    }else {
      Vibration.vibrate();
      console.log("Transcript Length === 0...")
      setMotherError("Couldn't transcribe anything...");
    }
  }

  const sendData = useCallback(async (newTranscript: string) => {
    try{
      await defaultPostRequest(
        MOTHER_URL,
        getMotherRequestData(newTranscript, user?.uid),
        setMotherError,
        setMotherResponse,
      )
    }catch(e:unknown) {
      if(e instanceof Error) {
        console.log("Could not send the Mother Request cause the following error:", e);
      }
    }finally {
      updateLoading();
    }
  }, [setMotherError, setMotherResponse]);



  const useSttArgs:TranscriptHookPropsInterface = {route, onSpeechResults, onSpeechError}
  const {transcript, updateTranscript} = useStt(useSttArgs);



  const screenHeaderOptions = useMemo(() => ({
    header:
      () =>
        <DefaultHeader
          childrenRight={
            <HeaderButton
              action={
                () => navigate("MotherTools")
              }
              icon={"align-horizontal-right"}
              eS={mms.marginVertical10}
            />
          }
        />
  }), []);

  return(
    <MotherStack.Navigator
      initialRouteName="MotherMain"
      screenOptions={screenHeaderOptions}>

      <MotherStack.Screen
        name="MotherMain"
        component={MotherMain}
      />

      <MotherStack.Screen
        name="MotherTools"
        component={MotherTools}
      />

      <MotherStack.Screen
        name="EmailAuthScreen"
        component={EmailAuthScreen}
      />

    </MotherStack.Navigator>
  )
}
export default memo(MotherNavigator);



/*
  // GOOGLE MOBILE AD LOGIC ////////////////////
  useEffect(() => {
    console.log("Real toolActionValue:", toolActionValue)
    showToolAds(toolActionValue, setToolActionValue)
      .then(() => console.log("Ads successfully showed. Refilled the Messages"));
  }, [toolActionValue]);


 */