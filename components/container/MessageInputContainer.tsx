import {DefaultContainer} from "./DefaultContainer";
import {Dimensions, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "./contiStyles";
import {IconButton} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {themeColors} from "../../colors/theme";
import {TypeIndicator} from "../animations/TypeIndicator";
import {BreakButton} from "../buttons/BreakButton";
import {Audio} from "expo-av";

const windowWidth = Dimensions.get('window').width;
import * as FileSystem from 'expo-file-system';
import {StyleSheet} from "react-native";
import {getAuth} from "firebase/auth";
import {createMessageObject, getCurrentTime} from "../../screens/chat/functions/SendProcess";

const styles2 = StyleSheet.create({
  container: {
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderTopRightRadius: 14,
    paddingTop: 5

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
export const MessageInputContainer = (
  // @ts-ignore
  { valueInput, onChange, messageBreakOption, setMessageFinalBreak, sendMessage, setMessages, messageIndex }
) => {
  const [userRecording, setUserRecording] = React.useState();
  const [allRecordings, setAllRecordings] = React.useState([]);
  const [typing, setTyping] = React.useState(false);

  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)


  const dispatch = useDispatch()

  function getDurationFormatted(milliseconds: any) {
    const minutes = milliseconds / 1000 / 60;
    const sec = Math.round((minutes - Math.floor(minutes)) * 60);
    return sec < 10 ? `${Math.floor(minutes)}:0${sec}` : `${Math.floor(minutes)}:${sec}`
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions...');
      await Audio.requestPermissionsAsync().then(() => console.log("Success requested audio start"));
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
  }

  async function stopRecording() {
    setTyping(true);
    console.log('Stopping recording..');

    if (userRecording) {
      // @ts-ignore recording stopps
      await userRecording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

      // @ts-ignore get the final uri form local storage
      const uri = userRecording.getURI();

      // @ts-ignore get the duration
      const { sound, status } = await userRecording.createNewLoadedSoundAsync();

      console.log('Recording stopped and stored at', uri);
      setUserRecording(undefined);

      try {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          throw new Error("Audio file does not exist");
        }

        // @ts-ignore set all necessary vars for the sender object
        const user_id = getAuth().currentUser? getAuth().currentUser.uid : "1";
        console.log("User in messageinput:", user_id);

        const index = messageIndex.current
        console.log("messageIndex:", index);

        const fileUri = uri;
        const fileName = `recording-${Date.now()}.m4a`;
        console.log("fileName:", fileName);

        const fileType = 'audio/m4a';

        // sender object
        let extraData: ExtraData = {
          "id": messageIndex.current.toString(),
          "timeToken": getCurrentTime().toString(),
          "publisher": "USER",
          "class": "voiceMessage",
          "file_id": fileName,
          "user_id": user_id.toString(),
          "soundAudio": sound,
          "type": "speech",
          "duration": getDurationFormatted(status.durationMillis),
        }

        const { soundAudio, ...extraDataWithoutSound } = extraData;
        console.log("extraData:", extraData)

        setMessages((prevMessages: any) => [...prevMessages, extraData])
        messageIndex.current = messageIndex.current + 1;

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
              fieldName: "file"
            }
          )

          // @ts-ignore parse it because return object is raw json otherwise you can not iterate to all the fields
          const responseBody = JSON.parse(response.body);
          console.log("responseBodyMessage:", responseBody.message);

          const aiResponse = createMessageObject(
            responseBody.message,
            "text",
            messageIndex,
            getAuth().currentUser,
            "AI",
            "aiMessageContainer",
        )

          setMessages((prevMessages: any) => [...prevMessages, aiResponse]);
          messageIndex.current = messageIndex.current + 1;

        } catch(e) {
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

          // @ts-ignore
          setMessages(prevMessages => [...prevMessages, aiResponse]);
          messageIndex.current = messageIndex.current + 1;
        }

      } catch(e) {
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
        messageIndex.current = messageIndex.current + 1;

      } finally {
        setTyping(false);
      }
    }
  }

  useEffect(() => {
    console.log("MessageInput darkmode:", darkmode)
    console.log("typingMessageInput:", typing)
  }, []);

  function clearRecordings() {
    setAllRecordings([])
  }

  return(
    <DefaultContainer
      extraStyles={{ marginTop: 20, backgroundColor: "transparent", position: "relative",
        justifyContent: "center", alignItems: "center",
        flexDirection: "column", bottom: -5, padding: 0}} >

      <View style={{flexDirection: "row", width: windowWidth, justifyContent: "space-between",
        marginBottom: 7, alignItems: "center"}}>
        {typing ? (
          <View style={{ justifyContent: "flex-start",
            alignItems: "flex-start", width: windowWidth * .5, paddingLeft: 20 }}>
            <TypeIndicator />
          </View>
        ) : null}

        {messageBreakOption? (
          <View style={{ width: windowWidth * .5, justifyContent: "center", alignItems: "center"}}>
            <BreakButton
              extraStyles={{justifyContent: "center", alignItems: "center"}}
              onPress={() => {setMessageFinalBreak(true)}}
            />
          </View>
        ):null}
      </View>
      <View style={{flexDirection: "row", justifyContent: "space-between", paddingLeft: 12, }}>
        <TextInput style={[styles.chatMessageInput,
          {backgroundColor: darkmode.bool? darkmode.navigatorColor : themeColors.dotNineWhite,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: darkmode.bool? 0 : 20,
            borderBottomLeftRadius: darkmode.bool? 0 : 20,
            borderWidth: darkmode.bool? 0 : 1,
          }]}
                   placeholder={"Ask something!"}
                   value={valueInput}
                   onChangeText={(val) => onChange(val)}
                   multiline={true}
        />
        {valueInput?.trim().length > 0? (
          <>
            <TouchableOpacity
              onPress={() => onChange(null)}
              style={{position: "absolute", top: 6, zIndex: 90,  right: 35, borderWidth: 1, borderRadius: 50, borderColor: themeColors.borderThin,
                paddingVertical: 0, paddingHorizontal: 0,
              }}>
              <MaterialCommunityIcons name={"close"} size={17}/>
            </TouchableOpacity>
            <MaterialCommunityIcons
              name={"atlassian"} size={25}
              onPress={() => {
                !typing && valueInput?.length >= 1 && valueInput.trim().length > 0 ?
                  sendMessage().then(() => console.log("Successfully sent Message")) :
                  console.log("Already Sent Message, length === 0 or just whitespace")
              }}
              style={{ marginRight: 5, color:darkmode.headerIconColors, transform: [{ rotate: '90deg'}]}}
            />
          </>
        ):(

          <View style={styles2.container}>
            <IconButton icon={"microphone-outline"}
                        iconColor={userRecording ? "red" : darkmode.headerIconColors}
                        onPress={typing ? undefined : userRecording ? stopRecording : startRecording}  />
          </View>
        )}
      </View>
    </DefaultContainer>
  );
}



