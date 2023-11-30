import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import DefaultHeader from "../../components/navigation/DefaultHeader";

// @ts-ignore
import {ChatMain} from "./ChatMain";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {Platform, StyleSheet} from "react-native";
import {AuthNavigator} from "../user/AuthNavigator";

// Context
import {InputContext, PrimaryContext, AuthContext, ThemeContext, FunctionContext} from "../Context";

// Ads
import {RewardedInterstitialAd, TestIds,} from 'react-native-google-mobile-ads';
import {checkUserMessageValue, getMessageInfoData, postMessageInfoData, showAds} from "./functions/AdLogic";
import {createMessageObject, postMessageObject} from "./functions/SendProcess";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";

import {IconButton} from "react-native-paper";

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

  const [messageFinalBreak, setMessageFinalBreak] = useState(false);

  // Auth Provider
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Context //////////////////////////
  const {
    messagesLeft, setMessagesLeft,
    setMessageBreakOption,
    setInput, input,
    messageIndex,
    setTyping, typing,
    setMessages,
    setMessageIndex
  }  = useContext(InputContext);
  const { customTheme } = useContext(ThemeContext);
  const {user} = useContext(PrimaryContext);

  const inputRef = useRef(input);
  useEffect(() => {
    inputRef.current = input;
  }, [input]);


  // SELECTORS ////////////////////////
  // @ts-ignore
  const screen = useSelector(state => state.screens.value)
  // @ts-ignore
  const historySent = useSelector(state => state.historySent.value)


  // GOOGLE MOBILE AD LOGIC ////////////////////
  useEffect(() => {
    console.log("Real Messages Left:", messagesLeft)
    showAds(dispatch, messagesLeft, setMessagesLeft).then(() => console.log("Ads successfully showed. Refilled the Messages"));
  }, [messagesLeft]);

  useEffect(() => {
    showAds(dispatch, messagesLeft, setMessagesLeft).then(() => console.log("check for messages left.."));
  }, []);


  const deleteInput = () => setInput("");


  const updateModalIndex = () => {
    // @ts-ignore
    bottomSheetRef.current?.snapToIndex(2);
  }

  const sendObject = async (senderObject: any) => {
    try {
      const res = await postMessageObject(
        senderObject,
        {
                  timeout: 20000
                }
              );

      console.log("res", res);

      let response;
      if (res instanceof Error || res.name ) {
        console.log("sendObject res === error")
        response = {
           message: "Ups that request is taking too much time." +
           "\nIf that issue is coming up again feel free to contact the support to fix it.",
           status: 200,
          }
      } else {
        response = await res.json();
        console.log("sendObject res ===", response)
      }

      console.log("Response", response);
      setMessageBreakOption(false);

      return createMessageObject(
        response.message,
        "text",
        messageIndex,
        user,
        "AI",
        "aiMessageContainer",
      )

    } catch(e) {
      console.log('Error in "sendObject":', e)
      return 1;
    }
  }

  useEffect(() => {
    console.log("finalBreak changed", messageFinalBreak);
  }, [messageFinalBreak]);

  const sendPackage = async (userMessage: any) => {
    try {
      console.log("Sending Message Object...")
      const aiResponse = await sendObject(userMessage);
      setTyping(false);
      setMessageIndex((state: number) => state +1)
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

  const sendMessageProcess = useCallback(async() => {
    // check here for the user messages left
    const valueMessages = await getMessageInfoData()
    console.log("Try to get the user Messages Left Value", valueMessages)
    if (!valueMessages) {
      await postMessageInfoData("5")
        .then(async () => {
          const message = await getMessageInfoData()
          setMessagesLeft("5")
      })
    } else {
      setMessagesLeft(valueMessages)
    }
    // @ts-ignore
    const checkSuccess = await checkUserMessageValue(valueMessages, setMessagesLeft);
    console.log(
      "\nCurrent Messages:", messagesLeft
    )
    if (checkSuccess) {
      setTyping(true);
      console.log("input len", inputRef.current.length)
      // @ts-ignore
      if (inputRef.current?.trim().length !== 0) {

        console.log("User input:", inputRef.current)
        console.log("typing", typing)

        const userMessage = createMessageObject(
          inputRef.current,
          "text",
          messageIndex,
          user,
          "USER",
          "userMessageContainer"
        );

        setMessageIndex((state: number) => state + 1)
        console.log("Sender Object created: ", userMessage)

        console.log("Updating the messageList..")
        setMessages(prevMessages => [...prevMessages, userMessage]);

        deleteInput()

        sendPackage(userMessage)
          .then(() => console.log("Payload successfully sent.."))
          .catch(e => console.log("Error while try send the message", e))
          .finally(() => setTyping(false))

      } else {
        console.log("0 input try again")
      }

    } else {
      console.log("initialize Ad")
      // logic for display fullscreen ad here
      rewardedInterstitial.show()
        .then(
          async () => {
            await postMessageInfoData("5")
              .then(() => setMessagesLeft("5"));
            console.log("Message successfully sent")
        }).catch(
          (e) =>  console.log("Ad could not be shown because an error:", e))
    }
  }, [])


  const historyMessageSent = async () => {
    setTyping(true);
    await sendMessageProcess()
      .then(() => console.log("Successfully ended function."))
      .catch((e: any) => console.log("Error while sending a message in historyMessageSent:", e))
      .finally(() => setTyping(false))
    }

  // -> setText + setHistory: true -> useEffect if changes call function history message sent
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


  // "AuthNavigator" user? screen.account : screen.login

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
          <FunctionContext.Provider value={{sendMessageProcess}}>
            <ChatMain />
          </FunctionContext.Provider>
        }/>
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