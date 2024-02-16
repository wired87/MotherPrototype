import {useEffect, useState} from "react";
import {Audio} from "expo-av";

import {useLoading, useMotherError} from "./PrimaryHooks";
import {textToSpeech} from "../AppFunctions/TTSFunctions";
import Voice from "@react-native-voice/voice";
import {TranscriptHookPropsInterface} from "../AppInterfaces/HookInterfaces/AudioHookInterface";
import {getLanguage} from "../AppFunctions/JwtFunctions";

export function useSound() {
  const [sound, setSound] = useState<Audio.Sound | null>();

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const updateSound = (sound: Audio.Sound) => {
    setSound(sound);
  }

  return { sound, updateSound };
}

export const useStt = (
  {
    onSpeechResults,
    onSpeechEnd,
    onSpeechError
  }:TranscriptHookPropsInterface
) => {

  const [transcript, setTranscript] = useState<string | null>(null);

  const updateTranscript = (text:string) => setTranscript(text);

  const startSpeech = async () => {
    const langauge:string = getLanguage();
    console.log("Recognized voice language:", langauge, "Start recording...");
    await Voice.start(langauge);
  }

  const stopSpeech = async () => {
    await Voice.stop();
  }

  useEffect(() => {
    if (Voice) {
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechEnd = onSpeechEnd;

      return () => {
        Voice.destroy()
          .then(() => Voice.removeAllListeners)
      }
    }
  }, []);

  return {
    transcript, updateTranscript,
    startSpeech, stopSpeech
  }
}


export function useMotherResponse() {
  const [motherResponse, setMotherResponse] = useState<string>("");

  const { updateSound } = useSound();
  const { updateLoading } = useLoading();
  const { updateMotherError } = useMotherError();

  async function playSound(item: string) {
    console.log('Loading Sound...');
    if (item) {
      const { sound } = await Audio.Sound.createAsync({uri: item});
      updateSound(sound);
      console.log('Playing Sound...');
      await sound.playAsync();
    }
  }

  const errorHandling = ():void => {};


  useEffect(() => {
    if ( motherResponse.length > 0 ) {
      console.log("Response.length > 0:", motherResponse);
      textToSpeech(
        motherResponse,
        errorHandling,
        updateMotherError,
        updateLoading,
        updateSound
      )
        .then(() => {
          console.log("tts finished...")
        })
    }
  }, [motherResponse]);

  const updateMotherResponse = (text:string) => {
    setMotherResponse(text);
  }

  return { motherResponse, setMotherResponse, updateMotherResponse };
}






/*
export const useTts = () => {
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


  const onSpeechEnd = () => {
    stopSpeech()
      .then(() => console.log("Voice stopped..."));
  };

  return {

  }
}

 */