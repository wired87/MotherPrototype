import {useEffect, useState} from "react";
import {Audio} from "expo-av";
import {expoSpeak} from "../AppFunctions/TTSFunctions";


// let porcupineManager: PorcupineManager | undefined = undefined;

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





export function useMotherResponse() {
  const [motherResponse, setMotherResponse] = useState<string>("");

  const { updateSound } = useSound();

  async function playSound(item: string) {
    console.log('Loading Sound...');
    if (item) {
      const { sound } = await Audio.Sound.createAsync({uri: item});
      updateSound(sound);
      console.log('Playing Sound...');
      await sound.playAsync();
    }
  }


  const updateMotherResponse = (text:string) => {
    setMotherResponse(text);
  }


  useEffect(() => {
    if ( motherResponse.length > 0 ) {
      console.log("Response.length > 0:", motherResponse);
      expoSpeak(motherResponse, updateMotherResponse);
    }
  }, [motherResponse]);

  return { motherResponse, setMotherResponse, updateMotherResponse };
}


export const useCurrentSpeech = () => {
  const [currentSpeech, setCurrentSpeech] = useState<boolean>(false);

  const updateCurrentSpeech = (value:boolean) => setCurrentSpeech(value)

  return {
    currentSpeech, setCurrentSpeech, updateCurrentSpeech
  }
}



/*
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