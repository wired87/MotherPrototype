import {memo, useCallback, useContext, useState} from "react";

import React from "react";
import {PrimaryContext, ThemeContext, ToolContext} from "../../../Context";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {ScrollView, Vibration} from "react-native";
import {toolStyles as ts} from "../../toolStyles";
import cardLoading from "../../../../assets/animations/cardLoading.json";
import {TEXT_REQUEST_URL} from "@env";
import {DefaultText} from "../../../../components/text/DefaultText";
import {getLanguage} from "../../../../AppFunctions";


//STRINGS
const heading:string = "Create creative business Ideas...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Tex will be shown here...`


const IdeaFinder: React.FC  = () => {
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [fieldError, setFieldError] = useState<boolean>(false);

  const [category, setCategory] = useState<string>("");
  const [thoughts, setThoughts] = useState<string>("");
  const [niche, setNiche] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);

  const {user, loading } = useContext(PrimaryContext);
  // Context
  const {toolPostRequest } = useContext(ToolContext);
  const {customTheme } = useContext(ThemeContext);

  const moreInfosInput = [
    ts.input, {minHeight: 80}];

  const getIdeaPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "idea",
      "language": getLanguage(),
      "niche": niche,
      "thoughts": thoughts,
      "category": category
    }
  }

  const sendData = useCallback(async () => {
    if (niche.length == 0){
      Vibration.vibrate();
      setFieldError(true);
      return;
    }
    await toolPostRequest(
      TEXT_REQUEST_URL,
      getIdeaPostObject(),
      setError,
      setResponse
    )
  }, [niche, loading]);

  const fieldErrorText = useCallback(() => {
    if (fieldError) {
      return(
        <DefaultText text={"Please provide the niche for the ideas"}/>
      );
    }
  }, [fieldError])

  return(
    <ScrollView style={{backgroundColor: customTheme.primary}} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        placeholder={placeholder}
        editable={editable}
        heading={heading}
        source={cardLoading}
        response={response}
        sendData={sendData}
        setResponse={setResponse}
        error={error}
        Content={
        <>
          <DefaultInput
            label={"Category"}
            placeholder={"e.g. Software"}
            value={category}
            onChangeAction={setCategory}
            extraStyles={{}}
            max_length={maxLengthSmall}
            recordingOption
            showClearButton
          />

          <DefaultInput
            label={"Niche:"}
            placeholder={"e.g. Games, ... "}
            value={niche}
            onChangeAction={setNiche}
            extraStyles={{}}
            max_length={maxLengthSmall}
            recordingOption
            showClearButton
          />

          {fieldErrorText()}

          <DefaultInput
            label={"Thoughts"}
            placeholder={"New cool Games"}
            value={thoughts}
            onChangeAction={setThoughts}
            extraStyles={moreInfosInput}
            max_length={maxLengthBig}
            recordingOption
            showClearButton
            multiline
            numberOfLines={3}
          />
        </>
        }
      />
    </ScrollView>
  );
}


export default memo(IdeaFinder);
