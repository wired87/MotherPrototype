import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {memo, useCallback, useContext, useEffect, useRef, useState} from "react";
import DefaultHeader from "../../components/navigation/DefaultHeader";

// @ts-ignore
import {ChatMain} from "./ChatMain";
import {Pressable, StyleSheet} from "react-native";

// Context
import {FunctionContext, InputContext, JwtToken, MediaContext, PrimaryContext, ThemeContext} from "../Context";

// Ads
import {checkUserMessageValue, getMessageInfoData, postMessageInfoData, showAds} from "./functions/AdLogic";
import {createMessageObject, getCurrentTime, sendObject} from "./functions/SendProcess";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";

import SwipeModal from "../../components/modals/SwipeModal";
import ChatMenuModalContent from "../../components/container/ChatMenuModalContainer/ChatMenuModalContent";
import HeaderButton from "../../components/buttons/navigation/HeaderButton";
import {getUserID} from "../../AppFunctions/UserFunctions";

interface ChatNavigationTypes {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;//(number: number) => void;
}

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////// INTERFACE#

export interface userMesssageObject {
  id: number | string,
  message: string,
  file: string | undefined;
  timeToken: string | number
  publisher: string,
  class: string,
  user_id: number | string
  type: string,
  start?: boolean
}


/////////////////////////////////////// VARIABLES



// STACK DEFINITIONS ///////////////////////
const ChatStack = createNativeStackNavigator();

