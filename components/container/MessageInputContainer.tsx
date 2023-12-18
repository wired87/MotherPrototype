import {DefaultContainer} from "./DefaultContainer";
import { TextInput, View, Vibration, Pressable } from "react-native";
import {styles} from "./contiStyles";
import {IconButton} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useCallback, useContext, useMemo} from "react";
import {useDispatch} from "react-redux";
import {TypeIndicator} from "../animations/TypeIndicator";
import {Audio} from "expo-av";

const audioApiEndpoint = __DEV__?
  "http://192.168.178.51:8080/open/chat-request/" :
  "http://wired87.pythonanywhere.com/open/chat-request/"

import * as FileSystem from 'expo-file-system';
import getDurationFormatted, {createMessageObject, getCurrentTime} from "../../screens/chat/functions/SendProcess";
import {showAds} from "../../screens/chat/functions/AdLogic";
import {FunctionContext, InputContext, PrimaryContext, ThemeContext} from "../../screens/Context";

interface ExtraData {
  id: string;
  timeToken: string;
  publisher: string;
  class: string;
  file_id: string;
  user_id: string;
  soundAudio: any; // oder ersetzen Sie `any` durch den passenden Typ, falls bekannt
  type: string;
  duration: string;
}

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

  const stopRecording = useCallback(async() => {
    console.log("userRecording startRecording", userRecording);
    setCurrentRecording(false);
    setTyping(true);
    console.log('Stopping recording..');
    if (userRecording) {
      await userRecording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({allowsRecordingIOS: false});

      let uri: string | null;
      uri = userRecording.getURI();

      const {sound, status} = await userRecording.createNewLoadedSoundAsync();

      console.log('Recording stopped and stored at', uri);

      setUserRecording(undefined);

      if (uri !== null) {
        try {
          const fileInfo: FileSystem.FileInfo | null = await FileSystem.getInfoAsync(uri);

          if (!fileInfo.exists) {
            throw new Error("Audio file does not exist");
          }

          const user_id =user?.uid || "1";
          console.log("User in messageInput:", user_id);
          //const fileUri = uri;
          const fileName = `recording-${Date.now()}.m4a`;
          console.log("fileName:", fileName);

          const fileType = 'audio/m4a';

          // sender object
          let extraData: ExtraData = {
            "id": messageIndex.toString(),
            "timeToken": getCurrentTime().toString(),
            "publisher": "USER",
            "class": "voiceMessage",
            "file_id": fileName,
            "user_id": user_id.toString(),
            "soundAudio": sound,
            "type": "speech",
            "duration": getDurationFormatted(status.isLoaded ? status.durationMillis : null),
          }

          setMessages((prevMessages: any) => [...prevMessages, extraData]);
          setMessageIndex((state: number) => state + 1);

          const success = await checkMessagesLeftProcess()
          if (!success) console.log("0 Messages Left. Ads initialized");

          const {soundAudio, ...extraDataWithoutSound} = extraData;
          console.log("extraData:", extraData)

          const currentTime = getCurrentTime()
          console.log("current Time:", currentTime);

          try {
            const response = await FileSystem.uploadAsync(
              audioApiEndpoint,
              uri,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                httpMethod: 'POST',
                mimeType: fileType,
                parameters: extraDataWithoutSound,
                sessionType: undefined,
                uploadType: FileSystem.FileSystemUploadType.MULTIPART, // or BINARY_CONTENT
                fieldName: "file",

              }
            )

            // @ts-ignore parse it because return object is raw json otherwise you can not iterate to all the fields
            const responseBody = JSON.parse(response.body);
            console.log("responseBodyMessage:", responseBody.message);

            const aiResponse = createMessageObject(
              responseBody.message,
              "text",
              messageIndex,
              user,
              "AI",
              "aiMessageContainer",
            )

            setMessages((prevMessages: any) => [...prevMessages, aiResponse]);
            setMessageIndex((state: number) => state + 1);

          } catch (e) {
            console.error("Error while sending the request:", e)
            const aiResponse = createMessageObject(
              "Sorry i could not listening to you text message. " +
              "\nIf that error comes not alone please contact the support",
              "text",
              messageIndex,
              user,
              "AI",
              "aiMessageContainer",
            )
            setMessages(prevMessages => [...prevMessages, aiResponse]);
            setMessageIndex((state: number) => state + 1)
          }
        } catch (e) {
          console.error("Request was not successfully:", e);
          const aiResponse = createMessageObject(
            "Sorry i could not listening to you text message. " +
            "\nIf that error comes not alone please contact the support of this beautiful Application",
            "text",
            messageIndex,
            user,
            "AI",
            "aiMessageContainer"
          )
          setMessages(prevMessages => [...prevMessages, aiResponse]);
          setMessageIndex((state: number) => state + 1)
        } finally {
          setTyping(false);
        }
      }
    }
  }, [userRecording, messageIndex])


  const startRecording = useCallback(async() => {
    try {
      console.log('Requesting permissions...');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true})
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      console.log('Starting recording...');
      setUserRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    } finally {
      console.log("userRecording startRecording", userRecording);
    }
  }, [userRecording])


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
      await startRecording()
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
            </View>
    }
  },[]);

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


