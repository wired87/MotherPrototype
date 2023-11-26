import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {HeadingText} from "../../text/HeadingText";
import {DefaultText} from "../../text/DefaultText";
import {ModalContentNoLog} from "./ModalContentNoLog";
import {getAuth} from "firebase/auth";
// @ts-ignore
import React, {useCallback, useEffect, useNavigation, useState} from "react";
import { ActivityIndicator } from "react-native-paper";
import {themeColors} from "../../../colors/theme";
import {uniStyles} from "../../../screens/universalStyles"
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
// Strings
const indicatorSize = "medium";
const historyText = "History";
const noHistoryText = "Could not find any history . . .";
const historyReminder = "To see your Chat History, you must be {\"\\n\"} logged in.";
const loginText = "Login";
const registerText = "Register";

export const ChatMenuModalContent = (
    // @ts-ignore
    {  changeText, dispatchHistorySent, /*extraAction*/ }
) => {
  // @ts-ignore
  const historySent = useSelector(state => state.historySent.value)
  // @ts-ignore
  const loading = useSelector(state => state.loading.value)
  const [history, setHistory] = useState([])
  const user = getAuth().currentUser
  const dispatch = useDispatch()

  const dispatchUserData = async () => {
    dispatch({
      type: "LOADING",
      payload: true
    });
    try {
      console.log("USER ID NAVIGATION: ", user?.uid)
      const response =
        await axios.post("http://192.168.178.51:8000/open/chat-history/", {
            "user_id": user?.uid
          }
        )
      console.log("Chat History response:", response.data.chat_history)
      setHistory(response.data.chat_history);
      console.log("data list: ", history);
    } catch(error) {
      console.log("There was an error get the User ID: ", error);
    } finally {
      dispatch({
        type: "LOADING",
        payload: false
      });
    }
  }

  useEffect( () => {
    console.log("user 1, 2:", user)
    if (user) {
      dispatchUserData().then(() => console.log("Successful requested User Data")).catch(() => {console.log("FAIL IN dispatchUserData")})
    }
  }, [user]);

  return(
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

      <View
        style={{
          justifyContent: "flex-start",
          flex: 1,
          ...StyleSheet.absoluteFillObject,
          alignItems: "center",
          paddingBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: themeColors.borderThin,
          marginTop: 40
        }}
      >
      <HeadingText text={historyText} extraStyles={undefined}/>
      </View>
      <View>
        {user ? (
          loading ? (
            <>
              <ActivityIndicator
                color={themeColors.sexyBlue}
                // @ts-ignore
                size={indicatorSize}/>
            </>
          ) : (
            history?.length > 0? (
              <View style={uniStyles.reminderModalContainer}>
                <FlatList
                  // @ts-ignore
                  data={history}
                  style={uniStyles.historyList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={uniStyles.historyItem}
                      onPress={() => {
                        changeText(item)
                        dispatchHistorySent(true)
                      }}>
                     <DefaultText text={item} moreStyles={undefined} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(_item, index) => index.toString()}
                />
              </View>
            ) : (
              <DefaultText text={noHistoryText} moreStyles={undefined}/>
            )
          )
        ):(
          <ModalContentNoLog />
        )}
      </View>
    </View>
    );
}