const ChatNavigation: React.FC<ChatNavigationTypes> = (
  {
    bottomSheetRef
  }
) => {

  const [history, setHistory] = useState(false);

  // Context //////////////////////////
  const {
    messagesLeft, setMessagesLeft,
    setInput, input,
    messageIndex,
    setTyping,
    setMessages,
    setMessageIndex,
  } = useContext(InputContext);

  const {
    pickedImage,
    doc,
    updatePickedImage,
    updateDoc
  } = useContext(MediaContext);

  const {
    user,
    setClearMessages,
    clearMessages,
    jwtToken,
    setJwtToken,
  } = useContext(PrimaryContext);


// REFS
  const inputRef = useRef(input);
  const picRef = useRef(pickedImage?.assets?.[0].uri);
  const docRef = useRef(doc?.assets?.[0].uri);
  const jwtTokenRef = useRef<JwtToken | null>(null);

  useEffect(() => {
    if (input.trim() !== "") {
      inputRef.current = input;
    }
  }, [input]);

  useEffect(() => {
    if (pickedImage?.assets?.[0].uri) {
      picRef.current = pickedImage.assets[0].uri;
    }
  }, [pickedImage]);

  useEffect(() => {
    if (doc?.assets?.[0].uri) {
      docRef.current = doc.assets[0].uri;
    }
  }, [doc]);


  // GOOGLE MOBILE AD LOGIC ////////////////////
  useEffect(() => {
    console.log("Real Messages Left:", messagesLeft)
    showAds(messagesLeft, setMessagesLeft)
      .then(() => console.log("Ads successfully showed. Refilled the Messages"));
  }, [messagesLeft]);


  const updateModalIndex = useCallback((number: number) => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(number);
    }
  }, []);

  useEffect(() => {
    jwtTokenRef.current = jwtToken;
  }, [jwtToken]);

  const errorMessageAIResponse = () => {
    console.log("Error AIResponse created.. ")
    const aiResponse = createMessageObject(
      "I could not authenticate you. I have contacted the support Team, for you, to fix the problem." +
      "Feel free to Contact us directly also. Sometimes a Refresh can also solve the Problem.",
      "error",
      messageIndex,
      getUserID(user),
      "AI",
      "aiMessageContainer"
    )
    setMessageIndex((state: number) => state + 1);
    setMessages(prevMessages => [...prevMessages, aiResponse]);
  }

  const sendPackage = async (userMessage: any) => {
    let aiResponse: object;
    try {
      console.log("Sending Message Object...")
      if (jwtTokenRef?.current && jwtTokenRef.current.refresh && jwtTokenRef.current.access) {
        const response = await sendObject(userMessage, jwtTokenRef.current, setJwtToken);
        if (!response) {
          // Error while sending the message. -> Send contact
          console.log("sendObject Response === null... (in ChatNav)")
          errorMessageAIResponse();
        } else {
          aiResponse = createMessageObject(
            response.message,
            "text",
            messageIndex,
            getUserID(user),
            "AI",
            "aiMessageContainer",
          )
          setMessageIndex((state: number) => state + 1);
          setMessages(prevMessages => [...prevMessages, aiResponse]);
        }
        console.log("Finished the sendPackage function..");
      } else {
        console.log("Error occurred...")
        errorMessageAIResponse();
      }
    } catch (e:unknown) {
      if (e instanceof Error) {
        errorMessageAIResponse();
        console.log("Error while post request:", e)
      }
    } finally {
      setTyping(false);
      console.log("Function end...")
    }
  }

  const checkMessagesLeftProcess = async (): Promise<boolean> => {
    const valueMessages = await getMessageInfoData();
    console.log("Try to get the user Messages Left Value", valueMessages);
    if (!valueMessages) {
      await postMessageInfoData("3").then(async () => {
        setMessagesLeft("3");
      });
    } else {
      setMessagesLeft(valueMessages);
    }
    return await checkUserMessageValue(valueMessages || "3", setMessagesLeft);
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////// MESSAGE SENT PROCESS /////////////////////////////////////

  const textMessageStart = useCallback(() => {
    setInput("");
    updatePickedImage(undefined);
    updateDoc(undefined);
    setTyping(true);
  }, [])


  const createUserMessage = async() => {
    const firstMessage:boolean = messageIndex === 0;

    const senderObject:userMesssageObject = {
      "id": messageIndex ,
      "message": inputRef.current,
      "timeToken": getCurrentTime(),
      "publisher": "USER",
      "class": "userMessageContainer",
      "user_id": getUserID(user),
      "type": "text",
      "file": undefined,
      "start": firstMessage
    }
    const uri = docRef.current || picRef.current
    if (uri) {
      console.log("create base64File...");
      senderObject["type"] = "IMAGE"
      senderObject["file"] = uri
    }
    return senderObject;
  }


  const sendMessageProcess = useCallback(async() => {
    textMessageStart();
    /*const success = await checkMessagesLeftProcess();

    if (success) {*/
    if (inputRef.current?.trim().length !== 0) {
      const userMessage: userMesssageObject =  await createUserMessage();
      setMessageIndex((state: number) => state + 1)
      console.log("Sender Object created: ", userMessage)

      setMessages(prevMessages => [...prevMessages, userMessage]);

      inputRef.current = "";
      docRef.current = undefined;
      picRef.current = undefined;

      sendPackage(userMessage)
        .then(() => console.log("Payload successfully sent.."))
        .catch(e => console.log("Error while try send the message", e))
        .finally(
          () => setTyping(false)
        )
    } else {
      console.log("0 input try again")
      const response:object = createMessageObject(
        "Im here to help. How can i do that?",
        "text",
        messageIndex,
        getUserID(user),
        "AI",
        "aiMessageContainer"
      );
      setMessages(prevMessages => [...prevMessages, response]);
      setTyping(false);
    }
    /*}else {
      // Ads in useEffect above will be showed
      setTyping(false);
    }*/
  }, [
    user,
    messageIndex,
    inputRef.current,
    jwtToken,
    doc?.assets?.[0]?.uri,
    pickedImage?.assets?.[0]?.uri,
  ]);

  useEffect(() => {
    if (history) {
     sendMessageProcess()
       .finally(() => setHistory(false));
    }
  }, [history]);

  const historySentMessage = useCallback((text: string) => {
    setInput(text)
    setHistory(true);
  }, [])


  useEffect(() => {
    if (clearMessages) {
      setClearMessages(false);
      setMessages([]);
    }
  }, [clearMessages]);

  return(
    <>
      <ChatStack.Navigator
        initialRouteName="ChatMain"
        screenOptions={{
          header:
            (props: any) =>
              <DefaultHeader
                {...props}
                childrenMiddle={
                  <HeaderButton
                    action={() => updateModalIndex(2)}
                    icon={"menu"}
                  />
                }
                childrenRight={undefined}
              />
            }}
          >
        <ChatStack.Screen
          name="ChatMain"
          children={
          () =>
            <FunctionContext.Provider
              value={{sendMessageProcess, checkMessagesLeftProcess}}>
              <ChatMain />
            </FunctionContext.Provider>
          }
        />
      </ChatStack.Navigator>
      <SwipeModal
        bottomSheetRef={bottomSheetRef}
        modalIndex={-1}
        Content={
          <ChatMenuModalContent
            changeText={historySentMessage}
          />
        }
       />
    </>
  );
}

export default memo(ChatNavigation);
