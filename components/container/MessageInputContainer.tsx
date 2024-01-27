import {DefaultContainer} from "./DefaultContainer";
import {View, Vibration, ActivityIndicator, Image} from "react-native";
import {styles} from "./contiStyles";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import { TypeIndicator } from "../animations/TypeIndicator";

import {showAds} from "../../screens/chat/functions/AdLogic";
import {FunctionContext, InputContext, MediaContext, PrimaryContext, ThemeContext} from "../../screens/Context";
import {DefaultInput} from "../input/DefaultInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MediaPreview from "./imageContainers/MediaPreview";
import FilePreviewContainer from "./FilePreviewContainer";


interface MessageInputTypes {
  messagesLeft: string;
}

export const MessageInputContainer: React.FC<MessageInputTypes> = (
  {
    messagesLeft
  }
) => {

  const {darkmode} = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);
  const [error, setError] = useState<string>("");

  const {
    messages,
    input, setInput,
    setMessagesLeft,
    typing,
    } = useContext(InputContext);

  const messageRef = useRef(messagesLeft)

  useEffect(() => {
    messageRef.current = messagesLeft;
  }, [messagesLeft]);



  const { pickedImage, updatePickedImage, doc } = useContext(MediaContext);

  const { sendMessageProcess } = useContext(FunctionContext);

    // Styles
  const extraInputStyles = [
    styles.chatMessageInput,
    {
      color: customTheme.text,
      maxHeight: 400,
      textAlignVertical: "center"
    },
  ];

  const extraMessageContainerStyles = [styles.messageContainer, {
    borderColor: customTheme.text,
  }];

  const moreContainerInputStyles:object = [styles.inputContainer,
    {
      justifyContent: input?.trim().length == 0 ?  "center" : "flex-end",
      alignItems: "flex-end"
    }];


  const send = async () => {
    console.log("real messages", messages)
    if (!typing && input?.length >= 1 && input.trim().length > 0 && messagesLeft !== "0") {
      Vibration.vibrate();
      await sendMessageProcess();
    } else if (messageRef.current === "0") {

      console.log("MESSAGES LEFT IN SEND:",  messageRef.current);
      console.log("User clicked the send btn while messages === 0 -> Ads initialized..")
      showAds(messageRef.current, setMessagesLeft).then(() => setInput(""))
    } else {
      console.log("Already Sent Message, length === 0 or just whitespace")
    }
  }//, [messagesLeft, typing, input, messages]);


  const typeIndicator = useMemo(() => {
    if (typing) {
      return <View style={styles.indicatorContainer}>
              <TypeIndicator/>
              <ActivityIndicator size={"small"} color={customTheme.text}/>
            </View>
    }
  },[typing]);

  useEffect(() => {
    console.log("MESSAGESLEFT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:", messagesLeft)
  }, [messagesLeft]);

  const sendButton = useMemo(() => {
    const extraSendStyles = styles.sendIcon;
    if (input?.trim().length > 0) {
      return(
        <MaterialCommunityIcons
          color={customTheme.headerIconColors}
          style={extraSendStyles}
          name={"atlassian"}
          onPress={send}
          size={30}
        />
      )
    }
    return <></>
  }, [input, error, darkmode, typing]);



  const media = useCallback(() => {
    if (pickedImage && pickedImage.assets?.[0].uri && !doc) {
      return(
        <MediaPreview>
          <Image style={styles.messageContainerImage} source={{uri: pickedImage.assets?.[0].uri}} />
        </MediaPreview>
      );
    }else if (!pickedImage && doc) {
      return(
        <MediaPreview>
          <FilePreviewContainer document={doc}/>
        </MediaPreview>
      );
    }
  }, [pickedImage, input, doc]);

  // <FloatingMediaButton />

  return (
    <DefaultContainer
      extraStyles={styles.main}>

      <View style={styles.secondContainer}>
        {typeIndicator}
      </View>

      <View style={moreContainerInputStyles}>

        <View style={extraMessageContainerStyles}>
          {media()}
          <DefaultInput
            placeholder={"Ask something!"}
            value={input}
            onChangeAction={setInput}
            keyboardType={"default"}
            extraStyles={extraInputStyles}
            max_length={2000}
            multiline={true}
            editable
            recordingButton
            noBorder
          />
        </View>

        <View style={[styles.container, {borderColor: customTheme.borderColor}]}>
          {sendButton}
        </View>

      </View>
    </DefaultContainer>
  );
}



/*

 <TextInput style={extraInputStyles}
           maxLength={2000}
           placeholder={"Ask something!"}
           placeholderTextColor={customTheme.text}
           cursorColor={customTheme.placeholder}
           value={input}
           onChangeText={setInput}
           multiline={true}
        />
 */