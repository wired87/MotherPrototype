import React, {Dispatch, SetStateAction, useCallback, useContext, useState} from "react";
import {IconButton} from "react-native-paper";
import {styles as s} from "./styles"
import {PrimaryContext, ThemeContext, ToolContext} from "../../screens/Context";
import {startRecording, stopRecordingProcess} from "../../screens/chat/functions/recordingLogic";
import * as FileSystem from "expo-file-system";
import getDurationFormatted, {getCurrentTime} from "../../screens/chat/functions/SendProcess";
import { Vibration} from "react-native";
import {Recording} from "expo-av/build/Audio/Recording";
import {showToolAds} from "../../screens/chat/functions/AdLogic";
import * as RNLocalize from "react-native-localize";


interface ExtraData {
  timeToken: string;
  publisher: string;
  class: string;
  file_id: string;
  user_id: string;
  soundAudio: any; // oder ersetzen Sie `any` durch den passenden Typ, falls bekannt
  duration: string;
}

// STRINGS
const transcriptApiEndpoint: string = "http://wired87.pythonanywhere.com/open/get-speech-to-text/";

interface RecordingButtonTTSProps {
  setTranscript: Dispatch<SetStateAction<string>>;
  setEditable: Dispatch<SetStateAction<boolean>>;
}


const getCurrentLanguage = () => {
  const languages = RNLocalize.getLocales();
  if (languages.length > 0) return languages[0].languageCode;
  return null; // oder eine Standard-Sprache festlegen
};


const RecordingButtonTTS: React.FC<RecordingButtonTTSProps> = (
  {
    setTranscript,
    setEditable,


  }
) => {
  const  [userRecording, setUserRecording] = useState<null | Recording>(null);
  const [currentRecording, setCurrentRecording] = useState<boolean>(false);
  const [adLoaded, setAdLoaded] = useState<boolean>(false);
  const [audio, setAudio] = useState<object | null>(null);

  const { customTheme } = useContext(ThemeContext);
  const [error, setError] = useState<string>("");
  const { setLoading, user } = useContext(PrimaryContext);


  // styles
  const recordingButtonStyles = [s.redordingButton, {borderColor: customTheme.text}];

  const iconColorProp = useCallback(() => {
    return currentRecording ? "red" : customTheme.text
  }, [currentRecording])


  const createFileData = useCallback(async(uri: string | null | undefined) => {
    try {
      if (typeof uri === "string") {
        const fileInfo: FileSystem.FileInfo | null = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) throw new Error("Audio file does not exist");
      }

      const user_id= user?.uid || "1";
      const fileName = `recording-${Date.now()}.m4a`;
      console.log("fileName:", fileName);

      if (userRecording) {
        const {sound, status} = await userRecording.createNewLoadedSoundAsync();
        return {
          "timeToken": getCurrentTime().toString(),
          "publisher": "USER",
          "class": "voiceMessage",
          "file_id": fileName,
          "user_id": user_id,
          "soundAudio": sound || null,
          "duration": getDurationFormatted(status.isLoaded ? status.durationMillis : null),
        }
      }
    }catch(e: unknown) {
      if (e instanceof Error) {
        console.log("Error in createFileData occurred", e)
      }
    }
    return null
  }, [user, userRecording])






  const postRecording = useCallback(async( extraData: ExtraData | null, uri: string | null | undefined ) => {
    const {soundAudio, ...extraDataWithoutSound} = extraData as ExtraData ;
    console.log("extraData:", extraData)
    const currentTime = getCurrentTime()
    console.log("current Time:", currentTime);
    try {
      await showToolAds();
      return await FileSystem.uploadAsync(
        transcriptApiEndpoint,
        uri || "",
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          httpMethod: 'POST',
          mimeType: 'audio/m4a',
          parameters: extraDataWithoutSound,
          sessionType: undefined,
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "file",
        }
      )
    }catch(e:unknown) {
      if (e instanceof Error) {
        console.log("Error wile sending a message occurred", e);
      }
    }
    return null
  }, []);


  const recordEndProcess = useCallback(async() => {
    setCurrentRecording(false);
    setLoading(true);
    try {
      const fileUri: string | null | undefined = await stopRecordingProcess(userRecording);
      const fileObject: ExtraData | null = await createFileData(fileUri);
      setAudio(fileObject);
      setUserRecording(null);
      const response = await postRecording(fileObject, fileUri);
      console.log("TRANSCRIPT RESPONSE", response);
      if (response) {
        const text = JSON.parse(response.body).response;
        console.log("RESPONSE TEXT", text)
        setTranscript((prevTranscript: string) => prevTranscript + text + " ");
        setEditable(true);
      }else {
        setError("Could not Analyze the Audio File. maybe the size was to big? " +
          "Please try again or contact the Support.");
      }
    }catch(e:unknown) {
      if (e instanceof Error) {
        console.log("Error in recordEndProcess occurred:", e);
        setError(e.message);
      }
    }finally {
      setLoading(false);
    }
  }, [userRecording]);

  const handlePress = useCallback(async() => {
    Vibration.vibrate();
    if(userRecording) {
      setCurrentRecording(false);
      console.log('Stop recording..');
      await recordEndProcess()
    } else if(!userRecording) {
      if (currentRecording){
        setCurrentRecording(false);
        setUserRecording(null);
      }
      console.log("userRecording:", userRecording);
      setCurrentRecording(true);
      await startRecording({ setUserRecording });
    }
  }, [userRecording, currentRecording]);


  return(
    <IconButton icon={"microphone"} iconColor={iconColorProp()} style={recordingButtonStyles} onPress={handlePress} />
  );
}

export default RecordingButtonTTS;