/*


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const stopRecording = useCallback(async() => {
    //setCurrentRecording(false);
    //Vibration.vibrate();
    //setTyping(true);
    console.log('Stopping recording..');
    if (userRecording) {
      // @ts-ignore recording stopps
      await userRecording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({allowsRecordingIOS: false});

      // @ts-ignore get the final uri form local storage
      const uri = userRecording.getURI();

      // @ts-ignore get the duration
      const {sound, status} = await userRecording.createNewLoadedSoundAsync();

      console.log('Recording stopped and stored at', uri);
      setUserRecording(undefined);

      try {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          throw new Error("Audio file does not exist");
        }

        // @ts-ignore set all necessary vars for the sender object
        const user_id = getAuth().currentUser ? getAuth().currentUser.uid : "1";
        console.log("User in messageInput:", user_id);

        const fileUri = uri;
        const fileName = `recording-${Date.now()}.m4a`;
        console.log("fileName:", fileName);

        const fileType = 'audio/m4a';

        // sender object
        let extraData: ExtraData = {
          "id": messageIndex.toString(),
          "timeToken": getCurrentTime().toString(),
          "publisher": "USER",
          "class": "voiceMessage",
          "file_id": fileName,
          "user_id": user_id.toString(),
          "soundAudio": sound,
          "type": "speech",
          "duration": getDurationFormatted(status.durationMillis),
        }

        const {soundAudio, ...extraDataWithoutSound} = extraData;
        console.log("extraData:", extraData)

        setMessages((prevMessages: any) => [...prevMessages, extraData]);
        setMessageIndex((state: number) => state + 1);

        const currentTime = getCurrentTime()
        console.log("current Time:", currentTime);

        try {
          const response = await FileSystem.uploadAsync(
            apiEndpoint,
            fileUri,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              httpMethod: 'POST',
              // @ts-ignore
              mimeType: fileType,
              parameters: extraDataWithoutSound,
              sessionType: undefined,
              uploadType: FileSystem.FileSystemUploadType.MULTIPART, // or BINARY_CONTENT
              fieldName: "file",
            }
          )

          // @ts-ignore parse it because return object is raw json otherwise you can not iterate to all the fields
          const responseBody = JSON.parse(response.body);
          console.log("responseBodyMessage:", responseBody.message);

          const aiResponse = createMessageObject(
            responseBody.message,
            "text",
            messageIndex,
            user,
            "AI",
            "aiMessageContainer",
          )

          setMessages((prevMessages: any) => [...prevMessages, aiResponse]);
          setMessageIndex((state: number) => state + 1);

        } catch (e) {
          console.error("Error while sending the request:", e)
          const aiResponse = createMessageObject(
            "Sorry i could not listening to you text message. " +
            "\nIf that error comes not alone please contact the support",
            "text",
            messageIndex,
            getAuth().currentUser,
            "AI",
            "aiMessageContainer",
          )
          setMessages(prevMessages => [...prevMessages, aiResponse]);
          setMessageIndex((state: number) => state + 1)
        }
      } catch (e) {
        console.error("Request was not successfully:", e);
        const aiResponse = createMessageObject(
          "Sorry i could not listening to you text message. " +
          "\nIf that error comes not alone please contact the support of this beautiful Application",
          "text",
          messageIndex,
          getAuth().currentUser,
          "AI",
          "aiMessageContainer"
        )

        setMessages(prevMessages => [...prevMessages, aiResponse]);
        setMessageIndex((state: number) => state + 1)

      } finally {
        setTyping(false);
      }
    }
  }, [userRecording, messageIndex])
 const textSendProcess = useCallback(() => {

    console.log("input len", inputRef.current.length);
    // @ts-ignore
    if (inputRef.current?.trim().length !== 0) {

      console.log("User input:", inputRef.current);
      console.log("typing", typing);

      const userMessage = createMessageObject(
        inputRef.current,
        "text",
        messageIndex,
        user,
        "USER",
        "userMessageContainer"
      );
      inputRef.current = "";

      setMessageIndex((state: number) => state + 1)
      console.log("Sender Object created: ", userMessage)

      console.log("Updating the messageList..")
      setMessages(prevMessages => [...prevMessages, userMessage]);

      sendPackage(userMessage)
        .then(() => console.log("Payload successfully sent.."))
        .catch(e => console.log("Error while try send the message", e))
        .finally(() => setTyping(false))

    } else {
      console.log("0 input try again")////////////////////////////////////////////////////////////////////////////////
      const response = createMessageObject(
        "There was no input addet please try again :)",
        "text",
        messageIndex,
        user,
        "AI",
        "aiMessageContainer"
      );
      setMessages(prevMessages => [...prevMessages, response]);
      setTyping(false);
    }
  }, [])





































  function getDurationFormatted(milliseconds: any) {
    const minutes = milliseconds / 1000 / 60;
    const sec = Math.round((minutes - Math.floor(minutes)) * 60);
    return sec < 10 ? `${Math.floor(minutes)}:0${sec}` : `${Math.floor(minutes)}:${sec}`
  }



const stopRecording = useCallback(async() => {
    //setCurrentRecording(false);
    //Vibration.vibrate();
    //setTyping(true);
    console.log('Stopping recording..');
    if (userRecording) {
      // @ts-ignore recording stopps
      await userRecording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({allowsRecordingIOS: false});

      // @ts-ignore get the final uri form local storage
      const uri = userRecording.getURI();

      // @ts-ignore get the duration
      const {sound, status} = await userRecording.createNewLoadedSoundAsync();

      console.log('Recording stopped and stored at', uri);
      setUserRecording(undefined);

      try {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          throw new Error("Audio file does not exist");
        }

        // @ts-ignore set all necessary vars for the sender object
        const user_id = getAuth().currentUser ? getAuth().currentUser.uid : "1";
        console.log("User in messageInput:", user_id);

        const fileUri = uri;
        const fileName = `recording-${Date.now()}.m4a`;
        console.log("fileName:", fileName);

        const fileType = 'audio/m4a';

        // sender object
        let extraData: ExtraData = {
          "id": messageIndex.toString(),
          "timeToken": getCurrentTime().toString(),
          "publisher": "USER",
          "class": "voiceMessage",
          "file_id": fileName,
          "user_id": user_id.toString(),
          "soundAudio": sound,
          "type": "speech",
          "duration": getDurationFormatted(status.durationMillis),
        }

        const {soundAudio, ...extraDataWithoutSound} = extraData;
        console.log("extraData:", extraData)

        setMessages((prevMessages: any) => [...prevMessages, extraData]);
        setMessageIndex((state: number) => state + 1);

        const currentTime = getCurrentTime()
        console.log("current Time:", currentTime);

        try {
          const response = await FileSystem.uploadAsync(
            apiEndpoint,
            fileUri,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              httpMethod: 'POST',
              // @ts-ignore
              mimeType: fileType,
              parameters: extraDataWithoutSound,
              sessionType: undefined,
              uploadType: FileSystem.FileSystemUploadType.MULTIPART, // or BINARY_CONTENT
              fieldName: "file",
            }
          )

          // @ts-ignore parse it because return object is raw json otherwise you can not iterate to all the fields
          const responseBody = JSON.parse(response.body);
          console.log("responseBodyMessage:", responseBody.message);

          const aiResponse = createMessageObject(
            responseBody.message,
            "text",
            messageIndex,
            user,
            "AI",
            "aiMessageContainer",
          )

          setMessages((prevMessages: any) => [...prevMessages, aiResponse]);
          setMessageIndex((state: number) => state + 1);

        } catch (e) {
          console.error("Error while sending the request:", e)
          const aiResponse = createMessageObject(
            "Sorry i could not listening to you text message. " +
            "\nIf that error comes not alone please contact the support",
            "text",
            messageIndex,
            getAuth().currentUser,
            "AI",
            "aiMessageContainer",
          )
          setMessages(prevMessages => [...prevMessages, aiResponse]);
          setMessageIndex((state: number) => state + 1)
        }
      } catch (e) {
        console.error("Request was not successfully:", e);
        const aiResponse = createMessageObject(
          "Sorry i could not listening to you text message. " +
          "\nIf that error comes not alone please contact the support of this beautiful Application",
          "text",
          messageIndex,
          getAuth().currentUser,
          "AI",
          "aiMessageContainer"
        )

        setMessages(prevMessages => [...prevMessages, aiResponse]);
        setMessageIndex((state: number) => state + 1)

      } finally {
        setTyping(false);
      }
    }
  }, [userRecording, messageIndex])
 */