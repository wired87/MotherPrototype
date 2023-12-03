import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import DefaultHeader from "../../components/navigation/DefaultHeader";

// @ts-ignore
import {ChatMain} from "./ChatMain";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Platform, StyleSheet, Vibration} from "react-native";
import {AuthNavigator} from "../user/AuthNavigator";

// Context
import {InputContext, PrimaryContext, AuthContext, ThemeContext, FunctionContext} from "../Context";

// Ads
import {RewardedInterstitialAd, TestIds,} from 'react-native-google-mobile-ads';
import {checkUserMessageValue, getMessageInfoData, postMessageInfoData, showAds} from "./functions/AdLogic";
import {
  createMessageObject,
  sendObject
} from "./functions/SendProcess";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";

import {IconButton} from "react-native-paper";
import {Audio} from "expo-av";
import * as FileSystem from "expo-file-system";
import {getAuth} from "firebase/auth";

// Ad config
const adUnitIdFullScreenAd = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : Platform.OS === "ios"
    ? "ca-app-pub-2225753085204049/3142510997"
    : "ca-app-pub-2225753085204049/7842257619";

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitIdFullScreenAd, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

interface ChatNavigationTypes {
  dispatchHistorySent: (value: boolean) => void,
  bottomSheetRef: React.Ref<BottomSheetMethods>//(number: number) => void;
}

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////// INTERFACE
interface ExtraData {
  id: string;
  timeToken: string;
  publisher: string;
  class: string;
  file_id: string;
  user_id: string;
  soundAudio: any;
  type: string;
  duration: string;
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
  { bottomSheetRef, dispatchHistorySent }
) => {
  // Essentials
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Auth Provider
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();

  // Context //////////////////////////
  const {
    messagesLeft, setMessagesLeft,
    setInput, input,
    messageIndex,
    setTyping, typing,
    setMessages,
    setMessageIndex,userRecording,
  }  = useContext(InputContext);

  const { customTheme } = useContext(ThemeContext);
  const {user} = useContext(PrimaryContext);

  const inputRef = useRef(input);
  useEffect(() => {
    if (!(input === "" || input.trim().length === 0))
      inputRef.current = input;
  }, [input]);

  // @ts-ignore // SELECTORS ////////////////////////
  const screen = useSelector(state => state.screens.value)
  // @ts-ignore
  const historySent = useSelector(state => state.historySent.value)



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
      //setSeconds(20);
      console.log("USER ID:", user?.uid)
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
    textMessageStart()
    console.log("inputRef.current", inputRef.current)
    console.log("Input len:", inputRef.current.length)
    console.log("typing", typing)

    const success = await checkMessagesLeftProcess()

    if (success) {
      if (inputRef.current?.trim().length !== 0) {
        const userMessage = createMessageObject(
          inputRef.current,
          "text",
          messageIndex,
          user,
          "USER",
          "userMessageContainer"
        );

        inputRef.current = "";

        setMessageIndex((state: number) => state + 1)
        console.log("Sender Object created: ", userMessage)

        console.log("Updating the messageList..")
        setMessages(prevMessages => [...prevMessages, userMessage]);

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
  }, [])



  const historyMessageSent = async () => {
    setTyping(true);
    await sendMessageProcess()
      .then(() => console.log("Successfully ended function."))
      .catch((e: any) => console.log("Error while sending a message in historyMessageSent:", e))
      .finally(() => setTyping(false))
    }

  useEffect(() => {
    console.log("historySent-State changed to:", historySent)
    if (historySent) {
      historyMessageSent()
        .then(() => dispatchHistorySent(false))
        .catch(e => console.log("SUCCESS,", e))
    }
  }, [historySent]);

  useEffect(() => {
    console.log("Current Text:", input);

  }, [input]);


  return(
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
                childrenRight={
                  <IconButton
                    icon="account-circle-outline"
                    iconColor={customTheme.headerIconColors}
                    style={iconStyles.headerIcon}
                    // @ts-ignore
                    onPress={() => navigation.navigate("AuthNavigator", {screen: user? screen.account : screen.login})}
                    size={30}
                  />
                }
            />
          }}
        >
      <ChatStack.Screen
        name="ChatMain"
        children={
        () =>
          <FunctionContext.Provider
            value={{
              sendMessageProcess,
              checkMessagesLeftProcess,
            }}>
            <ChatMain />
          </FunctionContext.Provider>
        }
      />
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
    </ChatStack.Navigator>
  );
}

