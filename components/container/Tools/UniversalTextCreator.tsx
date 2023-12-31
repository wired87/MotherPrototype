import {toolStyles as ts} from "../../../screens/tools/toolStyles";
import {DefaultInput} from "../../input/DefaultInput";
import {IconButton, ProgressBar} from "react-native-paper";
import {KeyboardAvoidingView, TextInput, View} from "react-native";
import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useState} from "react";

const copy = "content-copy";
const download = "download";

import {memo} from "react";
import {PrimaryContext, ThemeContext, ToolContext} from "../../../screens/Context";
import * as Clipboard from "expo-clipboard";
import {DefaultText} from "../../text/DefaultText";
import {BottomImage} from "../../images/BottomImage";
import * as RNLocalize from "react-native-localize";
import * as Print from "expo-print";
import {sharePdf} from "../../../screens/ExpoFunctions";
import TextStream from "../../text/TextStream";
import {inputStyles} from "../../input/styles";

interface TextResultTypes {
  value: string;
  placeholder: string;
  editable: boolean;
  changeText: Dispatch<SetStateAction<string>>;
  heading: string;
  Content: React.ReactElement
}

const UniversalTextCreator: React.FC<TextResultTypes> = (
  {
    value,
    placeholder,
    editable,
    changeText,
    heading,
    Content,
  }
) => {
  const [ streamedHeading, setStreamedHeading ] = useState<string>("");
  const [ currentHeadingIndex, setCurrentHeadingIndex ] = useState<number>(0);

  // Context
  const { customTheme } = useContext(ThemeContext);
  const { loading } = useContext(PrimaryContext);
  const { setError } = useContext(ToolContext);


  // STYLES
  const copyButtonColor = customTheme.text;
  const moreTextStyles = [ts.heading];  //{/*unbedingt am anfange einmal streamen*/}
  const transcriptInputStyles = [
    ts.input, {
      backgroundColor: "transparent", borderColor: copyButtonColor, color: copyButtonColor
    }
  ];
  const loadingStyle = [
    ts.loadingStyle, {
      marginBottom: loading? 10 : 0
    }
  ];

  const backgroundColor = {
    backgroundColor: customTheme.primary
  };

  const mainContainerStyles =
    [
      ts.speechToTextMainContainer,
      backgroundColor
    ];

  useEffect(() => {
    if (currentHeadingIndex < heading.length) {
      const timer: NodeJS.Timeout = setTimeout(() => {
        setStreamedHeading(prevMessage => prevMessage + heading.charAt(currentHeadingIndex));
        setCurrentHeadingIndex((prevIndex: number) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentHeadingIndex, heading]);

  const handleCopyClick = useCallback(async () => {
    await Clipboard.setStringAsync(value);
  }, [value]);

  const getCurrentLanguage = () => {
    const languages = RNLocalize.getLocales();
    if (languages.length > 0) return languages[0].languageCode;
    return null;
  };





  const defaultTextColor = {color: customTheme.text};

  const handleDownloadClick = useCallback(async () => {
    try {
      const htmlContent = `<html><body><p>${value}</p></body></html>`;
      const { uri } = await Print.printToFileAsync({
        html: htmlContent
      });

      console.log('PDF erstellt: ', uri);
      await sharePdf(uri, setError)
    } catch (error) {
      console.error('Fehler beim Erstellen des PDFs: ', error);
    }
  }, [value]);
  const moreHeadingStreamInputStyles = [inputStyles.streamHeadingInput, defaultTextColor]
  return(
    <KeyboardAvoidingView style={mainContainerStyles}>

    <TextInput
      selectionColor={customTheme.errorText}
      style={moreHeadingStreamInputStyles}
      value={streamedHeading}
      editable={false}
      autoFocus
    />
      {Content}

      <ProgressBar progress={.5} color={customTheme.primaryButton} style={loadingStyle} indeterminate={true} visible={loading} />

      <View style={ts.transcriptContainer}>
        <DefaultInput
          numberOfLines={10}
          editable={editable}
          placeholder={placeholder}
          value={value}
          onChangeAction={changeText}
          extraStyles={transcriptInputStyles}
          multiline={true}
        />
        <IconButton size={20} iconColor={copyButtonColor} style={ts.copyButton} onPress={handleCopyClick} icon={copy}/>
      </View>
      <BottomImage />
    </KeyboardAvoidingView>
  );
}
export default memo(UniversalTextCreator);