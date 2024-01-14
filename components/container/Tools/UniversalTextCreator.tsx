import {toolStyles as ts} from "../../../screens/tools/toolStyles";
import {DefaultInput} from "../../input/DefaultInput";
import {IconButton} from "react-native-paper";
import {KeyboardAvoidingView, View} from "react-native";
import React, {Dispatch, SetStateAction, useCallback, useContext} from "react";

import {memo} from "react";
import {PrimaryContext, ThemeContext} from "../../../screens/Context";
import BottomImage from "../../images/BottomImage";
import CopyButton from "../../buttons/CopyButton";
import DefaultProgressBar from "../../animations/DefaultProgressBar";
import TextStream from "../../text/TextStream";
import LottieView, {AnimationObject} from "lottie-react-native";
import {DefaultText} from "../../text/DefaultText";
import {DefaultButton} from "../../buttons/DefaultButton";

// STRINGS
const clear:string = "close";


interface TextResultTypes {
  placeholder: string;
  editable: boolean;
  heading: string;
  Content: React.ReactElement;
  source: string | AnimationObject | { uri: string; };
  response: string;
  setResponse: Dispatch<SetStateAction<string>>;
  sendData: (() => void)
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
    sendData
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
      return(
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

          <IconButton size={20} iconColor={buttonColor} style={ts.clearButton} onPress={handleClearField} icon={clear} />
          <CopyButton value={response} />
        </View>
      );
    }else {
      return(
        <View style={ts.defaultLottieContainer}>
          <LottieView style={ts.lottie} source={source} autoPlay loop={false} />
          <DefaultText moreStyles={{marginTop: 0}} text={placeholder} />
        </View>
      );
    }
  }, [response]);

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