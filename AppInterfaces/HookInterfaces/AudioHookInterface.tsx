import {SpeechErrorEvent, SpeechResultsEvent} from "@react-native-voice/voice";


export interface TranscriptHookPropsInterface {
  onSpeechResults: (r: SpeechResultsEvent) => void;
  onSpeechEnd: () => void;
  onSpeechError: (e: SpeechErrorEvent) => void;
}