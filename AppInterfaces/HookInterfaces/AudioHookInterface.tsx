import {SpeechErrorEvent, SpeechResultsEvent} from "@react-native-voice/voice";
import {RouteProp} from "@react-navigation/native";


export interface TranscriptHookPropsInterface {
  route: any;
  onSpeechResults: (r: SpeechResultsEvent) => void;
  onSpeechError: (e: SpeechErrorEvent) => void;
}