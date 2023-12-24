import React, {memo, useCallback, useContext, useMemo} from "react";
import { FlatList, KeyboardAvoidingView, SafeAreaView, Text, View, StyleSheet } from "react-native";
import {chatStyles} from "./chatStyles";
import {SingleMessage} from "../../components/container/chat/SingleMessage";
import {MessageInputContainer} from "../../components/container/MessageInputContainer";
// @ts-ignore
import {SingleAudio} from "../../components/container/chat/SingleAudio";
import {InputContext, ThemeContext} from "../Context";

const localStyles = StyleSheet.create(
  {
    messageInputView: {
      bottom: 20,
      flexDirection: "row",
      justifyContent:"center",
      alignItems: "center"
    },
    centeredText: {
      gap: 20,
      fontFamily: "wizardFont",
      fontSize: 20,
    },
    bgText: {
      fontSize: 160,
    },
    defaultContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    fullPercent: {
      marginTop: 50
    },
    columnReverse: {
      flexDirection: 'column-reverse'
    },
    customFontSize: {
      fontSize: 10,
    },
    main: {
      paddingTop: 0,
      flex: 1,
      marginBottom: 0,
      flexDirection: "column"
    },
    aiContainer: {
      justifyContent: "flex-start",
      alignItems: "center",
      position: "absolute",
      width: 200,
      height: 200,
    }
  }
)

const SingleMessageMemo = memo(SingleMessage);
const SingleAudioMemo = memo(SingleAudio);

export const ChatMain = (
) => {

  const { messages } = useContext(InputContext);
  const { customTheme } = useContext(ThemeContext);

  // Styles
  const mainViewStyles =
    [localStyles.main, {backgroundColor: customTheme.primary}];

  const primaryTextStyles = {textAlign: "justify", color: customTheme.text}
  const secondaryTextStyles = {color: "white", fontSize: 10}
  const secondaryTextStylesText = {color: customTheme.text, fontSize: 10}
  // @ts-ignore
  const renderItem = useCallback(({item, index}) => {
    return item.type === "text" ? (
      <SingleMessageMemo
        key={index}
        item={item}
        styles={chatStyles}
        primaryTextStyles={primaryTextStyles}
        secondaryTextStyles={secondaryTextStylesText}
      />
    ) : (
      <SingleAudioMemo
        key={index}
        item={item}
        styles={chatStyles}
        secondaryTextStyles={secondaryTextStyles}
      />
    );
  }, [customTheme, messages]);

  const miracleText = useMemo(() => {
    const aixTextStyles =
      [localStyles.centeredText, {color: customTheme.mirageChatMainColor}];
    return <View style={
      [
        chatStyles.chatBackground,
        {
          borderColor: customTheme.borderColor,
          backgroundColor: customTheme.view
        }
      ]
    }>
      <Text style={aixTextStyles}>MIRACLE</Text>
    </View>
  },[customTheme])


  return(
    <SafeAreaView style={mainViewStyles}>
      <KeyboardAvoidingView
        style={mainViewStyles}>
        <View style={localStyles.defaultContainer}>
          {miracleText}
          <FlatList
            inverted
            style={localStyles.fullPercent}
            data={messages}
            contentContainerStyle={localStyles.columnReverse}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItem}
          />
        </View>
        <View style={localStyles.messageInputView}>
          <MessageInputContainer />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