/*







wait Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await recording.startAsync()






  //RNFetchBlob.fs.readFile(fileUri, 'base64').then((base64Data) => {
  // const blob = RNFetchBlob.polyfill.Blob.build(base64Data, { type: `${fileType};BASE64` });
  //formData.append('audioFile', blob, fileName);

  // const blob = await RNFetchBlob.fs.readFile(fileUri, 'base64');
  //formData.append('audioFile', blob, fileName);








async function startRecording() {
  try {
    const perm = await Audio.requestPermissionsAsync();
    if (perm.status === "granted") {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      // @ts-ignore
      setRecording(recording);
    }
  } catch (e) {
    console.error("Error while start the audio:", e)
  }
}

async function stopRecording() {
  setRecording(undefined);
  try {
    // @ts-ignore
    await recording.stopAndUnloadAsync();
    // @ts-ignore
    let allRecordings = [...allRecordings];
    // @ts-ignore
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    // @ts-ignore
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      // @ts-ignore
      file: recording.getURI()
    });
    // @ts-ignore
    setAllRecordings(allRecordings);
  }catch (e) {
    console.error("Error while stop the audio:", e)
  }
}


*/
/*
console.log("Dispatch audio data:", formData);
        const response =
          await axios.post("http://192.168.178.51:8000/open/audio-chat-request/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // 'audioFile', {uri: fileUrl, type: fileType, name: fileName}
        const blob = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        const file = new Blob([blob], { type: fileType });
        formData.append('audioFile', file, fileName);
 */

