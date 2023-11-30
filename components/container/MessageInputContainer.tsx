import {DefaultContainer} from "./DefaultContainer";
import {Dimensions, TextInput, TouchableOpacity, View, Vibration, Pressable} from "react-native";
import {styles} from "./contiStyles";
import {IconButton} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {themeColors} from "../../colors/theme";
import {TypeIndicator} from "../animations/TypeIndicator";
import {Audio} from "expo-av";

const windowWidth = Dimensions.get('window').width;
import * as FileSystem from 'expo-file-system';
import {StyleSheet} from "react-native";
import {getAuth} from "firebase/auth";
import {createMessageObject, getCurrentTime} from "../../screens/chat/functions/SendProcess";
import {showAds} from "../../screens/chat/functions/AdLogic";
import {FunctionContext, InputContext, PrimaryContext, ThemeContext} from "../../screens/Context";

const styles2 = StyleSheet.create({
  container: {
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderTopRightRadius: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 40
  },
  fill: {
    flex: 1,
    margin: 15
  }
});

const apiEndpoint = "http://192.168.178.51:8000/open/audio-chat-request/"

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
// UNBEDINGT HIER NOCH KURZ SECURE STORE UPDATES EINBAUEN
// @ts-ignore





export const MessageInputContainer = (

) => {
  const [currentRecording, setCurrentRecording] = useState(false);
  const [userRecording, setUserRecording] = useState();
  const [allRecordings, setAllRecordings] = useState([]);

  const {darkmode, user} = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);
  const {
    messageIndex, setMessages,
    input, setInput, messagesLeft,
    setMessagesLeft, setMessageIndex,
    typing, setTyping
  } = useContext(InputContext);

  const { sendMessageProcess } = useContext(FunctionContext);

  const dispatch = useDispatch();

  function getDurationFormatted(milliseconds: any) {
    const minutes = milliseconds / 1000 / 60;
    const sec = Math.round((minutes - Math.floor(minutes)) * 60);
    return sec < 10 ? `${Math.floor(minutes)}:0${sec}` : `${Math.floor(minutes)}:${sec}`
  }

  const startRecording = useCallback(async() => {
    setCurrentRecording(true);
    Vibration.vibrate();
    try {
      console.log('Requesting permissions...');
      await Audio.requestPermissionsAsync()
        .then(() => console.log("Success requested audio start"));
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }).then(() => console.log("Successful turned Audio on"))
      console.log("initialize the Audio..")

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();

      console.log('Starting recording...');
      // @ts-ignore
      setUserRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }, [userRecording])





  const stopRecording = useCallback(async() => {
    setCurrentRecording(false);
    Vibration.vibrate();
    setTyping(true);
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
        setMessageIndex((state: number) => state +1);

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
          setMessageIndex((state: number) => state +1)

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
          setMessageIndex((state: number) => state +1)
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

        // @ts-ignore
        setMessages(prevMessages => [...prevMessages, aiResponse]);
        setMessageIndex((state: number) => state + 1)

      } finally {
        setTyping(false);
      }
    }
  }, [userRecording, messageIndex])

  const send = async () => {
    if (!typing && input?.length >= 1 && input.trim().length > 0 && messagesLeft !== "0") {
      Vibration.vibrate();
      await sendMessageProcess()
        .then(() => {
            console.log("MessageProcess finished..");
          }
        )
    } else if (messagesLeft === "0") {
      console.log("User clicked the send btn while messages === 0 -> Ads initialized..")
      await showAds(dispatch, messagesLeft, setMessagesLeft).then(() => {
        console.log("Ads successfully initialized..")
      })
    } else {
      console.log("Already Sent Message, length === 0 or just whitespace")
    }
  }

  const recording = async () => {
    if(messagesLeft === "0") {
      await showAds(dispatch, messagesLeft, setMessagesLeft)
    } else if  (userRecording){
      await stopRecording()
    } else if(!userRecording) {
      await startRecording()
    }
  }


  return (
    <DefaultContainer
      extraStyles={{
        marginTop: 20, backgroundColor: "transparent", position: "relative",
        justifyContent: "center", alignItems: "center",
        flexDirection: "column", bottom: -5, padding: 0
      }}>

      <View style={{
        flexDirection: "row", width: windowWidth, justifyContent: "space-between",
        marginBottom: 7, alignItems: "center"
      }}>
        {typing ? (
          <View style={{
            justifyContent: "flex-start",
            alignItems: "flex-start", width: windowWidth * .5, paddingLeft: 20
          }}>
            <TypeIndicator/>
          </View>
        ) : null}
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-between", paddingLeft: 12,}}>
        <TextInput style={[styles.chatMessageInput,
          {
            color: customTheme.text,
            backgroundColor:  customTheme.navigatorColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: darkmode ? 0 : 20,
            borderBottomLeftRadius: darkmode ? 0 : 20,
            borderWidth: darkmode ? 0 : 1,
          }]}
                   placeholder={"Ask something!"}
                   placeholderTextColor={customTheme.placeholder}
                   cursorColor={customTheme.placeholder}
                   value={input}
                   onChangeText={setInput}
                   multiline={true}
        />
        {input?.trim().length > 0 ? (
          <>
            <Pressable
              onPress={() => setInput("")}
              style={localStyles.clearInputFiledBtn}>
              <MaterialCommunityIcons name={"close"} size={17}/>
            </Pressable>
            <MaterialCommunityIcons
              name={"atlassian"} size={25}
              onPress={send}
              style={{marginRight: 5, color: customTheme.headerIconColors, transform: [{rotate: '90deg'}]}}
            />
          </>
        ) : (
          <View style={[styles2.container, {borderColor: customTheme.borderColor}]}>
            <IconButton
              icon={"microphone-outline"}
              iconColor={currentRecording ? "red" : customTheme.headerIconColors}
              onPress={recording}
          />
          </View>
        )}
      </View>
    </DefaultContainer>
  );
}

const localStyles = StyleSheet.create(
  {
    clearInputFiledBtn: {
      position: "absolute",
      top: 6,
      zIndex: 90,
      right: 35,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: themeColors.borderThin,
      paddingVertical: 0,
      paddingHorizontal: 0,
    }
  }
)
