import {DefaultText} from "../../text/DefaultText";
import {View} from "react-native";
import React from "react";


// @ts-ignore
export const SingleMessage = ({ item, styles, primaryTextStyles, secondaryTextStyles }) => {
  return(
    <View style={[styles[item.class],
      item.id % 2 === 0 ? {left: 0} : {right: 0},
      {marginTop: 12, bottom: 0, justifyContent: "space-between"}]}>
      <DefaultText text={item.message} moreStyles={primaryTextStyles}/>
      <DefaultText text={item.timeToken} moreStyles={secondaryTextStyles}/>
    </View>
  );
}

