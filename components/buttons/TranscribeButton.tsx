import React, {Dispatch, memo, SetStateAction, useCallback, useContext, useEffect, useState} from "react";
import {Pressable, Vibration} from "react-native";
import Voice, {SpeechErrorEvent, SpeechResultsEvent} from "@react-native-voice/voice";
import {styles as s} from "./styles";
import {ThemeContext} from "../../screens/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {getLanguage} from "../../AppFunctions/JwtFunctions";
import {useStt} from "../../AppHooks/AudioHooks";
import {TranscriptHookPropsInterface} from "../../AppInterfaces/HookInterfaces/AudioHookInterface";

// STRINGS
const defaultIcon:string = "microphone";
// Const
const transVoice = Voice;
interface TranscribeButtonTypes {
  setTranscript: Dispatch<SetStateAction<string>>; //((text:string) => void);//
  setError: Dispatch<SetStateAction<string>>;
  buttonIcon?: string;
  buttonStyles?: any;
  transcript: string;
}


const TranscribeButton: React.FC<TranscribeButtonTypes> = (
  {
    setTranscript,
    setError,
    buttonIcon,
    buttonStyles,
    transcript
  }
  ) => {

  const { customTheme } = useContext(ThemeContext);
  const [currentSpeech, setCurrentSpeech] = useState(false);


  // styles
  const recordingButtonStyles = buttonStyles || [s.recordingButton, {borderColor: customTheme.text}];

  const iconColorProp = currentSpeech ? "red" : customTheme.text;



  const onSpeechError = useCallback((e: SpeechErrorEvent) => {
    if (e.error && e.error.message) {
      setError(e.error.message.toString());
    } else {
      setError("An error has occurred while trying to transcribe: " + e.toString());
    }
  }, [setError]);


  const onSpeechResults = (r: SpeechResultsEvent) => {
    if (r && r.value) {
      const newTranscript:string = transcript + " " + r.value[0] + " ";
      setTranscript? setTranscript(newTranscript) : null;
    }
  }

  const handleSpeechToText = useCallback(() => {
    Vibration.vibrate();
    if (currentSpeech) {
      console.log("VOICE STOPPED IN DEFAULT ")
      stopSpeech()
        .then(() => {
          console.log("Voice recording ended..")
          }
        )
        .catch(e => console.log("Error while stop the recording occurred:", e));
      setCurrentSpeech(!currentSpeech);
    } else {
      startSpeech()
        .then(() => {
          console.log("Voice recording started..");
            setCurrentSpeech(!currentSpeech);
          }
        )
        .catch(e => console.log("Error while stop the recording occurred:", e));
      setCurrentSpeech(!currentSpeech);
    }
  }, [currentSpeech]);

  const onSpeechEnd = () => {};
  const useSstArgs: TranscriptHookPropsInterface = {onSpeechResults, onSpeechEnd , onSpeechError}
  const{stopSpeech, startSpeech} = useStt(useSstArgs);

  return(
    <Pressable style={recordingButtonStyles} onPress={handleSpeechToText}>
      <MaterialCommunityIcons
        color={iconColorProp}
        name={buttonIcon || defaultIcon}
        size={28}
      />
    </Pressable>
  );
}
export default memo(TranscribeButton);