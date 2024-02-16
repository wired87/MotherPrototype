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
import {MOTHER_URL, PORCUPINE_API_KEY} from "@env";
import {useLoading, useMotherError} from "../../AppHooks/PrimaryHooks";
import {BuiltInKeywords, PorcupineManager} from "@picovoice/porcupine-react-native";
import {stopListening} from "../../AppFunctions/PicoVoice/Porcupine";
import {getMotherRequestData} from "../../AppFunctions/GetObjectFunctions";
import {Vibration} from "react-native";
import {textToSpeech} from "../../AppFunctions/TTSFunctions";
import {useMotherResponse, useSound, useStt} from "../../AppHooks/AudioHooks";
import {startSpeech, stopSpeech} from "../../AppFunctions/TranscribeFunctions";
import {TranscriptHookPropsInterface} from "../../AppInterfaces/HookInterfaces/AudioHookInterface";


const MotherStack = createNativeStackNavigator();
let porcupineManager: PorcupineManager | undefined = undefined;

const MotherNavigator: React.FC = () => {
  // STATES
  const navigation = useNavigation()
  // HOOKS
  const {updateLoading, loading} = useLoading();
  const { updateSound } = useSound();
  const { updateMotherError } = useMotherError();
  const { setMotherResponse } = useMotherResponse();
  const {setMotherError} = useMotherError();
  // Context
  const {user, defaultPostRequest } = useContext(PrimaryContext);

  const errorHandling = () => {};

  const navigate = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  }
  const route = useRoute();

  const onSpeechError = useCallback((e: SpeechErrorEvent) => {
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
  }, []);

  const onSpeechEnd = () => {
    stopSpeech()
      .then(() => console.log("Voice stopped..."));
  };
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


  const startListening = async () => {
    try {
      if (!porcupineManager) {
        console.log("Creating new PorcupineManager instance")
        porcupineManager = await PorcupineManager.fromBuiltInKeywords(
          PORCUPINE_API_KEY,
          [BuiltInKeywords.JARVIS],
          (keyword:number) => {
            console.log("Detected Keyword!");
            startSpeech();
          },
          () => {}
        );
      }
      await porcupineManager?.start();
    }catch (e:unknown) {
      if (e instanceof Error) {
        console.error("Error while listening occurred", e);
      }
    }
  };


  // VOICE LISTENER LOGIC
  useEffect(() => {
    console.log("ROUTE NAME:", route.name);
    if (route.name === "MotherMain" || route.name === "MotherNavigator") {
      startListening()
        .then(() => {
            console.log("Start listening...");
          }
        )
    } else {
      stopListening()
        .then(() => {
            console.log("Route name changed Stop Listening...");
          }
        )
    }
  }, [route.name]);


  const useSttArgs:TranscriptHookPropsInterface = {onSpeechResults, onSpeechEnd, onSpeechError}
  const {} = useStt(useSttArgs);



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