import {DefaultContainer} from "./DefaultContainer";
import {TextInput, View, Vibration, Pressable, ActivityIndicator} from "react-native";
import {styles} from "./contiStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useCallback, useContext, useMemo, useState} from "react";
import { useDispatch } from "react-redux";
import { TypeIndicator } from "../animations/TypeIndicator";

const audioApiEndpoint = //__DEV__? "http://192.168.178.51:8080/open/chat-request/" :
  "http://wired87.pythonanywhere.com/open/chat-request/"

import * as FileSystem from 'expo-file-system';
import {createMessageObject, getCurrentTime} from "../../screens/chat/functions/SendProcess";
import {showAds} from "../../screens/chat/functions/AdLogic";
import {FunctionContext, InputContext, PrimaryContext, ThemeContext} from "../../screens/Context";
import TranscribeButton from "../buttons/TranscribeButton";


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

// STRINGS
const errorMessageText = "Sorry i could not listening to you text message. " +
    "\nIf that error comes not alone please contact the support"

export const MessageInputContainer = (
) => {

  const {darkmode, user, jwtToken} = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);
  const [error, setError] = useState<string>("");

  const {
    messageIndex, setMessages, messages,
    input, setInput, messagesLeft,
    setMessagesLeft, setMessageIndex,
    typing, setTyping, currentRecording, setCurrentRecording,
    userRecording, setUserRecording} = useContext(InputContext);

  const { sendMessageProcess, checkMessagesLeftProcess } = useContext(FunctionContext);
  const recordingButtonStyles = {margin: 10}
  const extraSendStyles = [{color: customTheme.headerIconColors}, styles.sendIcon]
  const dispatch = useDispatch();


  const updateMessages = (data: ExtraData | null | aiResponseType) => {
    setMessages((prevMessages: any) => [...prevMessages, data]);
    setMessageIndex((state: number) => state + 1);
  }

  const sendRecording = useCallback(async( extraData: ExtraData | null, uri: string | null | undefined ) => {
    const success = await checkMessagesLeftProcess()
    if (!success) console.log("0 Messages Left. Ads initialized");

    const {soundAudio, ...extraDataWithoutSound} = extraData as ExtraData ;
    console.log("extraData:", extraData)

    const currentTime = getCurrentTime()
    console.log("current Time:", currentTime);

    try {
      return await FileSystem.uploadAsync(
        audioApiEndpoint,
        uri || "",
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwtToken?.access}`,

          },
          httpMethod: 'POST',
          mimeType: 'audio/m4a',
          parameters: extraDataWithoutSound,
          sessionType: undefined,
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "file",
        }
      )
    }catch(e:unknown) {
      if (e instanceof Error) {
        console.log("Error wile sending a message occurred", e);
      }
    }
    return null
  }, []);


  const createAiResponse = useCallback((responseMessage: string) => {
    const aiResponse: aiResponseType | ExtraData | null = createMessageObject(
      responseMessage,
      "text",
      messageIndex,
      user,
      "AI",
      "aiMessageContainer",
    )
    updateMessages(aiResponse)
  }, [messages, messageIndex])


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

    if (input?.trim().length > 0) {
      return(
        <>
          <Pressable
            onPress={() => setInput("")}
            style={styles.clearInputFiledBtn}>
            <MaterialCommunityIcons color={"black"} name={"close"} size={17}/>
          </Pressable>
          <MaterialCommunityIcons
            name={"atlassian"}
            size={25}
            onPress={send}
            style={extraSendStyles}
          />
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


