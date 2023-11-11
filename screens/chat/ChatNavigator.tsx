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
import { Dimensions } from "react-native";
import {HeaderView} from "../../components/container/headerContainer";
import {AuthNavigator} from "../user/AuthNavigator";

const windowWidth = Dimensions.get('window').width;


export const ChatNavigation = () => {
  // State variables
  const [text, setText] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [animation, setAnimation] = React.useState(false);
  const navigation = useNavigation();
  const [typing, setTyping] = useState(false); // typing indicator
  const [messages, setMessages] = useState([]) // all Messages
  const messageIndex = useRef(0) // index for the messages
  const [seconds, setSeconds] = useState(12);
  const [messageBreakOption, setMessageBreakOption] = useState(false);
  const [messageFinalBreak, setMessageFinalBreak] = useState(false)

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

  // @ts-ignore
  const openModal = useCallback(() => {
      setModalVisible(true);
      setAnimation(true);
      setVisible(true);
  });

  // @ts-ignore
  const closeModal = useCallback(() => {
      setModalVisible(false);
      setAnimation(false);
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

  const sendMessage = async () => {
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
    } else {
      console.log("0 input try again")
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
    await sendMessage()
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
            sendMessage={sendMessage}
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
how handle history-Text click?
- define const text and send in ChatScreens
- if user clicks on a text we setText to the text the user has clicked on and setSend to true
- also set up in useEffect in "ChatMain" a if statement "if send: run the function to send text.
- after thaA    t set terxt to "" and send to false
 */


