import React, {memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";

import {
  ScrollView,
} from "react-native";

import {toolStyles as ts} from "../toolStyles";
import {JwtToken, PrimaryContext, ThemeContext} from "../../Context";
import UniversalTextCreator from "../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import ErrorContainerSwipeModal from "../../../components/container/ErrorContainerSwipeModal";
import {SwipeModal} from "../../../components/modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {sendObject} from "../../chat/functions/SendProcess";
import {getToken} from "../../../AppFunctions";

// Strings
const placeholderTranscript: string = "The forward text responses will be shown here...";
const heading: string = "Transcribe your thoughts..";
const answerEndpoint: string = "";

const ChatResponseHelper: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [input, setInput]= useState<string>("");
  const [informationInput, setInformationInput]= useState<string>("");
  const [error, setError]= useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);
  const { jwtToken, setJwtToken } = useContext(PrimaryContext);

  const backgroundColor = {backgroundColor: customTheme.primary};
   // REFS
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const jwtTokenRef = useRef<JwtToken | null>(null);


  useEffect(() => {
    console.log("jwt changed in ChatNavigator:", jwtToken);
    jwtTokenRef.current = jwtToken;
    console.log("jwt ref:", jwtTokenRef.current);
  }, [jwtToken]);


  const getAnswers = useCallback(async () => {
    const body = {
        "chat": input,
        "informations": informationInput,
        "goal": undefined
      }
    let response;
    try {
      if (jwtTokenRef?.current && jwtTokenRef.current.refresh && jwtTokenRef.current.access) {
        response = await sendObject(
          body,
          jwtTokenRef.current,
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
      if (response && !(response.status === "500")) {
        console.log("response:" , response.status);
        setResponse(response.message);
      }else{
        setError(response.message);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log("Error while sending the chatCompletion request:", e.message)
        setError(e.message);
        console.log(e.message);
      }
    }
  }, [input, informationInput, jwtTokenRef, jwtToken]);





  const updateModalIndex = () => {
    bottomSheetRef?.current?.snapToIndex(2);
  }

  useEffect(() => {
    if (error.length > 1) {
      updateModalIndex();
    }
  }, [error]);



  const Content = useMemo(() => {
    const buttonText = "Generate Answers";
    return(<>
            <DefaultInput
              value={input}
              placeholder={"Provide me all context that could be relevant..."}
              onChangeAction={setInput}
              editable={true}
              keyboardType={undefined}
              extraStyles={undefined}
              multiline={true}
              numberOfLines={12}
              max_length={2000}
            />
            <DefaultButton
              extraStyles={undefined}
              onPressAction={getAnswers}
              text={buttonText}
              secondIcon={undefined}
            />
          </>
    );

  }, []);


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
          <ErrorContainerSwipeModal error={error}/>
        }
      />
    </ScrollView>
  );
}

export default memo(ChatResponseHelper);

