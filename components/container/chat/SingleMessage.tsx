import {DefaultText} from "../../text/DefaultText";
import {Dimensions, StyleSheet, View} from "react-native";
import React, {useContext} from "react";
import {ThemeContext} from "../../../screens/Context";
import CopyButton from "../../buttons/CopyButton";
import {StyleProps} from "react-native-reanimated";
import {userMesssageObject} from "../../../screens/chat/ChatNavigator";


const windowWidth = Dimensions.get('window').width;


const ls = StyleSheet.create(
  {
    input: {
      width: "auto",
      height: "auto",
      backgroundColor: "white",
      textAlign: "justify",
      textAlignVertical: "top",
    },
    infoContainer: {
      flexDirection: "row",
    },
    timeTokenStyles: {
      fontSize: 10,
      position: "absolute",
      left: 10,
      bottom: 3
    }
  }
)


export interface SingleMessageTypes {
  item: userMesssageObject;
  primaryTextStyles: StyleProps;
  secondaryTextStylesText: StyleProps;
  styles?: StyleProps;
}


export const SingleMessage: React.FC<SingleMessageTypes> =
  (
    {
      item,
      styles,
      primaryTextStyles,
      secondaryTextStylesText
    }
  ) => {

  const { customTheme } = useContext(ThemeContext);

  const containerStyles = styles? styles[item.class] : undefined;

  const extraStyles = {
    marginTop: 12, bottom: 0, justifyContent: "space-between", borderRadius: 14,
    backgroundColor: Number(item.id) % 2 === 0 ? customTheme.textMessage : customTheme.aiTextMessage,
    borderColor: customTheme.text, borderWidth: 1,
    /*IOS Props:*/shadowColor: customTheme.text, shadowOpacity: .2, shadowRadius: 14, width: windowWidth * .8
  };

  /*const secondaryTextStylesText: StyleProps =
    [{
      color: customTheme.text,
    }, ls.timeTokenStyles];*/

  const messageText = item.timeToken;

  return(
    <View style={[containerStyles, extraStyles]}>
      <DefaultText text={item.message} moreStyles={primaryTextStyles}/>
      <DefaultText text={messageText.toString()} moreStyles={secondaryTextStylesText}/>
      <CopyButton value={item.message} size={15}/>
    </View>
  );
}





