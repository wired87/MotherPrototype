import { useEffect, useState} from "react";
import {Audio} from "expo-av";

import {useLoading, useMotherError} from "./PrimaryHooks";
import {textToSpeech} from "../AppFunctions/TTSFunctions";







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
  const {updateLoading} = useLoading();
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


