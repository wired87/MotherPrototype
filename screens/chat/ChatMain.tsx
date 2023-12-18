import React, {memo, useCallback, useContext} from "react";
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
      fontSize: 30,
    },
    bgText: {
      fontSize: 160,
      fontFamily: "logoFont",
    },
    defaultContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    fullPercent: {
      width: "100%",
      height: "100%",
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
  const aixTextStyles =
    [localStyles.centeredText, {color: customTheme.secondaryBorderColor}];

  const aixBgTextStyles =
    [localStyles.bgText, {color: customTheme.secondaryBorderColor}]

  const primaryTextStyles = {textAlign: "justify", color: customTheme.text}
  const secondaryTextStyles = {color: customTheme.text}
  // @ts-ignore
  const renderItem = useCallback(({item, index}) => {
    return item.type === "text" ? (
      <SingleMessageMemo
        key={index}
        item={item}
        styles={chatStyles}
        primaryTextStyles={primaryTextStyles}
        secondaryTextStyles={secondaryTextStyles}
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

  return(
    <SafeAreaView style={mainViewStyles}>
      <KeyboardAvoidingView
        style={mainViewStyles}>
        <View style={localStyles.defaultContainer}>
          <View style={
            [
              chatStyles.chatBackground,
              {
                borderColor: customTheme.borderColor,
                backgroundColor: customTheme.view
              }
            ]
          } >

            <Text style={aixTextStyles}>
              MIRACLE
            </Text>

            <View style={localStyles.aiContainer}>
              <Text style={aixBgTextStyles}>
                AI
              </Text>
            </View>


          </View>
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
/*
<ToolitemButton color={"rgba(255,144,0,0.55)"}/>

 */