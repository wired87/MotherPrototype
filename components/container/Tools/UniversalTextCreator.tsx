import {toolStyles as ts} from "../../../screens/tools/toolStyles";
import {DefaultInput} from "../../input/DefaultInput";
import {IconButton} from "react-native-paper";
import {KeyboardAvoidingView, View, StyleSheet} from "react-native";
import React, {Dispatch, SetStateAction, useCallback, useContext} from "react";

import {memo} from "react";
import {PrimaryContext, ThemeContext} from "../../../screens/Context";
import BottomImage from "../../images/BottomImage";
import CopyButton from "../../buttons/CopyButton";
import DefaultProgressBar from "../../animations/DefaultProgressBar";
import TextStream from "../../text/TextStream";
import {AnimationObject} from "lottie-react-native";
import {DefaultButton} from "../../buttons/DefaultButton";
import toolError from "../../../assets/animations/toolError.json";
import LottieContainer from "../LottieContainer";

// STRINGS
const clear:string = "close";
const reFreshIcon:string = "refresh";


interface TextResultTypes {
  placeholder: string;
  editable: boolean;
  heading: string;
  Content: React.ReactElement;
  source: string | AnimationObject | { uri: string; };
  response: string;
  setResponse: Dispatch<SetStateAction<string>>;
  sendData: (() => void);
  error: string;
}

const UniversalTextCreator: React.FC<TextResultTypes> = (

  {
    placeholder,
    editable,
    heading,
    Content,
    source,
    response,
    setResponse,
    sendData,
    error
  }

) => {

  // Context
  const { customTheme } = useContext(ThemeContext);
  const { loading } = useContext(PrimaryContext);

  // STYLES
  const buttonColor  = customTheme.text;

  const transcriptInputStyles = [
    ts.input, {
      backgroundColor: "transparent", borderWidth: 1, borderColor: buttonColor, color: buttonColor, minHeight: 200
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


  const handleClearField = useCallback(() => {
    setResponse("");
  }, [response])


  const resultContainer = useCallback(() => {
    if (response && response.length > 0) {
      return (
        <View style={ts.transcriptContainer}>
          <DefaultInput
            numberOfLines={10}
            editable={editable}
            placeholder={placeholder}
            value={response}
            onChangeAction={setResponse}
            extraStyles={transcriptInputStyles}
            multiline={true}
          />
          <IconButton size={20} iconColor={buttonColor} style={ts.clearButton} onPress={handleClearField} icon={clear}/>
          <CopyButton value={response}/>
        </View>
      );
    }else if (error && error.length > 0) {
      return(
        <LottieContainer
          source={toolError}
          text={error}
          extraChild={
            <IconButton iconColor={customTheme.primaryButton} icon={reFreshIcon} onPress={sendData} />
          }
        />
      );
    }else {
      return(
        <LottieContainer source={source} text={placeholder} />
      );
    }
  }, [response, error]);

  return(
    <KeyboardAvoidingView style={mainContainerStyles}>

    <TextStream message={heading}/>

      {Content}
      <DefaultButton onPressAction={sendData}/>
      <DefaultProgressBar loading={loading} />

      {resultContainer()}

      <BottomImage />
    </KeyboardAvoidingView>
  );
}

export default memo(UniversalTextCreator);

