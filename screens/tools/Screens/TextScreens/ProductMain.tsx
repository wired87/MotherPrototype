import {memo, useCallback, useContext, useEffect, useState} from "react";

import {PrimaryContext, ThemeContext, ToolContext} from "../../../Context";
import React from "react";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {toolStyles as ts} from "../../toolStyles";
import {getLanguage} from "../../../../AppFunctions";
import {ScrollView, Vibration} from "react-native";
import {TEXT_REQUEST_URL} from "@env";
import {DefaultText} from "../../../../components/text/DefaultText";
import cardLoading from "../../../../assets/animations/cardLoading.json";

//STRINGS
const heading:string = "Create product descriptions, Slogans amd much more...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Product Text will be shown here...`


const ProductMain: React.FC  = () => {

  const [extraInfos, setExtraInfos] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [kind, setKind] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [fieldError, setFieldError] = useState<boolean>(false);
  const [alreadyRunning, setAlreadyRunning] = useState<boolean>(false);

  // Context
  const {toolPostRequest} = useContext(ToolContext);
  const {customTheme} = useContext(ThemeContext);

  const {user, loading} = useContext(PrimaryContext);


  const moreInfosInput = [
    ts.input, {minHeight: 80}];


  const getProductPostObject = (): object => {
    return {
      "user_id": user?.uid,
      "input_type": "product",
      "kind": kind,
      "data": data,
      "title": title,
      "extraInfos": extraInfos,
      "language": getLanguage(),
    }
  }


  const sendData = useCallback(async () => {
    if (kind.length == 0 && title.length == 0) {
      Vibration.vibrate();
      setFieldError(true);
      return;
    }else if (loading) {
      Vibration.vibrate();
      setAlreadyRunning(true);
      return;
    }
    await toolPostRequest(
      TEXT_REQUEST_URL,
      getProductPostObject(),
      setError,
      setResponse
    )
  }, [loading, kind, title]);


  // FIELD ERROR LOGIC
  useEffect(() => {
    if (fieldError) {
      const interval = setInterval(() => {
        setFieldError(false);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [fieldError]);


  const fieldErrorText = useCallback(() => {
    if (fieldError) {
      return (
        <DefaultText
          error
          moreStyles={ts.text}
          text={"Please provide a Type or a product(for descriptions) \n or Company Name(for Slogans)."}
        />
      );
    }else{
      return <></>
    }
  }, [fieldError])


  return (
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
        alreadyRunning={alreadyRunning}
        Content={
        <>
          <DefaultInput
            label={"Type"}
            placeholder={"e.g. Product Description"}
            value={kind}
            onChangeAction={setKind}
            extraStyles={{}}
            max_length={maxLengthSmall}
            recordingOption
            showClearButton/>

          <DefaultInput
            label={"Product/Company Name:"}
            placeholder={"e.g. Product: Backpack,... "}
            value={title}
            onChangeAction={setTitle}
            extraStyles={{}}
            max_length={maxLengthSmall}
            recordingOption
            showClearButton/>

          {fieldErrorText()}

          <DefaultInput
            label={"Data"}
            placeholder={"e.g. Waterproof"}
            value={data}
            onChangeAction={setData}
            extraStyles={{}}
            max_length={maxLengthSmall}
            recordingOption
            showClearButton
          />

          <DefaultInput
            label={"Extra Information's to provide?"}
            placeholder={"Emphasize that the backpack is waterproof"}
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
  )
}


export default memo(ProductMain);
