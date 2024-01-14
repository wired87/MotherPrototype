import React, {memo, ReactNode, useCallback, useContext, useEffect, useRef, useState} from "react";
import {PrimaryContext, ThemeContext, ToolContext} from "../../../../Context";

import {KeyboardAvoidingView, ScrollView, Vibration, View} from "react-native";
import {toolStyles as ts} from "../../../toolStyles";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import TextStream from "../../../../../components/text/TextStream";
import DefaultProgressBar from "../../../../../components/animations/DefaultProgressBar";
import {DefaultInput} from "../../../../../components/input/DefaultInput";
import {IconButton} from "react-native-paper";
import CopyButton from "../../../../../components/buttons/CopyButton";
import BottomImage from "../../../../../components/images/BottomImage";
import {DefaultButton} from "../../../../../components/buttons/DefaultButton";
import {showToolAds} from "../../../../chat/functions/AdLogic";
import {sendObject} from "../../../../chat/functions/SendProcess";
import {getToken} from "../../../../../AppFunctions";
import UniversalTextCreator from "../../../../../components/container/Tools/UniversalTextCreator";


/*
Birthday,
greetings
new year wishes
christmas

example obj{
for
type


}

 */











const UniversalCardScreens: React.FC = (

) => {




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
    setPersonFor("");
  }, [personFor])


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
      <>
        <DefaultInput
          placeholder={"The Card is for... "}
          value={personFor}
          onChangeAction={handleClearField}
          extraStyles={{}}
          max_length= {maxLengthSmall}
          recordingOption
          showClearButton
        />

        <DefaultInput
          placeholder={"Extra Information's to provide?"}
          value={extraInfos}
          onChangeAction={setExtraInfos}
          extraStyles={{}}
          max_length={maxLengthBig}
          recordingOption
          showClearButton
        />


      </>




  );
}

export default memo(UniversalCardScreens);


  /*
  <UniversalTextCreator
      value={response}
      placeholder={placeholder(name)}
      editable={editable}
      changeText={setResponse}
      heading={heading(name)}
      Content={
      <>
        <DefaultInput
          placeholder={"The Card is for... "}
          value={personFor}
          onChangeAction={handleClearField}
          extraStyles={{}}
          max_length= {maxLengthSmall}
          recordingOption
          showClearButton
        />

        <DefaultInput
          placeholder={"Extra Information's to provide?"}
          value={extraInfos}
          onChangeAction={setExtraInfos}
          extraStyles={{}}
          max_length={maxLengthBig}
          recordingOption
          showClearButton
        />
      </>
      }
    />
   */