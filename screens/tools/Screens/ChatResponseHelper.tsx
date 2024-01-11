import React, {memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";

import {
  ScrollView,
} from "react-native";

import {toolStyles as ts} from "../toolStyles";
import {PrimaryContext, ThemeContext} from "../../Context";
import UniversalTextCreator from "../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import ErrorContainerSwipeModal from "../../../components/container/ErrorContainerSwipeModal";
import SwipeModal from "../../../components/modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {sendObject} from "../../chat/functions/SendProcess";
import {getToken} from "../../../AppFunctions";

// Strings
const placeholderTranscript:string = "The forward text responses will be shown here...";
const heading:string = "Chat response helper...";
const answerEndpoint:string = "http://wired87.pythonanywhere.com/ai-creation/cempletion-request/";

const chatHistoryPlaceholder:string = "Provide me all context that could be relevant...";
const extraInformationsPlaceholder:string = "What should i also may know?";
const goalPlaceholder:string = "Goal of the Chat";

const ChatResponseHelper: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);

  const [error, setError]= useState<string>("");

  // INPUT
  const [input, setInput]= useState<string>("");
  const [context, setContext]= useState<string>("");
  const [goal, setGoal]= useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);
  const {
    jwtToken, setJwtToken,
    setLoading } = useContext(PrimaryContext);

  const backgroundColor = {backgroundColor: customTheme.primary};

  // REFS
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  // STYLES
  const historyInputStyles = [ts.input, {minHeight: 100}];
  const extraInfosInputStyles = [ts.input, {minHeight: 75}]

  const getAnswers = useCallback(async () => {
    setLoading(true);
    const body: object = {
        "chat": input,
        "context": context,
        "goal": goal
      }
    let response;
    try {
      if (jwtToken && jwtToken.refresh && jwtToken.access) {
        response = await sendObject(
          body,
          jwtToken,
          setJwtToken,
          answerEndpoint
        )
      }else{
        const newToken = await getToken(setJwtToken);
        if (newToken) {
          response = await sendObject(
            body,
            newToken,
            setJwtToken,
            answerEndpoint
          )
        }else{
          setError("Could not authenticate you. Please contact the support or try again later.")
        }
      }
      if (response) {
        console.log("response:" , response);
        setResponse(response);
      }else{
        setError("the Server returned no response. Please Contact the support.");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log("Error while sending the chatCompletion request:", e.message)
        setError(e.message);
        console.log(e.message);
      }
    }finally {
      setLoading(false);
    }
  }, [input, context, jwtToken]);


  const updateModalIndex = () => {
    bottomSheetRef?.current?.snapToIndex(2);
  }

  useEffect(() => {
    if (error.length > 1) {
      updateModalIndex();
    }
  }, [error]);


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
          onPressAction={getAnswers}
          text={buttonText}
          secondIcon={undefined}
        />
      </>
    );
  }, [goal, input, context]);


  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        value={response}
        placeholder={placeholderTranscript}
        editable={editable}
        changeText={setResponse}
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

