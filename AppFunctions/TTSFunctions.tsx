import {LOVO_API_KEY} from "@env";
import {getLovoObject} from "./GetObjectFunctions";
import {Audio} from "expo-av";

const lovoErrorCodes = [
  400,
  401,
  402,
  422
];

export const playSound = async (
  item: string,
  updateSound: (sound: Audio.Sound) => void
): Promise<void> => {
  console.log('Loading Sound...');
  if (item) {
    const { sound }: { sound: Audio.Sound } = await Audio.Sound.createAsync({ uri: item });
    updateSound(sound);

    console.log('Playing Sound...');
    await sound.playAsync();
  }
};




export const textToSpeech = async (
  text: string,
  errorHandling: () => void,
  updateMotherError: (text:string) => void,
  updateLoading: () => void,
  updateSound: (sound: Audio.Sound) => void
) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': LOVO_API_KEY
    },
    body: JSON.stringify(getLovoObject(text))
  };
  try {
    const speechResponse = await fetch('https://api.genny.lovo.ai/api/v1/tts/sync', options);
    const jsonResponse = await speechResponse.json();
    console.log("JSONRESPONSE LOVO:", jsonResponse);
    if (lovoErrorCodes.includes(jsonResponse.statusCode)) {
      errorHandling();
    } else if(jsonResponse && jsonResponse.data[0] && jsonResponse.data[0].urls) {
      await playSound(
        jsonResponse.data[0].urls[0],
        updateSound
      );
    }else {
      console.log("Something unexpected happened...");
      updateMotherError("Unexpected Error. Please try again...")
    }
  }catch(e:unknown) {
    if( e instanceof Error ) {
      console.log("Error occurred:", e);
      updateMotherError(e.toString());
    }
  }finally{
    updateLoading();
  }
}