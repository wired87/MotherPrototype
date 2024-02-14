import React, {memo, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {PrimaryContext, ToolContext} from "../Context";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MotherMain} from "./MotherMain";
import MotherTools from "./MotherTools";
import HeaderButton from "../../components/buttons/navigation/HeaderButton";
import {motherMainStyles as mms} from "./styles";
import {useNavigation, useRoute} from "@react-navigation/native";
import EmailAuthScreen from "./ToolScreens/EmailAuthScreen";
import {startSpeech, stopSpeech} from "../../AppFunctions/TranscribeFunctions";
import Voice, {SpeechErrorEvent} from "@react-native-voice/voice";
import {MOTHER_URL, PORCUPINE_API_KEY} from "@env";
import {useLoading, useMotherError} from "../../AppHooks/PrimaryHooks";
import {BuiltInKeywords, PorcupineManager} from "@picovoice/porcupine-react-native";
import {stopListening} from "../../AppFunctions/PicoVoice/Porcupine";
import {getMotherRequestData} from "../../AppFunctions/GetObjectFunctions";
import {Vibration} from "react-native";
import {textToSpeech} from "../../AppFunctions/TTSFunctions";
import {useMotherResponse, useSound} from "../../AppHooks/AudioHooks";

// VARIABLES
const MotherStack = createNativeStackNavigator();
let porcupineManager: PorcupineManager | undefined = undefined;

const MotherNavigator: React.FC = () => {
  // STATES
  const navigation = useNavigation()
  const [listening, setListening] = useState<boolean>(false);
  // HOOKS
  const {updateLoading} = useLoading();
  const { updateSound } = useSound();
  const { updateMotherError } = useMotherError();
  const { updateMotherResponse, setMotherResponse } = useMotherResponse();
  const {setMotherError} = useMotherError();
  // Context
  const {user, defaultPostRequest } = useContext(PrimaryContext);

  const errorHandling = () => {};

  const navigate = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  }
  const route = useRoute();

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy()
        .then(() => Voice.removeAllListeners)
    }
  }, []);

  const onSpeechError = useCallback((e: SpeechErrorEvent) => {
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
    const timeOutMs:number = 2000;
    setTimeout(() => {
      console.log("Stop timer started...")
      stopSpeech(Voice)
        .then(() => console.log("Voice stopped..."));
    }, timeOutMs);
  }

  const sendData = useCallback(async (newTranscript: string) => {
    updateLoading();
    await defaultPostRequest(
      MOTHER_URL,
      getMotherRequestData(newTranscript, user?.uid),
      setMotherError,
      setMotherResponse,
    )
  }, [setMotherError, setMotherResponse]);


  const onSpeechResults = (r: any) => {
    console.log("Speech Result created. Begin sending Process...");
    const newTranscript:string = r.value[0];
    if ( newTranscript.length > 0 ) {
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