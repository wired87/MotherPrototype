import {toolStyles as ts} from "../../../screens/tools/toolStyles";
import {DefaultInput} from "../../input/DefaultInput";
import {IconButton} from "react-native-paper";
import {KeyboardAvoidingView, View, ActivityIndicator} from "react-native";
import React, {Dispatch, SetStateAction, useCallback, useContext, useState} from "react";

import {memo} from "react";
import {PrimaryContext, ThemeContext} from "../../../screens/Context";
import BottomImage from "../../images/BottomImage";
import CopyButton from "../../buttons/CopyButton";
import TextStream from "../../text/TextStream";
import {AnimationObject} from "lottie-react-native";
import {DefaultButton} from "../../buttons/DefaultButton";
import toolError from "../../../assets/animations/toolError.json";
import LottieContainer from "../LottieContainer";
import {DefaultText} from "../../text/DefaultText";
import {defaultLottie} from "../../../screens/tools/Functions";
import ToolIndicator from "../../indicators/ToolIndIcator";
import {StyleSheet} from "react-native";

// STRINGS
const clear:string = "close";
const reFreshIcon:string = "refresh";


const ls = StyleSheet.create(
  {
    refreshButton: {
      marginTop: 20,
    }
  }
)

interface TextResultTypes {
  placeholder: string;
  heading: string;
  Content: React.ReactElement;
  source: string | AnimationObject | { uri: string; };
  response: string;
  setResponse: Dispatch<SetStateAction<string>>;
  sendData?: (() => void);
  error: string;
  successAnimation: string | AnimationObject | { uri: string; };

}

const UniversalTextCreator: React.FC<TextResultTypes> = (

  {
    placeholder,
    heading,
    Content,
    source,
    response,
    setResponse,
    sendData,
    error,
    successAnimation,
  }

) => {
  const [successAnimationFinish, setSuccessAnimationFinish] = useState<boolean>(false);

  // Context
  const { customTheme } = useContext(ThemeContext);
  const { loading, alreadyRunning, setAlreadyRunning } = useContext(PrimaryContext);

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

  const alreadyRunningComponent = useCallback(() => {
    if (alreadyRunning) {
      return <DefaultText error text={"Process already in progress..."} />
    }else {
      return <></>
    }
  }, [alreadyRunning])


  const handleClearField = useCallback(() => {
    setResponse("");
  }, [response])


  const handleClick = useCallback(() => {
    setSuccessAnimationFinish(false);
    if (loading) {
      setAlreadyRunning(true);
      return;
    }else if (sendData && !loading) {
      sendData();
    }
  }, [loading, sendData]);


  const sendButton = useCallback(() => {
    if (sendData) {
      return <DefaultButton onPressAction={handleClick}/>
    }
    return <></>
  }, [sendData])


  const resultContainer = useCallback(() => {
    if (response &&
        response.length > 0 &&
        error.length == 0 &&
        successAnimationFinish &&
        !loading) {
      return (
        <View style={ts.transcriptContainer}>
          <DefaultInput
            numberOfLines={15}
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

    }else if (loading) {
      return <ToolIndicator />

    }else if (
      !loading &&
      response &&
      !successAnimationFinish &&
      error.length == 0
    ) {
        return(
          <>
            {defaultLottie(successAnimation, setSuccessAnimationFinish)}
            <ActivityIndicator size={60} color={customTheme.text}/>
          </>
        )

    }else if (error && error.length > 0 && !successAnimationFinish && !loading) {
      return(
        <LottieContainer
          source={toolError}
          text={error}
          extraChild={
          <>
            <DefaultText moreStyles={ls.refreshButton} error text={"Retry"}/>
            <IconButton size={40}  iconColor={customTheme.primaryButton} icon={reFreshIcon} onPress={handleClick} />

          </>
          }
        />
      );

    }else {
      return(
        <LottieContainer source={source} text={placeholder} />
      );
    }
  }, [response, error, successAnimationFinish, loading]);



  return(
    <KeyboardAvoidingView style={mainContainerStyles}>

    <TextStream message={heading}/>

      {Content}

      {sendButton()}

      {alreadyRunningComponent()}

      {resultContainer()}

      <BottomImage />

    </KeyboardAvoidingView>
  );
}

export default memo(UniversalTextCreator);
