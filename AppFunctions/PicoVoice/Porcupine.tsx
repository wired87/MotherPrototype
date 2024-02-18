import {BuiltInKeywords, PorcupineManager} from "@picovoice/porcupine-react-native";
import {PORCUPINE_API_KEY} from "@env";

let porcupineManager: PorcupineManager | undefined = undefined;

const startRecordingProcess = (
  updateInitVoice?: (value:boolean) => void
) => {
  stopListening()
    .then(() => {
      if (updateInitVoice) {
        updateInitVoice(true);
      }
  })
};

export const startListening = async (
  updateInitVoice?: (value:boolean) => void
) => {
  console.log("Start Listening Function called...");
  try {
    if (!porcupineManager) {
      console.log("Create new PorcupineManager instance")
      porcupineManager = await PorcupineManager.fromBuiltInKeywords(
        PORCUPINE_API_KEY,
        [BuiltInKeywords.JARVIS],
        (keyword:number) => {
          console.log("Detected Keyword!");
          startRecordingProcess(updateInitVoice)
        },
        () => errorListening()
      );
    }
    await porcupineManager.start();
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

const errorListening = () => {
  console.log("Error occurred while listening...")
}
