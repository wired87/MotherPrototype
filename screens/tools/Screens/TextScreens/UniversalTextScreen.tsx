import React, {memo, ReactNode, useCallback, useContext, useEffect, useRef, useState} from "react";
import {PrimaryContext, ThemeContext, ToolContext} from "../../../Context";

import {KeyboardAvoidingView, ScrollView, Vibration, View} from "react-native";
import {toolStyles as ts} from "../../toolStyles";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import TextStream from "../../../../components/text/TextStream";
import DefaultProgressBar from "../../../../components/animations/DefaultProgressBar";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {IconButton} from "react-native-paper";
import CopyButton from "../../../../components/buttons/CopyButton";
import BottomImage from "../../../../components/images/BottomImage";
import {DefaultButton} from "../../../../components/buttons/DefaultButton";
import {showToolAds} from "../../../chat/functions/AdLogic";
import {sendObject} from "../../../chat/functions/SendProcess";
import {getToken} from "../../../../AppFunctions";

//STRINGS
const heading: string = "AI Job Application \n creator";
const clear:string = "close";
const create:string = "create";

interface UniversalTextScreenTypes {
  content: ReactNode;
  placeholder: string;
  extraContent: ReactNode
}

const UniversaltextScreen: React.FC<UniversalTextScreenTypes> = (

  {
    content,
    placeholder,
    extraContent,
  }
) => {

  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [result, setResult] = useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);
  const { setToolActionValue, toolActionValue } = useContext(ToolContext);
  const { setLoading,
    jwtToken,
    setJwtToken,
    user, loading } = useContext(PrimaryContext);

  // STYLES
  const buttonColor  = customTheme.text;

  const updateModalIndex = useCallback((number:number) => {
    bottomSheetRef?.current?.snapToIndex(number);
  }, [])


  useEffect(() => {
    if (error.length > 0) {
      console.log("Error in ResumeCreator:", error);
      updateModalIndex(2);
    }
  }, [error]);


  const handleClearField = useCallback(() => {
    setResult("");
  }, [result])


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


  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <KeyboardAvoidingView style={mainContainerStyles}>

        <TextStream  message={heading}/>

        {content}

        <DefaultProgressBar loading={loading} />

        <View style={ts.transcriptContainer}>
          <DefaultInput
            numberOfLines={10}
            editable={editable}
            placeholder={placeholder}
            value={result}
            onChangeAction={setResult}
            extraStyles={transcriptInputStyles}
            multiline={true}
          />

          <IconButton size={20} iconColor={buttonColor} style={ts.clearButton} onPress={handleClearField} icon={clear} />

          <CopyButton value={result} />

        </View>

        {extraContent}

        <BottomImage />

      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default memo(UniversaltextScreen);