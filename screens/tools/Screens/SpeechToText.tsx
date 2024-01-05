import React, {memo, useCallback, useContext, useState} from "react";

import {
  ScrollView,
} from "react-native";
import * as FileSystem from "expo-file-system";

import {toolStyles as ts} from "../toolStyles";
import {ThemeContext} from "../../Context";
import * as RNLocalize from 'react-native-localize';
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

  const getCurrentLanguage = () => {
    const languages = RNLocalize.getLocales();
    if (languages.length > 0) return languages[0].languageCode;
    return null; // oder eine Standard-Sprache festlegen
  };

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


/*

import React, {memo, useCallback, useContext, useMemo, useState} from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  SectionList,
  StyleProp,
  Text,
  View,
  ViewStyle
} from "react-native";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {toolStyles as ts} from "../toolStyles";
import RecordingButton from "../../../components/buttons/RecordingButton";
import {PrimaryContext, ThemeContext, ToolContext} from "../../Context";
import * as RNLocalize from 'react-native-localize';
import {sharePdf} from "../../ExpoFunctions"
import * as Clipboard from 'expo-clipboard';
import * as Print from 'expo-print';
import {DefaultText} from "../../../components/text/DefaultText";
import {IconButton, ProgressBar} from "react-native-paper";
import {BottomImage} from "../../../components/images/BottomImage";

import InfiniteScrollList from "../../../components/flatlist/InfiniteScrollList";
import {settingStyles} from "../../settings/settingStyles";
import {PlusAdContainer} from "../../../components/container/PlusPlanContainer/PlusPlanContainer";
import RoundedButton from "../../../components/buttons/RoundedButton";
import TextResultContainer from "../../../components/container/Tools/TextResultContainer";

const windowWidth: number = Dimensions.get('window').width;

// Strings
const placeholderTranscript = "Your generated transcript will be shown here";
const download = "download";
const heading = "Transcribe your thoughts, Videos or Songs";

interface SpeechToTextTypes {

}

const SpeechToText: React.FC<SpeechToTextTypes> = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const { loading } = useContext(PrimaryContext);

  // Context
  const { customTheme } = useContext(ThemeContext);
  const { setError } = useContext(ToolContext);


  const getCurrentLanguage = () => {
    const languages = RNLocalize.getLocales();
    if (languages.length > 0) return languages[0].languageCode;
    return null; // oder eine Standard-Sprache festlegen
  };

  const handleDownloadClick = useCallback(async () => {
    try {
      const htmlContent = `<html><body><p>${transcript}</p></body></html>`;
      const { uri } = await Print.printToFileAsync({
        html: htmlContent
      });
      console.log('PDF erstellt: ', uri);
      await sharePdf(uri, setError)
    } catch (error) {
      console.error('Fehler beim Erstellen des PDFs: ', error);
    }
  }, [transcript]);

  const backgroundColor = {
    backgroundColor: customTheme.primary
  }
  const mainContainerStyles =
    [
      ts.speechToTextMainContainer,
      backgroundColor
    ];

  const moreTextStyles = [ts.heading];  //{/*unbedingt am anfange einmal streamen}




const loadingStyle = [
  ts.loadingStyle, {
    marginBottom: loading? 10 : 0
  }
]

return(
  <ScrollView style={backgroundColor} contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
    <KeyboardAvoidingView style={mainContainerStyles}>
      <DefaultText text={heading} moreStyles={moreTextStyles}/>

      <RecordingButton setTranscript={setTranscript} setEditable={setEditable}/>

      <ProgressBar progress={.5} color={customTheme.primaryButton} style={loadingStyle} indeterminate={true} visible={loading} />
      <TextResultContainer
        value={transcript}
        placeholder={placeholderTranscript}
        editable={editable}
        changeText={setTranscript}/>
      <BottomImage />

    </KeyboardAvoidingView>
  </ScrollView>
);
}

export default memo(SpeechToText);




  return(
    <ScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>

    <KeyboardAvoidingView style={mainContainerStyles}>
      <DefaultText text={heading} moreStyles={moreTextStyles}/>

      <InfiniteScrollList
        data={data}
      />

      <ProgressBar progress={.5} color={customTheme.primaryButton} style={loadingStyle} indeterminate={true} visible={loading} />

      <View style={ts.transcriptContainer}>

        <DefaultInput
          numberOfLines={10}
          editable={editable}
          placeholder={placeholderTranscript}
          value={transcript}
          onChangeAction={setTranscript}
          keyboardType={undefined}
          extraStyles={transcriptInputStyles}
          multiline={true}
        />

        <IconButton size={20} iconColor={copyButtonColor} style={ts.copyButton} onPress={hanldeCopyClick} icon={copy}/>
      </View>

      <BottomImage />

    </KeyboardAvoidingView>
    </ScrollView>


  );
 */

