import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import DefaultHeader from "../../components/navigation/DefaultHeader";

// @ts-ignore
import {ChatMain} from "./ChatMain";
import {useDispatch} from "react-redux";
import {useRoute} from "@react-navigation/native";
import {StyleSheet, Vibration} from "react-native";

// Context
import {InputContext, PrimaryContext, ThemeContext, FunctionContext} from "../Context";

// Ads
import {checkUserMessageValue, getMessageInfoData, postMessageInfoData, showAds} from "./functions/AdLogic";
import {
  createMessageObject, getCurrentTime,
  sendObject
} from "./functions/SendProcess";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";

import {IconButton} from "react-native-paper";
import {SwipeModal} from "../../components/modals/SwipeModal";
import ChatMenuModalContent from "../../components/container/ChatMenuModalContainer/ChatMenuModalContent";

interface ChatNavigationTypes {
  dispatchHistorySent: (value: boolean) => void,
  bottomSheetRef: React.Ref<BottomSheetMethods>//(number: number) => void;
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


//////////////////////////////////////////////////////////////////////////////////
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

export const ChatNavigation: React.FC<ChatNavigationTypes> = (
  { bottomSheetRef }
) => {
  // Essentials
  const dispatch = useDispatch();

  const route = useRoute();
  const [history, setHistory] = useState(false);

  // Context //////////////////////////
  const {
    messagesLeft, setMessagesLeft,
    setInput, input,
    messageIndex,
    setTyping, typing,
    setMessages,
    setMessageIndex,
  }  = useContext(InputContext);

  const { customTheme } = useContext(ThemeContext);
  const {user} = useContext(PrimaryContext);

  const inputRef = useRef(input);
  useEffect(() => {
    if (!(input === "" || input.trim().length === 0))
      inputRef.current = input;
  }, [input]);

  // GOOGLE MOBILE AD LOGIC ////////////////////
  useEffect(() => {
    console.log("Real Messages Left:", messagesLeft)
    showAds(dispatch, messagesLeft, setMessagesLeft)
      .then(() => console.log("Ads successfully showed. Refilled the Messages"));
  }, [messagesLeft]);


  const updateModalIndex = () => {
    // @ts-ignore
    bottomSheetRef?.current?.snapToIndex(2);
  }

  const sendPackage = async (userMessage: any) => {
    try {
      console.log("Sending Message Object...")
      const aiResponse = await sendObject(userMessage, messageIndex, user);
      setTyping(false);
      setMessageIndex((state: number) => state + 1)
      console.log("Final response Object: ", aiResponse);

      if (aiResponse === 1) {
        console.log('Something went wrong in one of the following functions: ' +
          '\n - "sendMessage", \n- "sendObject", \n- "postMessageObject"')
      } else {

        setMessages( // @ts-ignore
          prevMessages => [...prevMessages, aiResponse] /////////////////////////////////////////////////////////////////////////////
        );
      }
    } catch (error) {
      console.log("error while sending a message", error)
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

  useEffect(() => {
    console.log("routeName", route.name);
  }, []);

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
  }, [user, messageIndex, user]);

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
                      onPress={updateModalIndex}
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