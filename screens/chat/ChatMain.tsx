
import React, {useCallback, useEffect, useState} from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

import axios from "axios";
import {getAuth} from "firebase/auth";
import {chatStyles} from "./chatStyles";
import {SingleMessage} from "../../components/container/chat/SingleMessage";
import {useDispatch, useSelector} from "react-redux";
import {MessageInputContainer} from "../../components/container/MessageInputContainer";
import {SwipeModal} from "../../components/modals/SwipeModal";
import {StatusContainer} from "../../components/container/modalContainers/StatusContainer";
import {themeColors} from "../../colors/theme";
import {useSafeAreaInsets} from "react-native-safe-area-context";
//import {MessageList as PBMessageList,} from "@pubnub/react-native-chat-components";
import {imgStyles} from "../../components/images/imgStyles";

// @ts-ignore
import successAuth from "../../assets/images/successAuth.png";


export const ChatMain = (
  // @ts-ignore
  { seconds, input, setInput, typing, setMessageBreakOption,
    // @ts-ignore
    setSeconds, messages, messageBreakOption, setMessageFinalBreak, sendMessage }
) => {






  const [inputHeight, setInputHeight] = useState(54); // main input field
  const dispatch = useDispatch();
  const user = getAuth().currentUser;
  const [logoutModal, setLogoutModal] = useState(false);

  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)

  // @ts-ignore
  const icon = useSelector(state => state.icon.value)

  // @ts-ignore
  const logout = useSelector(state => state.logout.value);

  useEffect(() => {
    if (typing) {
      console.log("seconds: ", seconds)
      if (seconds <= 0) {
        setMessageBreakOption(true);
      }
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const dismissNewLogoutBox = useCallback(() => {
    dispatch({
      type: "LOGOUT",
      payload: false
    })
    console.log("newLogout: ", logout)
  }, []);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (logout) {
      console.log("seconds:", seconds, "\nnewLogout: ", logout)
      setLogoutModal(true)
      dispatch({
        type: "LOGOUT",
        payload: false
      })
    }
  }, [logout]);

  return(
    <>
      <SafeAreaView style={{ backgroundColor: darkmode.primary, flex: 1, paddingTop: insets.top }}>
        <KeyboardAvoidingView
          style={{ paddingTop: insets.top, backgroundColor: darkmode.primary , flex: 1,
            marginBottom: Platform.OS === "ios" ? 20 : 0, flexDirection: "column" }}>
          {/*+++++++++++++++++++++++++++++++++++++++++msgs*/}
          <View style={{bottom: 20,  flexDirection: "row", justifyContent:"center", alignItems: "center"}}>
            <MessageInputContainer
              valueInput={input}
              onChange={setInput}
              typing={typing}
              messageBreakOption={messageBreakOption}
              setMessageFinalBreak={setMessageFinalBreak}
              sendMessage={sendMessage}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {logout? (
        <SwipeModal
          animation={logoutModal}
          modalVisible={logoutModal}
          closeModal={dismissNewLogoutBox}
          Content={
            <StatusContainer
             source={successAuth}
             styles={imgStyles.statusImg}
             extraContainerStyles={undefined}
             text={"You are successfully Logged out"} />
          }
        />
      ):null}
    </>
  )
}

/*
<PBMessageList
            style={{
              messageOwnMain: { alignItems: "flex-end", backgroundColor: darkmode.primary },
              messageList: { backgroundColor: themeColors.primary }
            }}
          >
            {messages.map((item: { message: any; timetoken: any; }, index: React.Key | null | undefined) => (
              <SingleMessage
                key={index}
                // @ts-ignore
                text={item.message}
                item={item}
                styles={chatStyles}
                primaryTextStyles={{ textAlign: "justify" }}
                secondaryTextStyles={{ color: themeColors.borderThin, fontSize: 10 }}
                // @ts-ignore
                timeText={item.timetoken}
              />
            ))}
          </PBMessageList>



<FlatList
  style={{backgroundColor: darkmode.primary,
    width: windowWidth, marginTop: 30, marginBottom: 20, paddingVertical: 10, paddingHorizontal: 5,
    height: messages.length * 50}}
  data={messages}
  ref={flatListRef}
  renderItem={({item, index}) => {
    return (
dispatch({
      type: "UPDATE_MESSAGE",
      payload: input
    })
      );
    }}



    const deleteMessage = () => {
    setInput(null)
  }

  const getMessageObject = () => {
    return(
      {
        "id": messageIndex.current,
        "message": input,
        "timetoken": getCurrentTime(),
        "publisher": "USER",
        "class": "userMessageContainer",
        "user_id": user ? user.uid : "1",
      }
    );
  }


  const sendAction = async (senderObject: any) => {
    const response = await axios.post("http://192.168.178.51:8000/open/chat-request/", senderObject);
    console.log("response", response)
  }


  const sendMessage = async () => {
      setTyping(true);
      console.log("SenderInput:", input);
      // @ts-ignore
    if (input.length !== 0) {
      const userMessage = getMessageObject();
      messageIndex.current = messageIndex.current + 1;
      console.log("Sender Object created: ", userMessage)

      // @ts-ignore
      setMessages(prevMessages => [...prevMessages, userMessage]);
      deleteMessage()

      try {
        console.log("Sending Message Object...")
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
      } finally {
        console.log("Function end...")
      }
    } else {
        console.log("0 input try again")
    }
  };

  />
 */