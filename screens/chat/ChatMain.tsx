
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, View, StyleSheet} from "react-native";
import {MessageInput, MessageList,} from "@pubnub/react-native-chat-components";
import axios from "axios";
import {IconButton} from "react-native-paper";

import {DefaultText} from "../../components/text/DefaultText";
import {getAuth} from "firebase/auth";
import { TypeIndicator } from "../../components/animations/TypeIndicator";
import {chatStyles} from "./chatStyles";

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

    const user = getAuth().currentUser;

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


    useEffect(() => {
        if (send) {
            sendMessage().then(r => {console.log("successfully send a HISTORY message")});
            setText("");
            setSendHistoryMessage(false);
            setSend(false);
        }
    })



    // @ts-ignore
    return(
        <>
            <SafeAreaView style={{ backgroundColor: "#f0f3f7", flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1, marginBottom: Platform.OS === "ios" ? 20 : 0  }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}>
                    <MessageList
                        enableReactions={true}>
                        {messages.map(item => {
                            return(
                            // @ts-ignore
                                <View key={item.id} style={[styles[item.class],
                                    // @ts-ignore
                                    item.id % 2 === 0 ? {left: 0} : {right: 0},
                                    {marginBottom: 12, justifyContent: "space-between"}]}>
                                    {/* @ts-ignore */}
                                    <DefaultText text={item.message} moreStyles={undefined}/>
                                    {/* @ts-ignore */}
                                    <DefaultText text={item.timetoken} moreStyles={undefined}/>
                                </View>
                            );
                        })}
                    </MessageList>
                    {typing ? (
                        <View style={{ justifyContent: "flex-start",
                            alignItems: "flex-start", width: windowWidth, paddingLeft: 40,}}>
                            <TypeIndicator />
                        </View>
                    ) : null}
                    <MessageInput
                        maxLength={1000}
                        id={"mainInput"}
                        // @ts-ignore
                        contentContainerStyle={{ alignItems: 'flex-end', justifyContent: 'center' }}
                        senderInfo={false}
                        typingIndicator={false} // if user or ai is typing you see al little typingIndicator
                        onChange={(value: any) => setText(value)}
                        value={text}
                        // extraActionsRenderer={} extra stuff  to render in the msg bar -> later file + audio btn
                        sendButton={<IconButton icon={"send-outline"} size={70}// @ts-ignore
                                                color={"#252427"} onPress={setSendDifferent}/>}/>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    )
}


/*
--------------------------- COMPONENTS DOCUMENTATION IN THIS FILE -------------------------------------------------
             data={messages}
renderItem={({ item }) => (<View key={item.id} style={[styles[item.class],
                                          item.id % 2 === 0 ? {left: 0} : {right: 0},
                                          {marginBottom: 12}]}>
                <Text>{item.message}</Text>
                <Text>{item.timetoken.toString()}</Text>
              </View>
              )}

PUBNUB
######### Message3Input
placeholder?	string	"Send message"	Option to set a placeholder message to display in the text window.

draftMessage?	string	n/a	Option to set a draft message to display in the text window.

senderInfo?	boolean	false	Option to attach sender data directly to each message. Enable it for high-throughput
environments. This is an alternative to providing a full list of users directly into the chat provider

typingIndicator?	boolean	false	Option to enable/disable firing the typing events when a user is typing a message.

fileUpload?	"image" | "all"	n/a	Option to enable/disable the internal file upload capability. It lets you send both text
and file in one message.

filePreviewRenderer?	(file: File | UriFileInput) => JSX.Element | null	n/a	Callback to render the preview of the
attached file.

disabled?	boolean	false	Option to disable the input from composing and sending messages.

hideSendButton?	boolean	false	Option to hide the Send button.

sendButton?	JSX.Element | string	<AirplaneIcon />	Custom UI component to override default display for the Send button.

emojiPicker?	ReactElement<EmojiPickerElementProps>	n/a	Option to pass in an emoji picker if you want it to be rendered '
in the input. For more details, refer to the Emoji Pickers section in the docs.

actionsAfterInput?	boolean	false	Option to move action buttons (eg. file upload icon) to the right of the text input.

onChange?	(event: ChangeEvent<HTMLTextAreaElement>) => void	n/a	Callback to handle an event when the input value changes.

onKeyPress?	(event: KeyboardEvent<HTMLTextAreaElement>) => void	n/a	Callback to handle an event when a key is pressed in
the input area.

onBeforeSend?	(value: MessagePayload) => MessagePayload	n/a	Callback to modify message content before sending it. This
only works for text messages, not files.


onSend?	(value: MessagePayload | File | UriFileInput) => void	n/a	Callback for extra actions after sending a message.
extraActionsRenderer?	() => JSX.Element	n/a	Option to provide an extra actions renderer to add custom action buttons to
the input.
Selected textarea attributes	various	n/a	chat Components for React let you configure all the default React textarea
attributes except for className, data-testid, disabled, onChange, onKeyPress, placeholder, ref, rows, and value.
For example, you can set a limit to the maximum number of characters that can be entered in the input field using
the maxLength parameter, like <MessageInput maxLength={120} />.



ICONS
######## MaterialCommunityIcons





 */




















