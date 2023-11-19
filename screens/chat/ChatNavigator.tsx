import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {DefaultHeader} from "../../components/navigation/DefaultHeader";
import {Appbar, Menu} from "react-native-paper";
import {ChatMenuModalContent} from "../../components/container/ChatMenuModalContainer/ChatMenuModalContent";
import {SwipeModal} from "../../components/modals/SwipeModal";


// @ts-ignore
import {ChatMain} from "./ChatMain";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {Platform} from "react-native";
import {HeaderView} from "../../components/container/headerContainer";
import {AuthNavigator} from "../user/AuthNavigator";

// Ads
import {RewardedAdEventType, RewardedInterstitialAd, TestIds,} from 'react-native-google-mobile-ads';
import {checkUserMessageValue, getMessageInfoData, postMessageInfoData, set} from "./functions/AdLogic";
import {createMessageObject, getCurrentTime, postMessageObject} from "./functions/SendProcess";

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
  const [streamMessage, setStreamMessage] = useState("");

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



  useEffect(() => {
    set(setMessagesLeft).then(() =>  console.log("HelloAds"))
  }, []);

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
              async () => {
                console.log("Full screen ad is showing right now..")
                await postMessageInfoData("5")
                  .then(() => setMessagesLeft("5"))
                  .catch(() => setMessagesLeft("5"))
              }
            )
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

  // GOOGLE MOBILE AD LOGIC
  useEffect(() => {
    console.log("Messages Left value changed:", messagesLeft)
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

  const deleteMessage = () => {
    setText(null)
  }

  const sendObject = async (senderObject: any) => {
    try {
      const response = await postMessageObject(senderObject, messageFinalBreak);
      console.log("Response", response)
      setMessageBreakOption(false); //////////////////////////////////////////////////////////////////////////////
      return createMessageObject(
        // @ts-ignore
        response.data.message,
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

  const sendPackage = async (userMessage: any) => {
    setStreamMessage("") /////////////////////////////////////////////////////////////////////////////
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

        setMessages( // @ts-ignore
          prevMessages => [...prevMessages, aiResponse] /////////////////////////////////////////////////////////////////////////////
        );
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
    const valueMessages = await getMessageInfoData()
    if (!valueMessages) {
      const valueMessages = await postMessageInfoData("5").then(async () => {
        await getMessageInfoData()
      })
    }
    // @ts-ignore
    const checkSuccess = await checkUserMessageValue(valueMessages, setMessagesLeft);

    console.log(
      "Current Messages:", valueMessages,
      "\nCurrent messages State value UPDATED:", messagesLeft
    )

    // @ts-ignore
    if (checkSuccess) {
      setTyping(true);
      // @ts-ignore
      if (text?.length !== 0) {
        console.log("User input:", text)
        console.log("typing", typing)
        const userMessage = createMessageObject(
          text,
          "text",
          messageIndex,
          user,
          "USER",
          "userMessageContainer"
        );

        messageIndex.current = messageIndex.current + 1;
        console.log("Sender Object created: ", userMessage)

        // @ts-ignore
        setMessages(prevMessages => [...prevMessages, userMessage]); /////////////////////////////////////////////////////////////////////////////
        deleteMessage()
        sendPackage(userMessage).then(() => console.log("Payload successfully sent.."))

      } else {
        console.log("0 input try again")
      }
    } else {
      console.log("initialize Ad")

      // logic for display fullscreen ad here
      rewardedInterstitial.show()
        .then(
          async () => {
            await postMessageInfoData("5").then(() => setMessagesLeft("5")); /////////////////////////////////////////////////////////////////////////////
            console.log("Message successfully sent")
        }).catch(
          (e) =>  console.log("Ad could not be shown because an error:", e))
    }
  }



////////////////



  const dispatchHistorySent = (value: boolean) => {
    dispatch({
      type: "HISTORY_SENT",
      payload: value
    })
    console.log("Dispatched History Text.")
  }

  const historyMessageSent = async () => {
    closeModal()
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
    console.log("Current Text:", text);
  }, [text]);


  /*
  ws wird heir benötigt:
  setText,
  dispatchHistorySent
  closeModal
  openModal
  visible
  modalVisible
   */

  useEffect(() => {
    if (typing) {
      console.log("seconds: ", seconds)
      if (seconds <= 0) {
        setMessageBreakOption(true);
      }
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, typing]);

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
              }
            />
          }}
        >
      <ChatStack.Screen  name="ChatMain">
        {(props) =>
          <ChatMain
            setMessageBreakOption={setMessageBreakOption}
            messageIndex={messageIndex}
            setMessages={setMessages}
            seconds={seconds}
            setSeconds={setSeconds}
            messages={messages}
            messageBreakOption={messageBreakOption}
            setMessageFinalBreak={setMessageFinalBreak}
            sendMessage={sendMessageProcess}
            {...props}
            input={text}
            setInput={setText}
          />
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

