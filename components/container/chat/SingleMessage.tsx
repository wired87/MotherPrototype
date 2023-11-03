import {DefaultText} from "../../text/DefaultText";
import {View} from "react-native";
import React from "react";
import {chatStyles} from "../../../screens/chat/chatStyles";


// @ts-ignore
export const SingleMessage = ({ item, styles, primaryTextStyles, secondaryTextStyles, timeText, text }) => {
  return(
    <View key={item.id} style={[styles[item.class],
      item.id % 2 === 0 ? {left: 0} : {right: 0},
      {marginBottom: 12, justifyContent: "space-between"}]}>
      <DefaultText text={text} moreStyles={primaryTextStyles}/>
      <DefaultText text={timeText} moreStyles={secondaryTextStyles}/>
    </View>
  );
}
/*
<View key={item.id} style={[chatStyles[item.class],
  // @ts-ignore
  item.id % 2 === 0 ? {left: 0} : {right: 0},
  {marginBottom: 12, justifyContent: "space-between"}]}>
  {/* @ts-ignore *}
  <DefaultText text={item.message} moreStyles={undefined}/>
  <DefaultText text={item.timetoken} moreStyles={undefined}/>
</View>


 */
