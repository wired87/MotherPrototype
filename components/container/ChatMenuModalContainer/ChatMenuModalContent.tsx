import {FlatList, Pressable, StyleSheet, View} from "react-native";
import {HeadingText} from "../../text/HeadingText";
import {DefaultText} from "../../text/DefaultText";
import {ModalContentNoLog} from "./ModalContentNoLog";

import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import { ActivityIndicator } from "react-native-paper";
import {themeColors} from "../../../colors/theme";
import {uniStyles} from "../../../screens/universalStyles"
import axios from "axios";
import {PrimaryContext} from "../../../screens/Context";

// Strings
const indicatorSize = "large";
const historyText = "History";
const noHistoryText = "Could not find any history . . .";


const localStyles = StyleSheet.create(
  {
    secondMain: {
      justifyContent: "flex-start",
      flex: 1,
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.borderThin,
      marginTop: 40
    },
    main: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
  }
)

interface HistoryitemTypes {
  item: object | null;
  onPress: void | (() => {}) | any;
}

const HistoryItem: React.FC<HistoryitemTypes> = memo(({ item, onPress }) => (
  <Pressable style={uniStyles.historyItem} onPress={() => onPress(item)}>
    <DefaultText text={item} moreStyles={undefined} />
  </Pressable>
));

const ChatMenuModalContent = (
    // @ts-ignore
    { changeText }
) => {

  const [history, setHistory] = useState([])
  const {
    user,
    loading,
    setLoading
  } = useContext(PrimaryContext);

  const dispatchUserData = async () => {
    setLoading(true);
    try {
      console.log("USER ID NAVIGATION: ", user?.uid)
      const response =
        await axios.post("http://192.168.178.51:8080/open/chat-history/", {
            "user_id": user?.uid
          }
        )
      console.log("Chat History response:", response.data.chat_history)
      setHistory(response.data.chat_history);
      console.log("data list: ", history);
    } catch(error) {
      console.log("There was an error get the User ID: ", error);
    } finally {
      setLoading(false);
     /* dispatch({
        type: "LOADING",
        payload: false
      });*/
    }
  }

  useEffect( () => {
    console.log("user 1, 2:", user)
    if (user) {
      dispatchUserData()
        .then(() => console.log("Successful requested User Data"))
        .catch(() => {console.log("FAIL IN dispatchUserData")})
    }
  }, [user]);
  //////////////////////////////////
  const renderContent = useCallback(() => {
    if (!user) {
      return <ModalContentNoLog />;
    }
    if (loading) {
      return <ActivityIndicator color={themeColors.sexyBlue} size={indicatorSize} />;
    }
    if (history?.length > 0) {
      return (
        <View style={uniStyles.reminderModalContainer}>
          <FlatList
            data={history}
            style={uniStyles.historyList}
            renderItem={({ item }) => (
              <HistoryItem item={item} onPress={changeText} />
            )}
            keyExtractor={(_item, index) => index.toString()}
          />
        </View>
      );
    }
    return <DefaultText text={noHistoryText} moreStyles={undefined} />;
  }, [history, user, loading])

  return(
    <View style={localStyles.main}>
      <View style={localStyles.secondMain}>
        <HeadingText text={historyText} extraStyles={undefined}/>
      </View>
      <>
        {renderContent}
      </>
    </View>
  );
}
export default memo(ChatMenuModalContent);