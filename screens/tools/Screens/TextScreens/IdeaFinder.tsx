import {memo, useCallback, useContext, useEffect, useState} from "react";

import React from "react";
import {PrimaryContext, ThemeContext} from "../../../Context";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {ScrollView, Vibration} from "react-native";
import {toolStyles, toolStyles as ts} from "../../toolStyles";
import cardLoading from "../../../../assets/animations/cardLoading.json";
import {TEXT_REQUEST_URL} from "@env";
import {getLanguage} from "../../../../AppFunctions/AppFunctions";
import {DefaultText} from "../../../../components/text/DefaultText";


//STRINGS
const heading:string = "Create creative Ideas for your Business...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your Ideas will be shown here...`


const IdeaFinder: React.FC  = () => {
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [fieldError, setFieldError] = useState<string>("");

  const [category, setCategory] = useState<string>("");
  const [thoughts, setThoughts] = useState<string>("");
  const [niche, setNiche] = useState<string>("");

  const {user, loading, defaultPostRequest } = useContext(PrimaryContext);
  // Context
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
      setFieldError("Please Provide minimum a Niche. \n(More information's gain better results)");
      return;
    }
    await defaultPostRequest(
      TEXT_REQUEST_URL,
      getIdeaPostObject(),
      setError,
      setResponse,
      undefined,
      true,
    )
  }, [niche, loading]);

  const fieldErrorText = useCallback(() => {
    if (fieldError && fieldError.length > 0) {
      return(
        <DefaultText moreStyles={toolStyles.text} error text={fieldError}/>
      );
    }
  }, [fieldError]);


  // FIELD ERROR LOGIC
  useEffect(() => {
    if (fieldError) {
      const interval = setInterval(() => {
        setFieldError("");
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [fieldError]);

  return(
    <ScrollView style={{backgroundColor: customTheme.primary}} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        successAnimation={cardLoading}
        placeholder={placeholder}
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
          {fieldErrorText()}
        </>
        }
      />
    </ScrollView>
  );
}


export default memo(IdeaFinder);
