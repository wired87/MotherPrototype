import React, {useContext, useEffect, useRef, useState} from "react";
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from "react-native";
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
import {InputContext, ThemeContext} from "../Context";
import BottomSheet from "@gorhom/bottom-sheet";

export const ChatMain = (
) => {
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState(false);

  const { messages } = useContext(InputContext);
  const { customTheme } = useContext(ThemeContext);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // @ts-ignore
  const logout = useSelector(state => state.logout.value);

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
      <SafeAreaView style={{ backgroundColor: customTheme.primary, flex: 1, paddingTop: insets.top }}>
        <KeyboardAvoidingView
          style={{ paddingTop: insets.top, backgroundColor: customTheme.primary, flex: 1,
            marginBottom: Platform.OS === "ios" ? 20 : 0, flexDirection: "column" }}>

          <View style={{justifyContent: "center", alignItems: "center", flex: 1,}}>
            <View style={
              [
                chatStyles.chatBackground,
                {
                  borderColor: customTheme.borderColor,
                  backgroundColor: customTheme.view
                }
              ]
            } >
              <Text style={{gap: 20, fontSize: 30, color: "rgba(0, 0, 0, .4)"}}>
                AIX
              </Text>

            </View>
            <FlatList
              inverted
              style={{width: "100%", height: "100%"}}
              data={messages}
              contentContainerStyle={{ flexDirection: 'column-reverse' }}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ item, index }) => (
                item.type === "text" ? (
                  <>
                    <SingleMessage
                      key={index}
                      item={item}
                      styles={chatStyles}
                      primaryTextStyles={{textAlign: "justify", color: customTheme.text}}
                      secondaryTextStyles={{color: customTheme.text, fontSize: 10, }}
                    />
                  </>
                ):(
                  <>
                    <SingleAudio
                      key={index}
                      item={item}
                      styles={chatStyles}
                      secondaryTextStyles={{color: "white", fontSize: 12}}
                    />
                  </>
                ))}
            />
          </View>

          <View style={{bottom: 20,  flexDirection: "row", justifyContent:"center", alignItems: "center"}}>
            <MessageInputContainer/>
          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
      {logout? (
        <SwipeModal
          bottomSheetRef={bottomSheetRef}
          modalIndex={1}
          Content={
            <StatusContainer
              source={successAuth}
              styles={imgStyles.statusImg}
              extraContainerStyles={undefined}
              text={"You are successfully Logged out"}/>}
        />
      ):null}
    </>
  )
}
/*

  const dismissNewLogoutBox = useCallback(() => {
    dispatch({
      type: "LOGOUT",
      payload: false
    })
    console.log("newLogout: ", logout)
  }, []);
 */