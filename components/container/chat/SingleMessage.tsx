import {DefaultText} from "../../text/DefaultText";
import {View} from "react-native";
import React from "react";


// @ts-ignore
export const SingleMessage = ({ item, styles, primaryTextStyles, secondaryTextStyles, timeText, text }) => {
  return(
    <View key={item.id} style={[styles[item.class],
      item.id % 2 === 0 ? {left: 0} : {right: 0},
      {marginTop: 12, bottom: 0, justifyContent: "space-between"}]}>
      <DefaultText text={text} moreStyles={primaryTextStyles}/>
      <DefaultText text={timeText} moreStyles={secondaryTextStyles}/>
    </View>
  );
}
