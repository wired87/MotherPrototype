import React, {memo, useCallback, useContext, useState} from "react";

import {
  ScrollView,
} from "react-native";
import * as FileSystem from "expo-file-system";

import {toolStyles as ts} from "../toolStyles";
import {ThemeContext} from "../../Context";
import * as Print from 'expo-print';
import UniversalTextCreator from "../../../components/container/Tools/UniversalTextCreator";
import TranscribeButton from "../../../components/buttons/TranscribeButton";



// Strings
const placeholderTranscript: string = "Your generated transcript will be shown here";

const heading: string = "Transcribe your thoughts..";

const SpeechToText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);

  const backgroundColor = {backgroundColor: customTheme.primary};



  const updateTranscript = useCallback((response: FileSystem.FileSystemUploadResult) => {
    const text = JSON.parse(response.body).response;
    console.log("RESPONSE TEXT", text);
    setTranscript((prevTranscript: string) => prevTranscript + text + " ");
    setEditable(true);
  }, [transcript, editable])

  const handleDownloadClick = useCallback(async () => {
    try {
      const htmlContent = `<html><body><p>${transcript}</p></body></html>`;
      const { uri } = await Print.printToFileAsync({
        html: htmlContent
      });
      console.log('PDF erstellt: ', uri);
      // await sharePdf(uri, setError)
    } catch (error) {
      console.error('Fehler beim Erstellen des PDFs: ', error);
    }
  }, [transcript]);


  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        value={transcript}
        placeholder={placeholderTranscript}
        editable={editable}
        changeText={setTranscript}
        heading={heading}
        Content={
          <TranscribeButton
            setTranscript={setTranscript}
            setEditable={setEditable}
            setError={setError}
            transcript={transcript}
          />
        }
      />
    </ScrollView>
  );
}

export default memo(SpeechToText);
