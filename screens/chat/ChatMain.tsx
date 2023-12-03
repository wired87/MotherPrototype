import React, {memo, useCallback, useContext} from "react";
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Text, View, StyleSheet } from "react-native";
import {chatStyles} from "./chatStyles";
import {SingleMessage} from "../../components/container/chat/SingleMessage";
import {MessageInputContainer} from "../../components/container/MessageInputContainer";

import {useSafeAreaInsets} from "react-native-safe-area-context";

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
      color: "rgba(0, 0, 0, .4)"
    },
    defaultContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1
    },
    fullPercent: {
      width: "100%",
      height: "100%"
    },
    columnReverse: {
      flexDirection: 'column-reverse'
    },
    customFontSize: {
      fontSize: 10,
    }
  }
)

const SingleMessageMemo = memo(SingleMessage);
const SingleAudioMemo = memo(SingleAudio);

export const ChatMain = (
) => {

  const { messages } = useContext(InputContext);
  const { customTheme } = useContext(ThemeContext);

  const insets = useSafeAreaInsets();

  // @ts-ignore
  const renderItem = useCallback(({ item, index }) => {
    return item.type === "text" ? (
      <SingleMessageMemo
        key={index}
        item={item}
        styles={chatStyles}
        primaryTextStyles={{textAlign: "justify", color: customTheme.text}}
        secondaryTextStyles={{color: customTheme.text,  }}
      />
    ) : (
      <SingleAudioMemo
        key={index}
        item={item}
        styles={chatStyles}
        secondaryTextStyles={{color: "white", fontSize: 12}}
      />
    );
  }, [customTheme, messages]);


  return(
    <SafeAreaView style={{ backgroundColor: customTheme.primary, flex: 1, paddingTop: insets.top }}>
      <KeyboardAvoidingView
        style={{ paddingTop: insets.top, backgroundColor: customTheme.primary, flex: 1,
          marginBottom: Platform.OS === "ios" ? 20 : 0, flexDirection: "column" }}>

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
          <Text style={localStyles.centeredText}>
            AIX
          </Text>

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
          <MessageInputContainer/>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}




/*
              item.type === "text" ? (

                <SingleMessage
                  key={index}
                  item={item}
                  styles={chatStyles}
                  primaryTextStyles={{textAlign: "justify", color: customTheme.text}}
                  secondaryTextStyles={{color: customTheme.text, fontSize: 10, }}
                />
              ):(
                <SingleAudio
                  key={index}
                  item={item}
                  styles={chatStyles}
                  secondaryTextStyles={{color: "white", fontSize: 12}}
                />
              ))}
          />
 */
