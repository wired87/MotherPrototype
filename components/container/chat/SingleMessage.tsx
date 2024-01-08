import {DefaultText} from "../../text/DefaultText";
import {Dimensions, View} from "react-native";
import React, {useContext} from "react";
import {ThemeContext} from "../../../screens/Context";
import CopyButton from "../../buttons/CopyButton";

const windowWidth = Dimensions.get('window').width;
// @ts-ignore
export const SingleMessage = ({ item, styles, primaryTextStyles, secondaryTextStyles }) => {

  const { customTheme } = useContext(ThemeContext);

  const extraStyles = {
    marginTop: 12, bottom: 0, justifyContent: "space-between", borderRadius: 14,
    backgroundColor: item.id % 2 === 0 ? customTheme.textMessage : customTheme.aiTextMessage,
    borderColor: customTheme.text, borderWidth: 1,
    /*IOS Props:*/shadowColor: customTheme.text, shadowOpacity: .2, shadowRadius: 14, width: windowWidth * .8
  };

  return(
    <View style={[styles[item.class], extraStyles]}>
      <DefaultText text={item.message} moreStyles={primaryTextStyles}/>
      <DefaultText text={item.timeToken} moreStyles={secondaryTextStyles}/>
      <CopyButton value={item.message} size={15}/>
    </View>
  );
}

