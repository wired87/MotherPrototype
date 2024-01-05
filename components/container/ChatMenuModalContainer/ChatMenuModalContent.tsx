import {FlatList, View} from "react-native";
import {HeadingText} from "../../text/HeadingText";
import {DefaultText} from "../../text/DefaultText";

import React, {memo, useContext, useMemo} from "react";
import { ActivityIndicator } from "react-native-paper";
import {themeColors} from "../../../colors/theme";
import {uniStyles} from "../../../screens/universalStyles"
import {InputContext, PrimaryContext, ThemeContext} from "../../../screens/Context";
import {HistoryItem} from "./HistoryItem";

// Strings
const indicatorSize = "large";
const historyText = "History";
const noHistoryText = "Could not find any history . . .";

const ChatMenuModalContent = (
    // @ts-ignore
    { changeText }
) => {

  const {
    user,
    loading,

  } = useContext(PrimaryContext);

  const { messages } = useContext(InputContext);
  const { customTheme } = useContext(ThemeContext);

  // Styles
  const extraTextStyles = {color: customTheme.text};

  //////////////////////////////////

  const renderContent = useMemo(() => {
    console.log("USER IN HISTORY CONTENT CONTAIENR", user)
    // filter th e last 5 textMessages from user
    const textItems = messages.filter(item => item.type === 'text' && item.publisher === "USER");
    const numberOfItems = textItems.length < 5 ? textItems.length : 5;
    const lastItems = textItems.slice(-numberOfItems);

    /*if (!user) {
      return <ModalContentNoLog />;
    }*/
    if (loading) {
      return <ActivityIndicator color={themeColors.sexyBlue} size={indicatorSize} />;
    }
    else if (lastItems?.length > 0 && user) {
      return (
        <View style={uniStyles.reminderModalContainer}>
          <FlatList
            data={lastItems}
            style={uniStyles.historyList}
            renderItem={({ item }) => (
              <HistoryItem
                item={item}
                onPress={changeText}
              />
            )}
            keyExtractor={(_item, index) => index.toString()}
          />
        </View>
      );
    }
    else if (user?.uid) {
      return <DefaultText text={noHistoryText} moreStyles={extraTextStyles}/>;
    }
  }, [messages, user, loading])

  return(
    <View style={uniStyles.main}>
      <View style={uniStyles.secondMain}>
        <HeadingText text={historyText} extraStyles={undefined}/>
      </View>
      {renderContent}
    </View>
  );
}
export default memo(ChatMenuModalContent);




/*
Get User Data from backend
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




 */