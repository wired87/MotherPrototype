import {FlatList, View, ActivityIndicator} from "react-native";
import {HeadingText} from "../../text/HeadingText";
import {DefaultText} from "../../text/DefaultText";

import React, {memo, useContext, useMemo} from "react";
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
    // filter th e last 5 textMessages from user
    const textItems = messages.filter(item => item.type === 'text' && item.publisher === "USER");
    const numberOfItems = textItems.length < 5 ? textItems.length : 5;
    const lastItems = textItems.slice(-numberOfItems);
    
    if (loading) {
      return <ActivityIndicator color={customTheme.primaryButton} size={indicatorSize} />;
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

