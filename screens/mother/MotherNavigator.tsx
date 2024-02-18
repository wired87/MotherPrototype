import React, {memo, useMemo} from "react";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MotherMain} from "./MotherMain";
import MotherTools from "./MotherTools";
import HeaderButton from "../../components/buttons/navigation/HeaderButton";
import {motherMainStyles as mms} from "./styles";
import {useNavigation} from "@react-navigation/native";
import EmailAuthScreen from "./ToolScreens/EmailAuthScreen";
import {SpeechErrorEvent} from "@react-native-voice/voice";
import {useLoading, useMotherError} from "../../AppHooks/PrimaryHooks";

import {textToSpeech} from "../../AppFunctions/TTSFunctions";
import {useSound} from "../../AppHooks/AudioHooks";

const MotherStack = createNativeStackNavigator();

const MotherNavigator: React.FC = () => {
  // STATES
  const navigation = useNavigation();

  // HOOKS
  const {updateLoading} = useLoading();
  const { updateSound } = useSound();
  const { updateMotherError , setMotherError} = useMotherError();

  const errorHandling = () => {};

  const navigate = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  }

  const _onSpeechError = (e: SpeechErrorEvent) => {
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


  /*
  const useSstArgs: TranscriptHookPropsInterface = {route, onSpeechResults , onSpeechError};
  const {} = useStt(useSstArgs);
  */


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
  // STATES
  const { initVoice, updateInitVoice } = useInitVoice();
  const navigation = useNavigation();

  // HOOKS
  const {updateLoading} = useLoading();
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

  const _onSpeechError = (e: SpeechErrorEvent) => {
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

  const _onSpeechResults = (r:SpeechResultsEvent) => {
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
    updateInitVoice(false);
    startListening(updateInitVoice)
      .then(() => console.log("Start Listening again..."));
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


  useEffect(() => {
    startListening(updateInitVoice)
      .then(() => {
          console.log("Listening...");
        }
      )
      .catch(e => console.log("Coudl not listen cause the following error:", e))
  }, []);


  useEffect(() => {
    if (initVoice) {
      console.log("Voice Listener active...");
      Voice.onSpeechError = _onSpeechError;
      Voice.onSpeechResults = _onSpeechResults;
      Voice.onSpeechEnd = onSpeechEnd;

      return () => {
        Voice.destroy()
          .then(() => {
            Voice.removeAllListeners();
            console.log("Remove Listeners in useEffect...");
          })
      }
    }
  }, [initVoice]);

 */