/*
  const sendProcess = useCallback(async(textMessage: boolean) => {
    const checkSuccess = await checkMessagesLeftProcess();
    console.log(
      "\nCurrent Messages:", messagesLeft
    )
    if (checkSuccess) {
      if (textMessage) {
        await sendMessageProcess();
      } else {
        await startRecording();
      }
    } else {
      setTyping(false);
      setCurrentRecording(false);
      console.log("initialize Ad");
      // display fullscreen ad here
      rewardedInterstitial.show()
        .then(
          async () => {
            await postMessageInfoData("3")
              .then(() => setMessagesLeft("3"));
            console.log("Message successfully sent")
          }).catch(
        (e: Error) =>  console.log("Ad could not be shown because an error:", e))
    }
  }, [])
  const sendMessageProcess = useCallback(async() => {
    //deleteInput();
    //const checkSuccess = await checkMessagesLeftProcess();
    //console.log(
    //  "\nCurrent Messages:", messagesLeft
    //)
    //if (checkSuccess) {
      //setTyping(true);
    console.log("inputRef.current", inputRef.current)
    console.log("Input len:", inputRef.current.length)
    console.log("typing", typing)
      // @ts-ignore
      if (inputRef.current?.trim().length !== 0) {

        const userMessage = createMessageObject(
          inputRef.current,
          "text",
          messageIndex,
          user,
          "USER",
          "userMessageContainer"
        );
        inputRef.current = "";

        setMessageIndex((state: number) => state + 1)
        console.log("Sender Object created: ", userMessage)

        console.log("Updating the messageList..")
        setMessages(prevMessages => [...prevMessages, userMessage]);

        sendPackage(userMessage)
          .then(() => console.log("Payload successfully sent.."))
          .catch(e => console.log("Error while try send the message", e))
          .finally(() => setTyping(false))

      } else {
        console.log("0 input try again") ///////////////////////////////////////////////////////////////////////////////
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
      console.log("initialize Ad")
      // logic for display fullscreen ad here
      rewardedInterstitial.show()
        .then(
          async () => {
            await postMessageInfoData("3")
              .then(() => setMessagesLeft("3"));
            console.log("Message successfully sent")
        }).catch(
          (e) =>  console.log("Ad could not be shown because an error:", e))
    }
}, [])












20 sec Timer ////////////////////////////////
  useEffect(() => {
    if (typing) {
      console.log("seconds: ", seconds)
      if (seconds === 0) {
        setMessageBreakOption(true);
      }
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, typing]);
////////////////////////////////////////////////////

  const checkMessagesLeftProcess = async () => {
    const valueMessages = await getMessageInfoData()
    console.log("Try to get the user Messages Left Value", valueMessages)
    if (!valueMessages) {
      await postMessageInfoData("3")
        .then(async () => {
          setMessagesLeft("3")
        })
    } else {
      setMessagesLeft(valueMessages)
    }
    return await checkUserMessageValue(valueMessages || "3", setMessagesLeft);
  }

<Menu
                    children={undefined}
                    visible={true}
                    anchor={
                      <Appbar.Action
                        icon="menu"
                        color={customTheme.headerIconColors}
                        onPress={() =>updateModalIndex}
                        size={30}
                      />
                    }
                  />
                      <Menu
                    anchor={
                      <Appbar.Action
                        icon="account-circle-outline"
                        color={customTheme.headerIconColors}
                        // @ts-ignore
                        onPress={() => navigation.navigate("AuthNavigator", {screen: user? screen.account : screen.login})}
                        size={30}
                      />
                    }
                    children={undefined}
                    visible={true}
                  />
 */