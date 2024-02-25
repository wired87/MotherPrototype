import DefaultContainer from "./DefaultContainer";
import {View, ActivityIndicator, Image} from "react-native";
import {styles} from "./contiStyles";
import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { TypeIndicator } from "../animations/TypeIndicator";
import {FunctionContext, InputContext, MediaContext, PrimaryContext, ThemeContext} from "../../screens/Context";
import {DefaultInput} from "../input/DefaultInput";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MediaPreview from "./imageContainers/MediaPreview";
import FilePreviewContainer from "./FilePreviewContainer";
import FloatingMediaButton from "../buttons/FloatingMediaButton";
import {useError} from "../../AppHooks/PrimaryHooks";


interface MessageInputTypes {
  messagesLeft: string;
}

export const MessageInputContainer: React.FC<MessageInputTypes> = (
  {
    messagesLeft
  }
) => {
  // CONTEXT
  const { customTheme } = useContext(ThemeContext);
  const { jwtToken } = useContext(PrimaryContext);
  const {
    input, setInput,
    typing,
  } = useContext(InputContext);
  const { sendMessageProcess } = useContext(FunctionContext);
  const { pickedImage, doc } = useContext(MediaContext);

  // HOOKS
  const {error} = useError();

  // REFS
  const messageRef = useRef(messagesLeft)


  useEffect(() => {
    messageRef.current = messagesLeft;
  }, [messagesLeft]);


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
    if (!typing && input.trim().length > 0 && jwtToken/* && messagesLeft !== "0"*/) {
      await sendMessageProcess();
    /*} else if (messageRef.current === "0") {
      console.log("Ads initialized...")
      showAds(messageRef.current, setMessagesLeft).then(() => setInput(""))*/
    } else {
      console.log("Already Sent Message...")
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


  const sendButton = useCallback(() => {
    const extraSendStyles = styles.sendIcon;
    if (input?.trim().length > 0) {
      return(
        <MaterialCommunityIcons
          color={customTheme.text}
          style={extraSendStyles}
          name={"atlassian"}
          onPress={send}
          size={30}
        />
      )
    }
    return <></>
  }, [input, error, customTheme, typing]);



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



  return (
    <DefaultContainer
      extraStyles={styles.main}>

      <View style={styles.secondContainer}>
        {typeIndicator}
      </View>

      <View style={moreContainerInputStyles}>
        <FloatingMediaButton />
        <View style={extraMessageContainerStyles}>
          {
            media()
          }
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
          {
            sendButton()
          }
        </View>

      </View>
    </DefaultContainer>
  );
}

