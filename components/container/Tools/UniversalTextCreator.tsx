import {toolStyles as ts} from "../../../screens/tools/toolStyles";
import {DefaultInput} from "../../input/DefaultInput";
import {IconButton, ProgressBar} from "react-native-paper";
import {KeyboardAvoidingView, Text, View} from "react-native";
import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useState} from "react";

const clear = "close";

import {memo} from "react";
import {PrimaryContext, ThemeContext} from "../../../screens/Context";
import {BottomImage} from "../../images/BottomImage";
import * as Print from "expo-print";
import {inputStyles} from "../../input/styles";
import CopyButton from "../../buttons/CopyButton";

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

  // STYLES
  const buttonColor  = customTheme.text;

  const transcriptInputStyles = [
    ts.input, {
      backgroundColor: "transparent", borderColor: buttonColor, color: buttonColor
    }
  ];
  const loadingStyle = [
    ts.loadingStyle, {
      marginVertical: loading? 10 : 0
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



  const handleClearField = useCallback(() => {
    changeText("");
  }, [value])

  const defaultTextColor = {color: customTheme.text};

  const handleDownloadClick = useCallback(async () => {
    try {
      const htmlContent = `<html><body><p>${value}</p></body></html>`;
      const { uri } = await Print.printToFileAsync({
        html: htmlContent
      });

      console.log('PDF erstellt: ', uri);
      //await sharePdf(uri, setError)
    } catch (error) {
      console.error('Fehler beim Erstellen des PDFs: ', error);
    }
  }, [value]);

  const moreHeadingStreamInputStyles = [inputStyles.streamHeadingInput, defaultTextColor]
  return(
    <KeyboardAvoidingView style={mainContainerStyles}>

    <Text
      style={moreHeadingStreamInputStyles}>
      {streamedHeading}
    </Text>
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

        <IconButton size={20} iconColor={buttonColor} style={ts.clearButton} onPress={handleClearField} icon={clear} />
        <CopyButton value={value} />

      </View>
      <BottomImage />
    </KeyboardAvoidingView>
  );
}

export default memo(UniversalTextCreator);