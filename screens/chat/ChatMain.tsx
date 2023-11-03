
import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import {MessageInput, MessageList,} from "@pubnub/react-native-chat-components";
import axios from "axios";
import {IconButton} from "react-native-paper";

import {DefaultText} from "../../components/text/DefaultText";
import {getAuth} from "firebase/auth";
import { TypeIndicator } from "../../components/animations/TypeIndicator";
import {chatStyles} from "./chatStyles";
import {SingleMessage} from "../../components/container/chat/SingleMessage";
import {useDispatch, useSelector} from "react-redux";
import {MessageInputContainer} from "../../components/container/MessageInputContainer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {SwipeModal} from "../../components/modals/SwipeModal";
import {SuccessfullyLoggedOut} from "../../components/container/modalContainers/successfullyLoggedOut";


const white = "rgb(255, 255, 255)";
const black = "rgb(0, 0, 0)";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ChatMain = (
  // @ts-ignore
  {send, setSendHistoryMessage, text, setText, setSend }
) => {
  const [inputHeight, setInputHeight] = useState(54); // main input field

  const [typing, setTyping] = useState(false); // typing indicator
  const [messages, setMessages] = useState([]) // all Messages
  const messageIndex = useRef(0) // index for the messages

  const dispatch = useDispatch();
  const user = getAuth().currentUser;

  // @ts-ignore
  const newLogout = useSelector(state => state.newLogout.value)
  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)
  // @ts-ignore
  const icon = useSelector(state => state.icon.value)

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
  const sendMessage = useCallback(async () => {
      setTyping(true);
      console.log("text:", text);
      const message = text;
      if (message.length !== 0) {
          const userMessage = {
              "id": messageIndex.current,
              "message": message,
              "timetoken": getCurrentTime(),
              "publisher": "USER",
              "class": "userMessageContainer",
              "user_id": user ? user.uid : "1",
          };
          messageIndex.current = messageIndex.current + 1;
          // @ts-ignore
          setMessages(prevMessages => [...prevMessages, userMessage]);
          try {
              const response = await axios.post("http://192.168.178.51:8000/open/chat-request/", userMessage);
              console.log("response", response)
              setTyping(false);
              const aiResponse = {
                  "id": messageIndex.current,
                  "message": response.data.message,
                  "timetoken": getCurrentTime(),
                  "publisher": "AI",
                  "class": "aiMessageContainer",
              };
              messageIndex.current = messageIndex.current + 1;
              console.log("aiResponse:", aiResponse);
              // @ts-ignore
              setMessages(prevMessages => [...prevMessages, aiResponse]);
          } catch (error) {
              console.log("error while sending a message", error)
          }
      } else {
          console.log("0 input try again")
      }
  }, [text, user]);

  // @ts-ignore
  const setSendDifferent = useCallback(() => {setSend(!send)});
  // @ts-ignore
  const loading = useSelector(state => state.loading.value)

  useEffect(() => {
      console.log(darkmode.primary, darkmode.secondary, darkmode.navigatorColor)
      if (send) {
          sendMessage().then(r => {console.log("successfully send a HISTORY message")});
          setText("");
          setSendHistoryMessage(false);
          setSend(false);
      }
  })

  const dismissNewLogoutBox = useCallback(() => {
    dispatch({
      type: 'NEW_LOGOUT',
      payload: false
    })
    console.log("newLogout: ", newLogout)
  }, []);

  return(
    <>
      <SafeAreaView style={{ backgroundColor: darkmode.primary, flex: 1 }}>
        <KeyboardAvoidingView
          style={{ backgroundColor: darkmode.primary , flex: 1, marginBottom: Platform.OS === "ios" ? 20 : 0  }}
        >
          <FlatList
            style={{backgroundColor: darkmode.primary,}}
            data={messages}
            renderItem={({item, index}) => {
              return (
                <SingleMessage
                  key={index}
                  // @ts-ignore
                  text={item.message}
                  item={item}
                  styles={chatStyles}
                  primaryTextStyles={undefined}
                  secondaryTextStyles={undefined}
                  // @ts-ignore
                  timeText={item.timetoken}/>
              );
            }} />
          {typing ? (
            <View style={{ justifyContent: "flex-start",
                alignItems: "flex-start", width: windowWidth, paddingLeft: 40 }}>
                <TypeIndicator />
            </View>
          ) : null}

          <View style={{bottom: 20,  flexDirection: "row", justifyContent:"center", alignItems: "center",
          }}>
            <MessageInputContainer />
            <MaterialCommunityIcons name={"atlassian"} size={25} style={{ color:darkmode.headerIconColors,
              transform: [{ rotate: '90deg'}]}} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {newLogout? (
        <SwipeModal
          animation={newLogout}
          modalVisible={newLogout}
          closeModal={dismissNewLogoutBox}
          Content={
            <SuccessfullyLoggedOut />
          }
        />
      ):null}
    </>
  )
}

/*
 // extraActionsRenderer={} extra stuff  to render in the msg bar -> later file + audio btn
 <MessageInput  sendButton={<IconButton icon={"send-outline"} iconColor={darkmode.headerIconColors} size={24}// @ts-ignore
                                      color={"#252427"} onPress={setSendDifferent}/>}/>
              maxLength={1000}
              id={"mainInput"}
              // @ts-ignore
              contentContainerStyle={{ backgroundColor: darkmode.primary, alignItems: 'flex-end', justifyContent: "center" }}
              senderInfo={false}
              typingIndicator={false} // if user or ai is typing you see al little typingIndicator
              onChange={(value: any) => setText(value)}
              value={text}
 <MessageList
              enableReactions={true}>
                {messages.map((item, index) => {
                  return(
                    <SingleMessage
                      key={index}
                      // @ts-ignore
                      text={item.message}
                      item={item}
                      styles={chatStyles}
                      primaryTextStyles={undefined}
                      secondaryTextStyles={undefined}
                      // @ts-ignore
                      timeText={item.timetoken} />
                  );
                })}
            </MessageList>
 */