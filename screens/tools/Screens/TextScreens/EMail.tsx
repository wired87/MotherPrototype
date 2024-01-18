import {memo, useCallback, useContext, useEffect, useState} from "react";

import React from "react";
import {PrimaryContext, ThemeContext} from "../../../Context";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {ScrollView, Vibration} from "react-native";
import {toolStyles as ts} from "../../toolStyles";
import {TEXT_REQUEST_URL} from "@env";
import {DefaultText} from "../../../../components/text/DefaultText";
import lottieEmail from "../../../../assets/animations/lottieEmail.json";

//STRINGS
const heading:string = "Create easy and fast \n professional E-Mail...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Tex will be shown here...`


const EmailMain: React.FC  = () => {
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [fieldError, setFieldError] = useState<string>("");

  const [keyPoints, setKeyPoints] = useState<string>("");

  const [purpose, setPurpose] = useState<string>("");
  const [recipeName, setRecipeName] = useState<string>("");
  const [relationShip, setRelationShip] = useState<string>("");
  const [tone, setTone] = useState<string>("");


  const {user, defaultPostRequest, loading } = useContext(PrimaryContext);
  // Context
  const {customTheme } = useContext(ThemeContext);

  const moreInfosInput = [
    ts.input, {minHeight: 80}];

  const getCardPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "email",
      "keyPoints": keyPoints,
      "purpose": purpose,
      "tone": tone,
      "recipient": recipeName
    }
  }

  // FIELD ERROR LOGIC
  useEffect(() => {
    if (fieldError) {
      const interval = setInterval(() => {
        setFieldError("");
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [fieldError]);

  const sendData = useCallback(async () => {
    if (purpose.length == 0 || keyPoints.length == 0){
      Vibration.vibrate();
      setFieldError("Please provide a Card Type");
      return;
    }
    await defaultPostRequest(
      TEXT_REQUEST_URL,
      getCardPostObject(),
      setError,
      setResponse,
    undefined,
      true
    )
  }, [purpose, loading, keyPoints]);


  const fieldErrorText = useCallback(() => {
    if (fieldError && fieldError.length > 0) {
      return(
        <DefaultText text={fieldError}/>
      );
    }
  }, [fieldError])


  return(
    <ScrollView style={{backgroundColor: customTheme.primary}} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        successAnimation={lottieEmail}
        placeholder={placeholder}
        heading={heading}
        source={lottieEmail}
        response={response}
        sendData={sendData}
        setResponse={setResponse}
        error={error}
        Content={
          <>
            <DefaultInput
              label={"Purpose"}
              placeholder={"e.g., Inquiry, Feedback, Invitation, ... (required)"}
              value={purpose}
              onChangeAction={setPurpose}
              extraStyles={{}}
              max_length={maxLengthSmall}
              recordingOption
              showClearButton
            />

            <DefaultInput
              label={"Recipients Name"}
              placeholder={"(optional)"}
              value={recipeName}
              onChangeAction={setRecipeName}
              extraStyles={{}}
              max_length={maxLengthSmall}
              recordingOption
              showClearButton
            />

            {fieldErrorText()}

            <DefaultInput
              label={"Relationship Recipient"}
              placeholder={"Friends, Business,... (optional)"}
              value={relationShip}
              onChangeAction={setRelationShip}
              extraStyles={{}}
              max_length={maxLengthSmall}
              recordingOption
              showClearButton
            />

            <DefaultInput
              label={"Desired Tone"}
              placeholder={"Formal, Casual, Professional, ... (optional)"}
              value={tone}
              onChangeAction={setTone}
              extraStyles={{}}
              max_length={maxLengthSmall}
              recordingOption
              showClearButton
            />

            <DefaultInput
              label={"Key Points"}
              placeholder={"Any information's about the E-Mail content (required)"}
              value={keyPoints}
              onChangeAction={setKeyPoints}
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


export default memo(EmailMain);
