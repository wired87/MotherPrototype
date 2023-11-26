import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
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
import {InputContext, PrimaryContext} from "../Context";
import BottomSheet from "@gorhom/bottom-sheet";

export const ChatMain = (
  // @ts-ignore
  {sendMessageProcess}
) => {
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState(false);

  const { messages } = useContext(InputContext);
  const { darkmode } = useContext(PrimaryContext);
  // @ts-ignore
  const colors = useSelector(state => state.colors.value)

  const bottomSheetRef = useRef<BottomSheet>(null);

  // @ts-ignore
  const logout = useSelector(state => state.logout.value);


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
      <SafeAreaView style={{ backgroundColor: colors.primary[darkmode? 1 : 0], flex: 1, paddingTop: insets.top }}>
        <KeyboardAvoidingView
          style={{ paddingTop: insets.top, backgroundColor: colors.primary[darkmode? 1 : 0], flex: 1,
            marginBottom: Platform.OS === "ios" ? 20 : 0, flexDirection: "column" }}>

          <View style={{justifyContent: "center", alignItems: "center", flex: 1,}}>
            <View style={{backgroundColor: colors.view[darkmode? 1 : 0], zIndex: 0,
              borderColor: colors.borderColor[darkmode? 1 : 0], position: "absolute", alignItems: "center",
              justifyContent: "center", width: windowWidth * .9, height: "80%",
              marginVertical: "50%", borderRadius: 14}} >

              <Text style={{gap: 20, fontSize: 30, color: darkmode? "rgba(255,255,255,.2)" : "rgba(0,0,0,.2)"}}>
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
                      primaryTextStyles={{textAlign: "justify", color: colors.text[darkmode? 1 : 0]}}
                      secondaryTextStyles={{color: colors.text, fontSize: 10, }}
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
            <MessageInputContainer sendMessageProcess={sendMessageProcess}/>
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
