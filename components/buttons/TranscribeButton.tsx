import React, { memo, useCallback, useContext, useState} from "react";
import {Pressable, Vibration} from "react-native";
import {SpeechErrorEvent, SpeechResultsEvent} from "@react-native-voice/voice";
import {styles as s} from "./styles";
import {ThemeContext} from "../../screens/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useStt} from "../../AppHooks/AudioHooks";
import {TranscriptHookPropsInterface} from "../../AppInterfaces/HookInterfaces/AudioHookInterface";
import {startSpeech, stopSpeech} from "../../AppFunctions/TranscribeFunctions";
import {useRoute} from "@react-navigation/native";
import {TranscribeButtonTypes} from "../../AppInterfaces/components/buttons/ButtonInterfaces";

// STRINGS
const defaultIcon:string = "microphone";


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

  const route = useRoute();

  const onSpeechError = (e: SpeechErrorEvent) => {
    if (e.error && e.error.message) {
      setError(e.error.message.toString()); // case: none
    } else {
      setError("An error has occurred while trying to transcribe: " + e.toString());
    }
  }


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

  const useSstArgs: TranscriptHookPropsInterface = {route, onSpeechResults , onSpeechError}
  const{} = useStt(useSstArgs);

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