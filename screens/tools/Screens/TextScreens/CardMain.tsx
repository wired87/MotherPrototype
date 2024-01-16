import {memo, useCallback, useContext, useEffect, useState} from "react";
import {PrimaryContext, ThemeContext, ToolContext} from "../../../Context";
import React from "react";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {TEXT_REQUEST_URL} from "@env";
import {ScrollView, Vibration} from "react-native";
import cardLoading from "../../../../assets/animations/cardLoading.json";
import {toolStyles as ts} from "../../toolStyles";
import {DefaultText} from "../../../../components/text/DefaultText";
import {getLanguage} from "../../../../AppFunctions";

//STRINGS
const placeholder:string = "Your written Card will be shown here";
const heading:string = "Create Cards for every occasion";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const CardMain: React.FC  = () => {

  const [personFor, setPersonFor] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [moods, setMoods] = useState<string>("");
  const [kind, setKind] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [fieldError, setFieldError] = useState<string>("");

  // Context
  const {toolPostRequest } = useContext(ToolContext);
  const {customTheme } = useContext(ThemeContext);

  const {user, loading } = useContext(PrimaryContext);

  const moreInfosInput = [
    ts.input, {minHeight: 80}];


  const getCardPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "card",
      "kind": kind,
      "personFor": personFor,
      "extraInfos": extraInfos,
      "moods": moods,
      "language": getLanguage(),
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


  // FIELD ERROR LOGIC
  useEffect(() => {
    if (fieldError && fieldError.length > 0) {
      const interval = setInterval(() => {
        setFieldError("");
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [fieldError]);


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
            label={"Card type:"}
            placeholder={"e.g. Christmas Card,... "}
            value={kind}
            onChangeAction={setKind}
            extraStyles={{}}
            max_length={maxLengthSmall}
            recordingOption
            showClearButton/>

          {fieldErrorText()}

          <DefaultInput
            label={"The Card is for: "}
            placeholder={"Grandma"}
            value={personFor}
            onChangeAction={setPersonFor}
            extraStyles={{}}
            max_length={maxLengthSmall}
            recordingOption
            showClearButton/>

          <DefaultInput
            label={"Extra Information's to provide?"}
            placeholder={"Thank my grandma for the 50$"}
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


export default memo(CardMain);
