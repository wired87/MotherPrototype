import {DefaultContainer} from "./DefaultContainer";
import {View, Vibration, ActivityIndicator} from "react-native";
import {styles} from "./contiStyles";
import React, {useCallback, useContext, useMemo, useState} from "react";
import { TypeIndicator } from "../animations/TypeIndicator";

import {showAds} from "../../screens/chat/functions/AdLogic";
import {FunctionContext, InputContext, PrimaryContext, ThemeContext} from "../../screens/Context";
import {IconButton} from "react-native-paper";
import {DefaultInput} from "../input/DefaultInput";
import FloatingMediaButton from "../buttons/FloatingMediaButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export const MessageInputContainer: React.FC = (
) => {

  const {darkmode} = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);
  const [error, setError] = useState<string>("");


  const {
    messages,
    input, setInput, messagesLeft,
    setMessagesLeft,
    typing,
    } = useContext(InputContext);


  const { sendMessageProcess } = useContext(FunctionContext);

    // Styles
  const extraInputStyles = [styles.chatMessageInput,
    {
      color: customTheme.text,
      borderColor: customTheme.text,
    },

  ];
  const moreContainerInputStyles:object = [styles.inputContainer,
    {
      justifyContent: input?.trim().length == 0 ?  "center" : "flex-end"

    }];

  const send = useCallback(async () => {
    console.log("real messages", messages)
    if (!typing && input?.length >= 1 && input.trim().length > 0 && messagesLeft !== "0") {
      Vibration.vibrate()
      await sendMessageProcess();
    } else if (messagesLeft === "0") {
      console.log("User clicked the send btn while messages === 0 -> Ads initialized..")
      await showAds(messagesLeft, setMessagesLeft)
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

  return (
    <DefaultContainer
      extraStyles={styles.main}>

      <View style={styles.secondContainer}>
        {typeIndicator}
      </View>

      <View style={moreContainerInputStyles}>
        <FloatingMediaButton />
        <DefaultInput
          placeholder={"Ask something!"}
          value={input}
          onChangeAction={setInput}
          keyboardType={"default"}
          extraStyles={extraInputStyles}
          numberOfLines={10}
          max_length={2000}
          multiline
          editable
          recordingButton
        />
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