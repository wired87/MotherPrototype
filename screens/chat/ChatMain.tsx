import React, {useCallback, useEffect, useState} from "react";
import { Dimensions, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from "react-native";
import {chatStyles} from "./chatStyles";
import {SingleMessage} from "../../components/container/chat/SingleMessage";
import {useDispatch, useSelector} from "react-redux";
import {MessageInputContainer} from "../../components/container/MessageInputContainer";
import {SwipeModal} from "../../components/modals/SwipeModal";
import {StatusContainer} from "../../components/container/modalContainers/StatusContainer";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {imgStyles} from "../../components/images/imgStyles";

// @ts-ignore
import successAuth from "../../assets/images/successAuth.png";
import {SingleAudio} from "../../components/container/chat/SingleAudio";

export const ChatMain = (
  // @ts-ignore
  { seconds, input, setInput, setMessageBreakOption,
    // @ts-ignore
    setSeconds, messages, messageBreakOption, setMessageFinalBreak, sendMessage, setMessages, messageIndex }
) => {

  const [inputHeight, setInputHeight] = useState(54); // main input field
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState(false);

  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value);
  // @ts-ignore
  const logout = useSelector(state => state.logout.value);
  // @ts-ignore
  const typing = useSelector(state => state.sent.value.typing);


  const windowWidth = Dimensions.get('window').width;

  const dismissNewLogoutBox = useCallback(() => {
    dispatch({
      type: "LOGOUT",
      payload: false
    })
    console.log("newLogout: ", logout)
  }, []);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (logout) {
      setLogoutModal(true)
      dispatch({
        type: "LOGOUT",
        payload: false
      })
    }
  }, [logout]);

  return(
    <>
      <SafeAreaView style={{ backgroundColor: darkmode.primary, flex: 1, paddingTop: insets.top }}>
        <KeyboardAvoidingView
          style={{ paddingTop: insets.top, backgroundColor: darkmode.primary , flex: 1,
            marginBottom: Platform.OS === "ios" ? 20 : 0, flexDirection: "column" }}>

          <View style={{justifyContent: "center", alignItems: "center", flex: 1,}}>
            <View style={{backgroundColor: darkmode.view, zIndex: 0,
              borderColor: darkmode.borderColor, position: "absolute", alignItems: "center",
              justifyContent: "center", width: windowWidth * .9, height: "80%",
              marginVertical: "50%", borderRadius: 14}} >
              <Text style={{gap: 20, fontSize: 30, color: darkmode.bool? "rgba(255,255,255,.2)" : "rgba(0,0,0,.2)"}}>
                AIX
              </Text>
            </View>
            <FlatList
              inverted
              style={{width: "100%", height: "100%"}}
              data={[...messages]}
              contentContainerStyle={{ flexDirection: 'column-reverse' }}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ item, index }) => (
                item.type === "text" ? (
                  <>
                    <SingleMessage
                      key={index}
                      item={item}
                      styles={chatStyles}
                      primaryTextStyles={{textAlign: "justify", color: darkmode.text}}
                      secondaryTextStyles={{color: darkmode.text, fontSize: 10, }}
                    />
                  </>
                ):(
                  <>
                    <SingleAudio
                      key={index}
                      item={item}
                      styles={chatStyles}
                      secondaryTextStyles={{color: "white", fontSize: 12}}/>
                  </>
                ))}
            />
          </View>

          <View style={{bottom: 20,  flexDirection: "row", justifyContent:"center", alignItems: "center"}}>
            <MessageInputContainer
              messageIndex={messageIndex}
              valueInput={input}
              onChange={setInput}
              messageBreakOption={messageBreakOption}
              setMessageFinalBreak={setMessageFinalBreak}
              sendMessage={sendMessage}
              setMessages={setMessages}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {logout? (
        <SwipeModal
          animation={logoutModal}
          modalVisible={logoutModal}
          closeModal={dismissNewLogoutBox}
          Content={
            <StatusContainer
             source={successAuth}
             styles={imgStyles.statusImg}
             extraContainerStyles={undefined}
             text={"You are successfully Logged out"}
            />
          }
        />
      ):null}
    </>
  )
}
