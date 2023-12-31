import {DefaultContainer} from "./DefaultContainer";
import {TextInput, View, Vibration, Pressable, ActivityIndicator} from "react-native";
import {styles} from "./contiStyles";
import {IconButton} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useCallback, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { TypeIndicator } from "../animations/TypeIndicator";

const audioApiEndpoint = //__DEV__? "http://192.168.178.51:8080/open/chat-request/" :
  "http://wired87.pythonanywhere.com/open/chat-request/"

import * as FileSystem from 'expo-file-system';
import getDurationFormatted, {createMessageObject, getCurrentTime} from "../../screens/chat/functions/SendProcess";
import {showAds} from "../../screens/chat/functions/AdLogic";
import {FunctionContext, InputContext, PrimaryContext, ThemeContext} from "../../screens/Context";
import {startRecording, stopRecordingProcess} from "../../screens/chat/functions/recordingLogic";


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

  const {darkmode, user} = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);

  const {
    messageIndex, setMessages, messages,
    input, setInput, messagesLeft,
    setMessagesLeft, setMessageIndex,
    typing, setTyping, currentRecording, setCurrentRecording,
    userRecording, setUserRecording} = useContext(InputContext);

  const { sendMessageProcess, checkMessagesLeftProcess } = useContext(FunctionContext);
  const extraSendStyles = [{color: customTheme.headerIconColors}, styles.sendIcon]
  const dispatch = useDispatch();


  const createFileData = useCallback(async(uri: string | null | undefined) => {
    try {
      if (typeof uri === "string") {
        const fileInfo: FileSystem.FileInfo | null = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) throw new Error("Audio file does not exist");
      }

      const user_id= user?.uid || "1";
      const fileName = `recording-${Date.now()}.m4a`;
      console.log("fileName:", fileName);

      const firstMessage = messageIndex == 0;

      if (userRecording) {
        const {sound, status} = await userRecording.createNewLoadedSoundAsync();
        return {
          "id": messageIndex.toString(),
          "timeToken": getCurrentTime().toString(),
          "publisher": "USER",
          "class": "voiceMessage",
          "file_id": fileName,
          "user_id": user_id,
          "soundAudio": sound || null,
          "type": "speech",
          "start": firstMessage.toString(),
          "duration": getDurationFormatted(status.isLoaded ? status.durationMillis : null),
        }
      }
    }catch(e: unknown) {
      if (e instanceof Error) {
        console.log("Error in createFileData occurred", e)
      }
    }
    return null
  }, [user, messageIndex, userRecording])



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


  const stopRecording = useCallback(async() => {
    setCurrentRecording(false);
    setTyping(true);
    try {
      const uri: string | null | undefined = await stopRecordingProcess(userRecording);
      console.log('Recording stopped and stored at', uri);

      const extraData: ExtraData | null = await createFileData(uri);
      updateMessages(extraData);
      setUserRecording(undefined);
      const response = await sendRecording(extraData, uri);
      createAiResponse( JSON.parse(response?.body || "").message );

    }catch(e:unknown) {
      if (e instanceof Error) {
        console.log("Error in stopRecording occurred", e);
      }
      createAiResponse(errorMessageText);
    }finally {
      setTyping(false);
    }
  }, [userRecording, messageIndex]);



  ////////////////////// ////////////////////// //////////////////////
  //////////////////////    SEND PROCESSES
  const recording = useCallback(async () => {
    if(messagesLeft === "0") {
      await showAds(dispatch, messagesLeft, setMessagesLeft)
    } else if (userRecording){
      Vibration.vibrate();
      setCurrentRecording(false);
      console.log('Stop recording..');
      await stopRecording()
    } else if(!userRecording) {
      Vibration.vibrate();
      setCurrentRecording(true);
      console.log('Start recording..');
      await startRecording({ setUserRecording });
    }
  }, [userRecording, currentRecording])


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

  return (
    <DefaultContainer
      extraStyles={styles.main}>
      <View style={styles.secondContainer}>
        {typeIndicator}
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={[styles.chatMessageInput,
          {
            color: "black",
            backgroundColor:  customTheme.navigatorColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: darkmode ? 0 : 20,
            borderBottomLeftRadius: darkmode ? 0 : 20,
            borderWidth: darkmode ? 0 : 1,
          }]}
           placeholder={"Ask something!"}
           placeholderTextColor={"black"}
           cursorColor={customTheme.placeholder}
           value={input}
           onChangeText={setInput}
           multiline={true}
        />

        <View style={[styles.container, {borderColor: customTheme.borderColor}]}>
          {input?.trim().length > 0 ? (
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
            ):(
            <IconButton
              icon={"microphone-outline"}
              iconColor={currentRecording ? "red" : customTheme.headerIconColors}
              onPress={recording}
            />
          )}
        </View>
      </View>
    </DefaultContainer>
  );
}


