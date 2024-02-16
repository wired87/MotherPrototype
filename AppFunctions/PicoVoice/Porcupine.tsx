import {BuiltInKeywords, PorcupineManager} from "@picovoice/porcupine-react-native";
import {PORCUPINE_API_KEY} from "@env";
import {startSpeech} from "../TranscribeFunctions";

let porcupineManager: PorcupineManager | undefined = undefined;


export const startListening = async () => {
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

export const stopListening = async () => {
  if (porcupineManager) {
    await porcupineManager.stop();
    porcupineManager = undefined;
  }
};