/*

export default function ChatMain() {
  const [text, setText] = useState(''); // text from main input field
  const [inputHeight, setInputHeight] = useState(54); // main input field

  const [messages, setMessages] = useState([]) // all Messages
  let [messageIndex, setMessageIndex] = useState(0) // index for the messages



  const onContentSizeChange = (event) => {
    if (inputHeight < 150) {
      setInputHeight(event.nativeEvent.contentSize.height);
    }
  };


  const getCurrentTime = () => {
    const timeNow = new Date();
    let timeHoursNow = timeNow.getHours();
    let timeMinutesNow = timeNow.getMinutes()
    if (timeHoursNow < 10)  {
      timeHoursNow = "0" + timeHoursNow
    } else if (timeMinutesNow < 10){
      timeMinutesNow = "0" + timeMinutesNow
    }
    let renderTime = timeHoursNow + ":" + timeMinutesNow
    return(renderTime);
  }

  const clearField = () => {

    setText("");
    console.log("text:" + text);
  }

  const sendMessage = async () => {
    console.log("text:", text);
    const message = text;
    console.log("text:", text);
    if (text.length !== 0) {
      const userMessage = {
        "id": messageIndex,
        "message": message,
        "timetoken": getCurrentTime(),
        "publisher": "USER",
        "class": "userMessageContainer",
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setMessageIndex( messageIndex += 1);
      console.log("messageIndex:" + messageIndex)
      try {
        const response = await axios.post("http://192.168.178.51:8000/open/chat-request/", userMessage);
        console.log("response", response)
        const aiResponse = {
          "id": messageIndex,
          "message": response.data.message,
          "timetoken": getCurrentTime(),
          "publisher": "AI",
          "class": "aiMessageContainer",
        };
        console.log("aiResponse:", aiResponse, messageIndex);

        setMessageIndex( messageIndex += 1);
        console.log("messageIndex:" + messageIndex)
        setMessages(prevMessages => [...prevMessages, aiResponse]); /* create here a new list that contains all previous messages
          + the new one.  That makes it easier to lok for issues because it creates every time a "copy" of the old one
          with the new element inside.

    }
  }

  );
}
 */

const darkEmojiPickerTheme = {
    backdrop: "#16161888",
    knob: "#fff",
    container: "#2a2a39",
    header: "#fff",
    skinTonesContainer: "#252427",
    category: {
        icon: "#fff",
        iconActive: "#1c1c28",
        container: "#1c1c28",
        containerActive: "#fff",
    },
};














/*

const CustomMessageInput = (props) => (
<MessageInput
{...props}

/>

Loading small
<MessageList
    enableReactions
    >

<>
<SafeAreaView>
  <FlatList
  style={styles.safeFullViewContainer}
  data={messages}
  contentContainerStyle={{ alignItems: 'flex-end', justifyContent: "center" }}
  renderItem={({ item }) => (
    <View key={item.key} style={[styles[item.class],
                                item.key % 2 === 0 ? {left: 0} : {right: 0},
                                {marginBottom: 12}]}>
      <Text>{item.message}</Text>
      <Text>{item.date.toString()}</Text>
    </View>
  )}
/>
<View style={[styles.inputContainer, {height: inputHeight}]}
      contentContainerStyle={{ alignItems: 'flex-end', justifyContent: 'center' }}
      >
  <View style={{borderWidth:1,position:'absolute', bottom:0,alignSelf:'flex-end'}}>
     <Button
       title="Send"
       color="#841584"
       accessibilityLabel="Press"
       onPress={() => {
        clearField()
        sendMessage().then(r => console.log("success"))
      }}
     />
  </View>


</View>
<Button title={"delete"} onPress={clearField}/>
</SafeAreaView>






















*/









{/* 1. styles.message.class will raise an error
2. must give the key from the dict object to the container (key={message.key})*/}



/*
 <TextInput
          style={[styles.maintextInput, {height: inputHeight}]}
          placeholder={"Ask about life..."}
          placeholderTextColor={"rgb(255,255,255)"}
          placeholderFontWeight={"unset"}
          multiline={true}
          onContentSizeChange={onContentSizeChange}
          onChangeText={setText}
          value={text}
          maxLength={1000}
        />
 */
















/*
import React, {useEffect, useState} from 'react'
import { CometChatUIKit, UIKitSettings } from '@cometchat/chat-uikit-react-native'
import {View} from "react-native";

// Add the below state to load the UI component after user logs in.
const [renderUI, setRenderUI] = useState(false);

// Add the below useEffect in your App.tsx file.
useEffect(() => {
    let uikitSettings: UIKitSettings = {
        appId: "APP_ID",
        authKey: "AUTH_KEY",
        region: "REGION",
    CometChatUIKit.init(uikitSettings).then(
        () => {
            console.log("CometChatUiKit successfully initialized")
						let uid = "UID";
						CometChatUIKit.getLoggedInUser().then(
							(loggedInUser) => {
								if(!loggedInUser){
									CometChatUIKit.login({uid: uid}).then(
										user => {
			                console.log("User logged in successfully", {user});
											setRenderUI(true);
							      }
									).catch(
										(error) => {
			                console.log("Login failed with exception:", error);
							      }
									)
								}else{
									setRenderUI(true);
								}
							}
						).catch(
							(error) => {
	              console.log("Login failed with exception:", error);
				      }
						)
        }
    ).catch(
        (error) => {
            console.log("Initialization failed with exception:", error);
        }
    )
}, []);

//In the render method, if the state `renderUI` is true, render the UI Component

export function chat() {
  return(
    <View style={{ height: '100%', width: '100%' }}>
		  { renderUI ? <CometChatConversationsWithMessages /> : null }
	  </View>
  );
}


/*
implement
created_at: new Date(),
 */
// colors
