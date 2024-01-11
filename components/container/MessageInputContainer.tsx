import {DefaultContainer} from "./DefaultContainer";
import {TextInput, View, Vibration, Pressable, ActivityIndicator} from "react-native";
import {styles} from "./contiStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useCallback, useContext, useMemo, useState} from "react";
import { useDispatch } from "react-redux";
import { TypeIndicator } from "../animations/TypeIndicator";

import {showAds} from "../../screens/chat/functions/AdLogic";
import {FunctionContext, InputContext, PrimaryContext, ThemeContext} from "../../screens/Context";
import TranscribeButton from "../buttons/TranscribeButton";
import {IconButton} from "react-native-paper";
import ClearButton from "../buttons/ClearButton";


interface ExtraData {
  id: string;
  timeToken: string;
  publisher: string;
  class: string;
  file_id: string;
  user_id: string;
  soundAudio: any; // oder ersetzen Sie `any` durch den passenden Typ, falls bekannt
  type: string,
  start: string,
  duration: string;
}

interface aiResponseType {
  id: string | number,
  message: string,
  timeToken: string,
  publisher: string,
  class: string,
  user_id: string,
  type: string
}

export const MessageInputContainer = (
) => {

  const {darkmode, user, jwtToken} = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);
  const [error, setError] = useState<string>("");

  const {
    messages,
    input, setInput, messagesLeft,
    setMessagesLeft,
    typing,
    } = useContext(InputContext);

  const { sendMessageProcess } = useContext(FunctionContext);
  const recordingButtonStyles = {margin: 10}
  const dispatch = useDispatch();



  const send = useCallback(async () => {
    console.log("real messages", messages)
    if (!typing && input?.length >= 1 && input.trim().length > 0 && messagesLeft !== "0") {
      Vibration.vibrate()
      await sendMessageProcess()
    } else if (messagesLeft === "0") {
      console.log("User clicked the send btn while messages === 0 -> Ads initialized..")
      await showAds(dispatch, messagesLeft, setMessagesLeft)
    } else {
      console.log("Already Sent Message, length === 0 or just whitespace")
    }
  }, [messagesLeft, typing, input, messages]);


  const typeIndicator = useMemo(() => {
    if (typing) {
      return <View style={styles.indicatorContainer}>
              <TypeIndicator/>
              <ActivityIndicator size={"small"} color={customTheme.text}/>
            </View>
    }
  },[typing]);


  const sendButton = useMemo(() => {
    const extraSendStyles = styles.sendIcon;
    if (input?.trim().length > 0) {
      return(
        <>

          <IconButton
            onPress={send}
            style={extraSendStyles}
            iconColor={customTheme.headerIconColors}
           icon={"atlassian"}/>
        </>
      )
    }else {
      return(
        <TranscribeButton
          buttonIcon={"microphone-outline"}
          setTranscript={setInput}
          setError={setError}
          buttonStyles={recordingButtonStyles}
          transcript={input}
        />
      )}
  }, [input, error, darkmode]);

  return (
    <DefaultContainer
      extraStyles={styles.main}>
      <View style={styles.secondContainer}>
        {typeIndicator}
      </View>

      <ClearButton setValue={setInput} value={input} />

      <View style={styles.inputContainer}>
        <TextInput style={[styles.chatMessageInput,
          {
            color: customTheme.text,
            borderColor: customTheme.text,
          }
          ]}
           maxLength={2000}
           placeholder={"Ask something!"}
           placeholderTextColor={customTheme.text}
           cursorColor={customTheme.placeholder}
           value={input}
           onChangeText={setInput}
           multiline={true}
        />

        <View style={[styles.container, {borderColor: customTheme.borderColor}]}>
          {sendButton}
        </View>

      </View>
    </DefaultContainer>
  );
}


