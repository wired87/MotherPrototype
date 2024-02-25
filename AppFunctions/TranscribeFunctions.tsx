import Voice from "@react-native-voice/voice";
import {getLanguage} from "./JwtFunctions";

export const startSpeech = async () => {
  const langauge:string = getLanguage();
  console.log("Recognized voice language:", langauge, "Start recording...");
  await Voice.start(langauge, {
    RECOGNIZER_ENGINE: 'GOOGLE',
    EXTRA_PARTIAL_RESULTS: true,
  });
}

export const stopSpeech = async () => {
  console.log("Stop recording...");
  await Voice.stop();
}

export const onSpeechEnd = () => {
  console.log("Stop talking...")
  stopSpeech()
    .then(() => console.log("Voice successfully stopped..."));
};

