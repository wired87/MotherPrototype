import React, {memo, useCallback, useContext, useMemo, useRef, useState} from "react";

import {
  ScrollView, Vibration,
} from "react-native";

import {toolStyles as ts} from "../toolStyles";
import {PrimaryContext, ThemeContext, ToolContext} from "../../Context";
import UniversalTextCreator from "../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import ErrorContainerSwipeModal from "../../../components/container/ErrorContainerSwipeModal";
import SwipeModal from "../../../components/modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import chatResponse from "../../../assets/animations/chatResponse.json";
import {CHAT_COMPLETION_REQUEST} from "@env";
import {DefaultText} from "../../../components/text/DefaultText";

// Strings
const placeholderTranscript:string = "The forward text responses will be shown here...";
const heading:string = "Chat response helper...";


const chatHistoryPlaceholder:string = "Provide me all context that could be relevant...";
const extraInformationsPlaceholder:string = "What should i also may know?";
const goalPlaceholder:string = "Goal of the Chat";

const ChatResponseHelper: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);

  const [error, setError]= useState<string>("");
  const [fieldError, setFieldError] = useState<boolean>(false);
  const [alreadyRunning, setAlreadyRunning] = useState<boolean>(false);

  // INPUT
  const [input, setInput]= useState<string>("");
  const [context, setContext]= useState<string>("");
  const [goal, setGoal]= useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);
  const { toolPostRequest } = useContext(ToolContext);

  const {loading } = useContext(PrimaryContext);

  const backgroundColor = {backgroundColor: customTheme.primary};

  // REFS
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

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

  const handleSearch = async () => {
    if (input.length == 0 || context.length == 0) {
      Vibration.vibrate();
      console.log("No input or Chat context provided...")
      setFieldError(true);
      return;
    }else if (loading) {
      Vibration.vibrate();
      setAlreadyRunning(true);
      return;
    }
    setFieldError(false)
    setAlreadyRunning(false)
    setError("");
    setResponse("");

    await toolPostRequest(
      CHAT_COMPLETION_REQUEST,
      getChatResponseObject(),
      setError,
      setResponse
    )
  };

  const fieldErrorComp = useCallback(() => {
    if (fieldError) {
      return(
        <DefaultText
          error
          text={"Provide some Chat history and context for good results."}
          moreStyles={ts.text}
        />
      );
    }else {
      return(
        <></>
      );
    }
  }, [fieldError])




  const Content = useMemo(() => {
    const buttonText:string = "Generate Answers";
    return(
      <>
        <DefaultInput
          value={input}
          placeholder={chatHistoryPlaceholder}
          onChangeAction={(text:string) => setInput(text)}
          editable={true}
          keyboardType={"default"}
          extraStyles={historyInputStyles}
          multiline={true}
          numberOfLines={6}
          max_length={2000}
        />
        <DefaultInput
          value={context}
          placeholder={extraInformationsPlaceholder}
          onChangeAction={(text:string) => setContext(text)}
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
          onChangeAction={(text:string) => setGoal(text)}
          editable={true}
          keyboardType={undefined}
          extraStyles={ts.input}
          multiline={true}
          max_length={300}
        />
        <DefaultButton
          extraStyles={undefined}
          onPressAction={handleSearch}
          text={buttonText}
          secondIcon={undefined}
        />
        {fieldErrorComp()}
      </>
    );
  }, [goal, input, context]);


  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        source={chatResponse}
        response={response}
        setResponse={setResponse}
        sendData={handleSearch}
        error={error}
        placeholder={placeholderTranscript}
        editable={editable}
        heading={heading}
        Content={
          Content
        }
      />
      <SwipeModal
        bottomSheetRef={bottomSheetRef}
        Content={
          <ErrorContainerSwipeModal error={error}/>}
        modalIndex={-1}
      />
    </ScrollView>
  );
}

export default memo(ChatResponseHelper);

