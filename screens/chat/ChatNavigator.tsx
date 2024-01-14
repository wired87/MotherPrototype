import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {memo, useCallback, useContext, useEffect, useRef, useState} from "react";
import DefaultHeader from "../../components/navigation/DefaultHeader";

// @ts-ignore
import {ChatMain} from "./ChatMain";
import {StyleSheet, Vibration} from "react-native";

// Context
import {InputContext, PrimaryContext, ThemeContext, FunctionContext, JwtToken} from "../Context";

// Ads
import {checkUserMessageValue, getMessageInfoData, postMessageInfoData, showAds} from "./functions/AdLogic";
import {
  createMessageObject, getCurrentTime,
  sendObject
} from "./functions/SendProcess";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";

import {IconButton} from "react-native-paper";
import SwipeModal from "../../components/modals/SwipeModal";
import ChatMenuModalContent from "../../components/container/ChatMenuModalContainer/ChatMenuModalContent";
import {CHAT_REQUEST_URL} from "@env";

interface ChatNavigationTypes {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;//(number: number) => void;
}

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////// INTERFACE#

interface userMesssageObject {
  id: number | string,
  message: string,
  timeToken: string | number
  publisher: string,
  class: string,
  user_id: number | string
  type: string,
  start?: boolean
}



/////////////////////////////////////// VARIABLES

const iconStyles = StyleSheet.create(
  {
    headerIcon: {
      backgroundColor: "transparent",
    }
  }
)

// STACK DEFINITIONS ///////////////////////
const ChatStack = createNativeStackNavigator();

const ChatNavigation: React.FC<ChatNavigationTypes> = (
  { bottomSheetRef }
) => {

  const [history, setHistory] = useState(false);

  // Context //////////////////////////
  const {
    messagesLeft, setMessagesLeft,
    setInput, input,
    messageIndex,
    setTyping, typing,
    setMessages,
    setMessageIndex,
    messages,
  }  = useContext(InputContext);

  const { customTheme } = useContext(ThemeContext);
  const {
    user,
    setClearMessages,
    clearMessages,
    jwtToken,
    setJwtToken,
  } = useContext(PrimaryContext);

  // REFS
  const inputRef = useRef(input);
  const jwtTokenRef = useRef<JwtToken | null>(null);

  useEffect(() => {
    if (!(input === "" || input.trim().length === 0))
      inputRef.current = input;
  }, [input]);

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
    console.log("jwt changed in ChatNavigator:", jwtToken);
    jwtTokenRef.current = jwtToken;
    console.log("jwt ref:", jwtTokenRef.current);
  }, [jwtToken]);

  const errorMessageAIResponse = () => {
    console.log("Error AIResponse created.. ")
    const aiResponse =  createMessageObject(
      "We could not authenticate you. I have contacted the support Team, for you, to fix the problem." +
      "Feel free to Contact us directly also. Sometimes a Refresh can also solve the Problem.",
      "error",
      messageIndex,
      user,
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
        console.log("jwtTokenRef sendPackage:", jwtTokenRef);
        const response = await sendObject(userMessage, jwtTokenRef.current , setJwtToken);

        if (!response) {
          // Error while sending the message. -> Send contact
          console.log("sendObject Response === null... (in ChatNav)")
          errorMessageAIResponse();
        }else{
          console.log("Create AI Message with response:", response);
          aiResponse = createMessageObject(
            response,
            "text",
            messageIndex,
            user,
            "AI",
            "aiMessageContainer",
          )
          setMessageIndex((state: number) => state + 1);
          setMessages(prevMessages => [...prevMessages, aiResponse]);
          console.log("Final response Object: ", aiResponse);
        }
        console.log("Finished the sendPackage function..");
      }else{
        console.log("sendPackage Response === null...")
        errorMessageAIResponse();
      }
    }catch (error) {
      console.log("Error occurred while try sending the request:", error);
      errorMessageAIResponse();
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

  //////////////////////// TEXT SENT START
  const textMessageStart = useCallback(() => {
    Vibration.vibrate();
    setInput("");
    setTyping(true);
    }, [])

  const sendMessageProcess = useCallback(async() => {
    textMessageStart();
    console.log("inputRef.current", inputRef.current);
    console.log("typing", typing);
    const success = await checkMessagesLeftProcess();

    const firstMessage = messageIndex === 0;

    console.log("firstMessage", firstMessage);
    if (success) {
      if (inputRef.current?.trim().length !== 0) {
        const userMessage: userMesssageObject =
          {
            "id": messageIndex ,
            "message": inputRef.current,
            "timeToken": getCurrentTime(),
            "publisher": "USER",
            "class": "userMessageContainer",
            "user_id": user?.uid || "1",
            "type": "text",
            "start": firstMessage
          }

        setMessageIndex((state: number) => state + 1)
        console.log("Sender Object created: ", userMessage)

        console.log("Updating the messageList..")
        setMessages(prevMessages => [...prevMessages, userMessage]);

        inputRef.current = "";

        sendPackage(userMessage)
          .then(() => console.log("Payload successfully sent.."))
          .catch(e => console.log("Error while try send the message", e))
          .finally(
            () => setTyping(false)
          )
      } else {
        console.log("0 input try again")
        const response = createMessageObject(
          "There was no input addet please try again :)",
          "text",
          messageIndex,
          user,
          "AI",
          "aiMessageContainer"
        );
        setMessages(prevMessages => [...prevMessages, response]);
        setTyping(false);
      }
    } else {
      // Ads in useEffect above will be showed
      setTyping(false);
    }
  }, [user, messageIndex, jwtToken]);

  useEffect(() => {
    if (history) {
     sendMessageProcess()
       .then(() => console.log("Finished History send Message Process.."))
       .catch(e => console.error("Error in Message sent Process", e))
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
                extraStyles={undefined}
                childrenMiddle={
                  <IconButton
                      icon="menu"
                      iconColor={customTheme.headerIconColors}
                      style={iconStyles.headerIcon}
                      onPress={() => updateModalIndex(2)}
                      size={30}
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

/*

  // Auth Provider
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

childrenRight={
                    <IconButton
                      icon="account-circle-outline"
                      iconColor={customTheme.headerIconColors}
                      style={iconStyles.headerIcon}
                      // @ts-ignore
                      onPress={() => navigation.navigate("AuthNavigator", {screen: authPressScreen})}
                      size={30}
                    />
                  }


 <ChatStack.Screen
          name={"AuthNavigator"}
          children={
            () =>
              <AuthContext.Provider
                value={{
                  password, setPassword,
                  email, setEmail,
                  error, setError,
                  modalVisible, setModalVisible,
                }}>
                <AuthNavigator />
              </AuthContext.Provider>
          }
          options={{
            headerShown: false
          }}
        />
 */