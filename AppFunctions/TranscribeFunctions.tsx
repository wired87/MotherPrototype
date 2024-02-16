import Voice, {SpeechErrorEvent} from "@react-native-voice/voice";
import {getLanguage} from "./JwtFunctions";
import {Dispatch, SetStateAction} from "react";

export const startSpeech = async () => {
  const langauge:string = getLanguage();
  console.log("Recognized voice language:", langauge, "Start recording...");
  await Voice?.start(langauge, {
    RECOGNIZER_ENGINE: 'GOOGLE',
    EXTRA_PARTIAL_RESULTS: true,
  });
}

export const stopSpeech = async () => {
  await Voice.stop();
}
export const onSpeechEnd = () => {
  stopSpeech()
    .then(() => console.log("Voice stopped..."));
};

export const handleSpeechError = (
  e: SpeechErrorEvent,
  setError: Dispatch<SetStateAction<string>>
) => {
  if (e.error && e.error.message) {
    setError(e.error.message.toString());
  } else {
    setError("An error has occurred while trying to transcribe: " + e.toString());
  }
}