import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
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

// Context
import {InputContext, PrimaryContext, AuthContext} from "../Context";


// Ads
import {RewardedInterstitialAd, TestIds,} from 'react-native-google-mobile-ads';
import {checkUserMessageValue, getMessageInfoData, postMessageInfoData, showAds} from "./functions/AdLogic";
import {createMessageObject, getCurrentTime, postMessageObject} from "./functions/SendProcess";
import {DefaultText} from "../../components/text/DefaultText";

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

export const ChatNavigation = (
  // @ts-ignore
  { updateModalIndex, dispatchHistorySent }
) => {
  // Essentials
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [seconds, setSeconds] = useState(20);

  const [messageFinalBreak, setMessageFinalBreak] = useState(false);
  const [visible, setVisible] = useState(true);

  // Auth Provider
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Context
  const {
    messagesLeft, setMessagesLeft,
    setMessageBreakOption,
    setInput, input,
    messageIndex,
    setTyping, typing,
    messages, setMessages,
    setMessageIndex }  = useContext(InputContext);

  const {user} = useContext(PrimaryContext);

  // other Variables
  const ChatStack = createNativeStackNavigator();

  // @ts-ignore
  const screen = useSelector(state => state.screens.value)

  // @ts-ignore
  const historySent = useSelector(state => state.historySent.value)

  // @ts-ignore colors
  const colors = useSelector(state => state.colors.value)

  // GOOGLE MOBILE AD LOGIC
  useEffect(() => {
    console.log("Real Messages Left:", messagesLeft)
    showAds(dispatch, messagesLeft, setMessagesLeft).then(() => console.log("Ads successfully showed. Refilled the Messages"))
  }, [messagesLeft]);

  useEffect(() => {
    showAds(dispatch, messagesLeft, setMessagesLeft).then(() => console.log("check for messages left.."))
  }, []);

  const deleteMessage = () => {
    setInput("");
  }

  const sendObject = async (senderObject: any) => {
    try {
      const res = await postMessageObject(senderObject, {timeout: 20000});
      console.log("res", res);
      let response;
      // @ts-ignore
      if (res instanceof Error && res.name === "AbortError") {
        response = {
           message: "Ups that request is taking too much time." +
           "\nIf that issue is coming up again feel free to contact the support to fix it.",
           status: 200,
          }
      } else {
        // @ts-ignore
        response = await res.json();
      }
      console.log("Response", response);
      setMessageBreakOption(false);
      return createMessageObject(
        // @ts-ignore
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
      console.log("Function end...")
      setSeconds(12);
      console.log("USER ID:", user?.uid)
    }
  }


  const sendMessageProcess = useCallback(async() => {
    const valueMessages = await getMessageInfoData()
    console.log("Try to get the user Messages Left Value", valueMessages)
    if (!valueMessages) {
      await postMessageInfoData("5").then(async () => {
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

    // @ts-ignore
    if (checkSuccess) {
      setTyping(true);
      // @ts-ignore
      if (input?.length !== 0) {
        console.log("User input:", input)
        console.log("typing", typing)
        const userMessage = createMessageObject(
          input,
          "text",
          messageIndex,
          user,
          "USER",
          "userMessageContainer"
        );

        setMessageIndex((state: number) => state +1)
        console.log("Sender Object created: ", userMessage)

        // @ts-ignore
        setMessages(prevMessages => [...prevMessages, userMessage]);
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
                            color={colors.headerIconColors}
                            onPress={() => updateModalIndex(3)}
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
                            color={colors.headerIconColors}
                            // @ts-ignore
                            onPress={() => navigation.navigate("AuthNavigator", {screen: user? screen.account : screen.login})}
                            size={30}
                          />
                        }
                        children={undefined}
                        visible={visible}
                      />
                    }
                  />
                </>
              }
            />
          }}
        >
      <ChatStack.Screen
        name="ChatMain"
         children={
           () =>
            <ChatMain
              sendMessageProcess={sendMessageProcess}/>
            }
        />
      <ChatStack.Screen
          name={"AuthNavigator"}
          children={
            () =>
              <AuthContext.Provider value={{password, setPassword, email, setEmail, error, setError, modalVisible, setModalVisible}}>
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

// Axios cancel request process (does not work)
/*
/////////////////////////////////
  const [controller, setController] = useState<AbortController | null>(null)
  const [signal, setSignal] = useState<AbortSignal | null>(null);

  useEffect(() => {
    const newController = new AbortController()
    const signal = newController.signal
    setSignal(signal);
    setController(newController);
    console.log("New controller created", newController)
  }, [messageBreakOption]);


  useEffect(() => {
    console.log("Controller main", controller)
  }, []);

  const breakRequest = useCallback(()=> {
    if (controller) {
      controller.abort();
      console.log("Message break in action..")
    }
  }, [controller])
  for MessageInputContainer:
  {messageBreakOption ? (
          <View style={{width: windowWidth * .5, justifyContent: "center", alignItems: "center"}}>
            <BreakButton
              extraStyles={{justifyContent: "center", alignItems: "center"}}
              onPress={() => {
                console.log("Break message request initialized..")
                breakRequest()
              }}
            />
          </View>
        ) : null}
  //////////////////////////////////////////////////
*/