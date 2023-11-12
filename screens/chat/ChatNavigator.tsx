import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {DefaultHeader} from "../../components/navigation/DefaultHeader";
import {Appbar, Menu} from "react-native-paper";
import {ChatMenuModalContent} from "../../components/container/ChatMenuModalContainer/ChatMenuModalContent";
import {SwipeModal} from "../../components/modals/SwipeModal";
import axios from "axios/index";


// @ts-ignore
import {ChatMain} from "./ChatMain";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {Platform} from "react-native";
import {HeaderView} from "../../components/container/headerContainer";
import {AuthNavigator} from "../user/AuthNavigator";

import * as SecureStore from 'expo-secure-store';

// Ads
import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitIdFullScreenAd = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : Platform.OS === "ios"
    ? "ca-app-pub-2225753085204049/3142510997"
    : "ca-app-pub-2225753085204049/7842257619";

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitIdFullScreenAd, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
/////////////////////////////////////////////////

export const ChatNavigation = () => {

  // State variables
  const [adLoaded, setAdLoaded] = useState(false);
  const [text, setText] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [typing, setTyping] = useState(false); // typing indicator
  const [messages, setMessages] = useState([]) // all Messages
  const messageIndex = useRef(0) // index for the messages
  const [seconds, setSeconds] = useState(12);
  const [messageBreakOption, setMessageBreakOption] = useState(false);
  const [messageFinalBreak, setMessageFinalBreak] = useState(false);
  const [messagesLeft, setMessagesLeft]= useState("5");

  // other Variables
  const ChatStack = createNativeStackNavigator();

  const dispatch = useDispatch()

  // @ts-ignore
  const user = useSelector(state => state.user.value)

  // @ts-ignore
  const screen = useSelector(state => state.screens.value)

  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)

  // @ts-ignore
  const historySent = useSelector(state => state.historySent.value)

  async function postMessageInfoData(value: string) {
    try {
      await SecureStore.setItemAsync("totalMessages", value);
      console.log('Saved Data successfull');
    } catch (e) {
      console.error('Error at save the Data:', e);
    }
  }

  async function getMessageInfoData() {
    try {
      console.log("Data request successful")
      return await SecureStore.getItemAsync("totalMessages")
    } catch (e) {
      console.error('Error at requesting the Data: ', e);
      return false;
    }
  }

  const checkUserMessageValue = async (value: string | null) => {
    if (value !== "0" || value !== null) {
      console.log("User has", value, "Messages left.")
      if (value === "1") {
        await postMessageInfoData("0").then(() => setMessagesLeft("0"))
      }else if (value === "2"){
        await postMessageInfoData("1").then(() => setMessagesLeft("1"))
      }else if (value === "3"){
        await postMessageInfoData("2").then(() => setMessagesLeft("2"))
      }else if (value === "4"){
        await postMessageInfoData("3").then(() => setMessagesLeft("3"))
      }else if (value === "5") {
        await postMessageInfoData("4").then(() => setMessagesLeft("4"))
      }
      return true;
    }else {
      postMessageInfoData("5").then(() => setMessagesLeft("5"))
      return false;
    }
  }

  // GOOGLE MOBILE AD LOGIC
  useEffect(() => {

    const showAds = async () => {
      if (messagesLeft === "0") {
        const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
          RewardedAdEventType.LOADED,
          () => {
            dispatch({
              type: "FULL_SCREEN_AD",
              payload: true
            });
            rewardedInterstitial.show()
              .then(
                () => {
                  console.log("YEAH ADS!!!")
                  postMessageInfoData("5").then(() => setMessagesLeft("5"))
                })
          },
        );
        const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            console.log('User earned reward of ', reward);
          },
        );

        // Start loading the rewarded interstitial ad straight away
        rewardedInterstitial.load();

        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };
      }
    }
    showAds().then(() => console.log("Ads successfully showed. Refilled the Messages"))
  }, [messagesLeft]);


  // @ts-ignore
  const openModal = useCallback(() => {
    setModalVisible(true);
    setVisible(true);
  });

  // @ts-ignore
  const closeModal = useCallback(() => {
    setModalVisible(false);
    setVisible(false);
  });

  const createMessageObject = () => {
    console.log("SenderInput:", text);
    return(
      {
        "id": messageIndex.current,
        "message": text,
        "timetoken": getCurrentTime(),
        "publisher": "USER",
        "class": "userMessageContainer",
        "user_id": user ? user.uid : "1",
      }
    );
  }

  const deleteMessage = () => {
    setText(null)
  }

  const getCurrentTime = () => {
    const timeNow = new Date();
    let timeHoursNow = timeNow.getHours();
    let timeMinutesNow = timeNow.getMinutes()
    if (timeHoursNow < 10)  {
      timeHoursNow = Number("0" + timeHoursNow)
    } else if (timeMinutesNow < 10){
      timeMinutesNow = Number("0" + timeMinutesNow)
    }
    return(timeHoursNow + ":" + timeMinutesNow);
  }

  const postMessageObject = async (senderObject: any) => {
    if (!messageFinalBreak) {
      try {
        return await axios.post("http://192.168.178.51:8000/open/chat-request/", senderObject);
      } catch(e) {
       console.log("Error in postMessageObject-function:", e)
        return e
      }
    } else {
      return {
        data: {
          message: "Im sorry i could not answering this Question. Please try it with another!"
        },
        status: 200,
      }
    }
  }

  const sendObject = async (senderObject: any) => {
    try {
      const response = await postMessageObject(senderObject);
      console.log("response", response)
      setMessageBreakOption(false);

      return ({
        "id": messageIndex.current,
        // @ts-ignore
        "message": response.data.message,
        "timetoken": getCurrentTime(),
        "publisher": "AI",
        "class": "aiMessageContainer",
      });
    } catch(e) {
      console.log('Error in "sendObject":', e)
      return 1;
    }
  }

  const sendPackage = async (userMessage: any) => {
    try {
      console.log("Sending Message Object...")
      const aiResponse = await sendObject(userMessage);
      setTyping(false);
      messageIndex.current = messageIndex.current + 1;
      console.log("Final response Object: ", aiResponse);
      if (aiResponse === 1) {
        console.log('Something went wrong in one of the following functions: ' +
          '\n - "sendMessage", \n- "sendObject", \n- "postMessageObject"')
      } else {
        // @ts-ignore
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }
    } catch (error) {
      console.log("error while sending a message", error)
    } finally {
      console.log("Function end...")
      setSeconds(12);
      console.log("USER ID:", user?.uid)
    }
  }

  const sendMessageProcess = async () => {
    const valueMessages = await getMessageInfoData()//.then(() => console.log("Function getMessageInfoData finished"))
    if (!valueMessages) {
      const valueMessages = await postMessageInfoData("5").then(async () => {
        await getMessageInfoData()
      })
    }

    console.log("Curent Messages:", valueMessages, "\nCurrent messages State value:", messagesLeft)
    // @ts-ignore
    const checkSuccess = await checkUserMessageValue(valueMessages)
    console.log("Curent Messages UPDATED:", valueMessages, "\nCurrent messages State value UPDATED:", messagesLeft)
    // @ts-ignore
    if (checkSuccess) {
      setTyping(true);
      // @ts-ignore
      if (text?.length !== 0) {
        console.log("User input:", text)
        const userMessage = createMessageObject();
        messageIndex.current = messageIndex.current + 1;
        console.log("Sender Object created: ", userMessage)
        // @ts-ignore
        setMessages(prevMessages => [...prevMessages, userMessage]);
        deleteMessage()
        sendPackage(userMessage).then(() => console.log(""))
      } else {
        console.log("0 input try again")
      }
    } else {
      console.log("initialize Ad")
      // logic for display fullscreen ad here
      rewardedInterstitial.show()
        .then(
          async () => {
            await postMessageInfoData("5").then(() => setMessagesLeft("5"));
            console.log("Message successfully sent")
        }).catch(
          (e) =>  console.log("Ad could not be shown because an error:", e))
    }
  }

  const dispatchHistorySent = (value: boolean) => {
    dispatch({
      type: "HISTORY_SENT",
      payload: value
    })
    console.log("Dispatched History Text.")
  }

  const historyMessageSent = async () => {
    closeModal()
    await sendMessageProcess()
      .then(() => console.log("Successfully ended function."))
      .catch((e: any) => console.log("Error while sending a message in historyMessageSent:", e))
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
    console.log("Current Text:", text);
  }, [text]);

  return(
    <ChatStack.Navigator
      initialRouteName="ChatMain"
      screenOptions={{
        // @ts-ignore
        header:
          (props: any) =>
            <DefaultHeader
              {...props}
              visible={true}
              extraStyles={undefined}
              statement={undefined}
              children={
                <>
                  <HeaderView children={undefined} extraStyles={undefined} />
                  <HeaderView
                    extraStyles={{justifyContent: "center", alignItems: "center", left: 3}}
                    children={
                      <Menu
                        anchor={
                          <Appbar.Action
                            icon="menu"
                            color={darkmode.headerIconColors}
                            onPress={openModal}
                            size={30}
                          />
                        }
                        children={undefined}
                        visible={visible}
                      />
                    }
                  />
                  <HeaderView
                    extraStyles={{justifyContent: "flex-end", alignItems: "flex-end"}}
                    children={
                      <Menu
                        anchor={
                          <Appbar.Action
                            icon="account-circle-outline"
                            color={darkmode.headerIconColors}
                            // @ts-ignore
                            onPress={() => navigation.navigate( "AuthNavigator", {screen: user? screen.account : screen.login})}
                            size={30}
                          />
                        }
                        children={undefined}
                        visible={visible}
                      />
                    }
                  />
                  <SwipeModal
                    animation={true}
                    modalVisible={modalVisible}
                    closeModal={closeModal}
                    Content={
                      <ChatMenuModalContent
                        changeText={setText}
                        dispatchHistorySent={dispatchHistorySent}
                        extraAction={closeModal}
                      />
                    }
                  />
                </>
              }/>
            }}>
      <ChatStack.Screen  name="ChatMain">
        {(props) =>
          <ChatMain
            seconds={seconds}
            typing={typing}
            setMessageBreakOption={setMessageBreakOption}
            setSeconds={setSeconds}
            messages={messages}
            messageBreakOption={messageBreakOption}
            setMessageFinalBreak={setMessageFinalBreak}
            sendMessage={sendMessageProcess}
            {...props}
            input={text}
            setInput={setText} />
        }
      </ChatStack.Screen>
      <ChatStack.Screen
          name={"AuthNavigator"}
          component={AuthNavigator}
          options={{
              headerShown: false
          }}
      />
    </ChatStack.Navigator>
    );
}


/*

const sendMessageProcess = async () => {
    const valueMessages = await getMessageInfoData().then( async () => {
      // @ts-ignore
      const checkSuccess = await checkUserMessageValue(valueMessages).then( async () => {
        // @ts-ignore
        if (checkSuccess) {
          setTyping(true);
          // @ts-ignore
          if (text?.length !== 0) {
            console.log("User input:", text)
            const userMessage = createMessageObject();
            messageIndex.current = messageIndex.current + 1;
            console.log("Sender Object created: ", userMessage)
            // @ts-ignore
            setMessages(prevMessages => [...prevMessages, userMessage]);
            deleteMessage()
            sendPackage(userMessage).then(() => console.log(""))
          } else {
            console.log("0 input try again")
          }
        } else {
          console.log("initialize Ad")
          // logic here
        }
      }).catch((e) => {
        console.log("Success === false in sendMessage, checkMessage -> Error detected in sendMessage: ", e)
      })}
    )}




how handle history-Text click?
- define const text and send in ChatScreens
- if user clicks on a text we setText to the text the user has clicked on and setSend to true
- also set up in useEffect in "ChatMain" a if statement "if send: run the function to send text.
- after thaA    t set terxt to "" and send to false
 */


