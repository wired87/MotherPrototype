import React, {memo, useCallback, useContext, useEffect, useMemo, useState} from "react";

import {
  ScrollView, Vibration,
} from "react-native";

import {toolStyles, toolStyles as ts} from "../toolStyles";
import {PrimaryContext, ThemeContext} from "../../Context";
import UniversalTextCreator from "../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../components/input/DefaultInput";


import {CHAT_COMPLETION_REQUEST} from "@env";

// LOTTIE
import chatDefault from "../../../assets/animations/chatDefault.json";
import chatSuccess from "../../../assets/animations/chatSuccess.json";
import {DefaultText} from "../../../components/text/DefaultText";

// Strings
const placeholderTranscript:string = "The suggestions will be shown here...";
const heading:string = "Chat response helper";


const chatHistoryPlaceholder:string = "Provide me all context that could be relevant...";
const extraInformationsPlaceholder:string = "What should i also may know?";
const goalPlaceholder:string = "Goal of the Chat";

const ChatResponseHelper: React.FC = () => {
  const [response, setResponse] = useState<string>("");

  const [error, setError]= useState<string>("");
  const [fieldError, setFieldError] = useState<boolean>(false);

  // INPUT
  const [input, setInput]= useState<string>("");
  const [context, setContext]= useState<string>("");
  const [goal, setGoal]= useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);

  const { defaultPostRequest } = useContext(PrimaryContext);

  const backgroundColor = {backgroundColor: customTheme.primary};

  // STYLES
  const historyInputStyles = [ts.input, {minHeight: 100}];
  const extraInfosInputStyles = [ts.input, {minHeight: 75}]

  const getChatResponseObject = ():object => {
    return {
      "chat": input,
      "context": context,
      "goal": goal
    }
  }

  useEffect(() => {
    console.log("Error response helper:", error)
  }, [error]);

  useEffect(() => {
    if(fieldError) {
      setTimeout(() => {
        setFieldError(false);
      }, 4000);
    }
  }, [fieldError]);


  const handleSearch = useCallback(async () => {
    if (input.length == 0) {
      Vibration.vibrate();
      console.log("No input or Chat context provided...")
      setFieldError(true);
      return;
    }
    await defaultPostRequest(
      CHAT_COMPLETION_REQUEST,
      getChatResponseObject(),
      setError,
      setResponse
    )
  }, [input, context]);


  const Content = useMemo(() => {
    return(
      <>
        <DefaultInput
          value={input}
          placeholder={chatHistoryPlaceholder}
          onChangeAction={setInput}
          editable={true}
          keyboardType={"default"}
          extraStyles={historyInputStyles}
          multiline={true}
          numberOfLines={6}
          max_length={1100}
        />

        <DefaultInput
          value={context}
          placeholder={extraInformationsPlaceholder}
          onChangeAction={setContext}
          editable={true}
          keyboardType={undefined}
          extraStyles={extraInfosInputStyles}
          multiline={true}
          numberOfLines={6}
          max_length={300}
          />

        <DefaultInput
          value={goal}
          placeholder={goalPlaceholder}
          onChangeAction={setGoal}
          editable={true}
          keyboardType={undefined}
          extraStyles={[ts.input, {marginBottom: 20,}]}
          multiline={true}
          max_length={300}
        />
        {fieldError?(
          <DefaultText
            error
            text={"No Chat History and Context provided "}
            moreStyles={toolStyles.text}
          />
          ):null}
      </>
    );
  }, [goal, input, context, fieldError]);



  return(
    <ScrollView
      style={backgroundColor}
      contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        source={chatSuccess}
        response={response}
        setResponse={setResponse}
        sendData={handleSearch}
        error={error}
        placeholder={placeholderTranscript}
        successAnimation={chatDefault}
        heading={heading}
        Content={

          Content

        }
      />
    </ScrollView>
  );
}

export default memo(ChatResponseHelper);

