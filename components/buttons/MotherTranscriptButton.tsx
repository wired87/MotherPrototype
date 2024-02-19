import React, {useCallback, useContext, useEffect, useState} from "react";
import {Pressable, Vibration} from "react-native";
import Voice, {SpeechErrorEvent} from "@react-native-voice/voice";
import * as RNLocalize from 'react-native-localize';
import {styles as s} from "./styles";
import {PrimaryContext, ThemeContext} from "../../screens/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useRoute} from "@react-navigation/native";

// STRINGS
const defaultIcon:string = "microphone";

interface TranscribeButtonTypes {
  buttonIcon?: string;
  buttonStyles?: any;
  onSpeechResults: ((r: any) => void);
  onSpeechError: ((e: SpeechErrorEvent) => void);
}


export const MotherTranscriptButton: React.FC<TranscribeButtonTypes> = (

  {
    buttonIcon,
    buttonStyles,
    onSpeechResults,
    onSpeechError
  }

) => {

  const { customTheme } = useContext(ThemeContext);
  const [currentSpeech, setCurrentSpeech] = useState(false);
  const [languageTag, setLanguageTag] = useState('');
  const { jwtToken } = useContext(PrimaryContext);
  // styles
  const recordingButtonStyles = buttonStyles || [s.recordingButton, {borderColor: customTheme.text}];
  const route = useRoute();
  const iconColorProp = currentSpeech ? "red" : customTheme.text;

  useEffect(() => {
    // need to reset the Voice object because otherwise it will alltimes take the listener functions from last method
    Voice.destroy()
      .then(() => {
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
      })
    return () => {
      Voice.destroy()
        .then(() => Voice.removeAllListeners)
    }
  }, [onSpeechError, onSpeechResults, route.name]);


  useEffect(() => {
    const getDeviceLanguage = () => {
      const locales = RNLocalize.getLocales();
      if (locales.length > 0) {
        setLanguageTag(locales[0].languageTag);
      } else {
        setLanguageTag("en-US");
      }
    };
    getDeviceLanguage();
  }, []);

  const onSpeechEnd = () => {
    console.log("Stop talking...");
    setCurrentSpeech(false);
    stopSpeech()
      .then(() => console.log("Voice successfully stopped..."));
  };

  const startSpeech = async () => {
    console.log("Recognized voice language", languageTag);
    await Voice.start(languageTag);
  }

  const stopSpeech = async () => {
    await Voice.stop();
  }

  const handleSpeechToText = useCallback(() => {
    if (jwtToken){
      Vibration.vibrate();
      if (currentSpeech) {
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
    }else {
      console.log("No jwtToken at the current Time in TB...");
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
