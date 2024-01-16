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

  const [kind, setKind] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [goal, setGoal] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);

  const {user, loading } = useContext(PrimaryContext);
  // Context
  const {toolPostRequest } = useContext(ToolContext);
  const {customTheme } = useContext(ThemeContext);

  const moreInfosInput = [
    ts.input, {minHeight: 80}];

  const getCardPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "email",
      "kind": kind,
      "extraInfos": extraInfos,
      "goal": goal
    }
  }

  const sendData = useCallback(async () => {
    if (kind.length == 0){
      Vibration.vibrate();
      setFieldError("Please provide a Card Type");
      return;
    }
    await toolPostRequest(
      TEXT_REQUEST_URL,
      getCardPostObject(),
      setError,
      setResponse
    )
  }, [kind, loading]);

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
        placeholder={placeholder}
        editable={editable}
        heading={heading}
        source={cardLoading}
        response={response}
        sendData={sendData}
        setResponse={setResponse}
        error={error}
        Content={<>
          <DefaultInput
            label={"E-Mail type:"}
            placeholder={"e.g. Business, Resume,... "}
            value={kind}
            onChangeAction={setKind}
            extraStyles={{}}
            max_length={maxLengthSmall}
            recordingOption
            showClearButton/>

          {fieldErrorText()}

          <DefaultInput
            label={"Goal"}
            placeholder={"Have a nice conversation"}
            value={goal}
            onChangeAction={setGoal}
            extraStyles={{}}
            max_length={maxLengthSmall}
            recordingOption
            showClearButton/>

          <DefaultInput
            label={"Extra Information's to provide?"}
            placeholder={"Contact Person: Mr. Example"}
            value={extraInfos}
            onChangeAction={setExtraInfos}
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
