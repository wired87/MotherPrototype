import {toolStyles as ts} from "../../../screens/tools/toolStyles";
import {DefaultInput} from "../../input/DefaultInput";
import {IconButton} from "react-native-paper";
import {KeyboardAvoidingView, View} from "react-native";
import React, {Dispatch, SetStateAction, useCallback, useContext, useState} from "react";

import {memo} from "react";
import {PrimaryContext, ThemeContext} from "../../../screens/Context";
import BottomImage from "../../images/BottomImage";
import CopyButton from "../../buttons/CopyButton";
import DefaultProgressBar from "../../animations/DefaultProgressBar";
import TextStream from "../../text/TextStream";
import {DefaultButton} from "../../buttons/DefaultButton";

// STRINGS
const clear:string = "close";
const postUrl:string = "wired87.pythonanywhere.com/ai-creation/text-request";

interface TextResultTypes {
  placeholder: string;
  editable: boolean;
  heading: string;
  Content: React.ReactElement;
  postObject: object
}

const UniversalTextCreator: React.FC<TextResultTypes> = (
  {
    placeholder,
    editable,
    heading,
    Content,
    postObject
  }
) => {
  // Context
  const { customTheme } = useContext(ThemeContext);
  const { loading } = useContext(PrimaryContext);
  const [ response, setResponse] = useState<string>("");

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


  return(
    <KeyboardAvoidingView style={mainContainerStyles}>

    <TextStream message={heading}/>

      {Content}

      <DefaultButton
        extraStyles={undefined}
        onPressAction={undefined}
        postUrl={postUrl}
        setPostResponse={setResponse}
        field={undefined}
        postObject={postObject}
      />

      <DefaultProgressBar loading={loading} />

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

      <BottomImage />
    </KeyboardAvoidingView>
  );
}

export default memo(UniversalTextCreator);