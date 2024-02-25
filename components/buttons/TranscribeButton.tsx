import React, {memo, useCallback, useContext, useEffect} from "react";
import {Pressable, Vibration, PermissionsAndroid} from "react-native";
import Voice, {SpeechErrorEvent, SpeechResultsEvent} from "@react-native-voice/voice";
import {styles as s} from "./styles";
import {ThemeContext} from "../../screens/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {TranscribeButtonTypes} from "../../AppInterfaces/components/buttons/ButtonInterfaces";
import {startSpeech, stopSpeech} from "../../AppFunctions/TranscribeFunctions";
import {useCurrentSpeech} from "../../AppHooks/AudioHooks";

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
  const {currentSpeech, setCurrentSpeech, updateCurrentSpeech} = useCurrentSpeech();
  // styles
  const recordingButtonStyles = buttonStyles || [s.recordingButton, {borderColor: customTheme.text}];

  const iconColorProp = currentSpeech ? "red" : customTheme.text;

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.error("Error detected onSpeechError", e);
    if (e.error && e.error.message) {
      setError(e.error.message.toString()); // case: none
    } else {
      setError("An error has occurred while trying to transcribe: " + e.toString());
    }
  }

  useEffect(() => {
    console.log("TB Voice Listener active...");
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy()
        .then(() => {
          Voice.removeAllListeners();
          console.log("Remove Listeners in useEffect...");
        })
    }
  }, []);

  const onSpeechEnd = () => {
    updateCurrentSpeech(false);
    console.log("Stop talking...")
    stopSpeech()
      .then(() => console.log("Voice successfully stopped..."));
  };

  const onSpeechResults = (r: SpeechResultsEvent) => {
    console.log("onSpeechResult:", r.value?.[0]);
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



/*

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.error("Error detected onSpeechError", e);
    if (e.error && e.error.message) {
      setError(e.error.message.toString()); // case: none
    } else {
      setError("An error has occurred while trying to transcribe: " + e.toString());
    }
  }

  const onSpeechResults = (r: SpeechResultsEvent) => {
    console.log("onSpeechResult:", r.value?.[0]);
    if (r && r.value) {
      const newTranscript:string = transcript + " " + r.value[0] + " ";
      setTranscript? setTranscript(newTranscript) : null;
    }
  }
useEffect(() => {
    console.log("ROUTE NAME:", route.name);
    if (route.name === "MotherMain" || route.name === "MotherNavigator") {
      startListening()
        .then(() => {
            console.log("Start listening...");
          }
        )
    } else {
      stopListening()
        .then(() => {
            console.log("Route name changed Stop Listening...");
            Voice.removeAllListeners()
            console.log("Remove Listeners...");
          }
        )
    }
  }, [route.name]);
 */