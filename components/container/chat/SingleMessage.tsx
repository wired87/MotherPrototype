import {DefaultText} from "../../text/DefaultText";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import React, {useContext} from "react";
import {ThemeContext} from "../../../screens/Context";
import CopyButton from "../../buttons/CopyButton";
import {StyleProps} from "react-native-reanimated";
import {userMesssageObject} from "../../../screens/chat/ChatNavigator";


const windowWidth = Dimensions.get('window').width;




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
    marginTop: 12, bottom: 0, justifyContent: "space-between", borderRadius: 14, minHeight: 70,paddingBottom: 20,
    backgroundColor: Number(item.id) % 2 === 0 ? customTheme.textMessage : customTheme.aiTextMessage,
    borderColor: customTheme.text, borderWidth: 1,
    /*IOS Props:*/shadowColor: customTheme.text, shadowOpacity: .2, shadowRadius: 14, width: windowWidth * .8
  };

  const messageTime = item.timeToken;
  return(
    <View style={[containerStyles, extraStyles]}>
      {item.file? (
        <Image style={ls.image} source={{uri: item.file}} />
      ):null}
      <DefaultText text={item.message} moreStyles={primaryTextStyles}/>
      <DefaultText text={messageTime.toString()} moreStyles={secondaryTextStylesText}/>
      <CopyButton value={item.message} size={15}/>
    </View>
  );
}


const ls = StyleSheet.create(
  {
    image: {
      resizeMode: "cover",
      width: "100%",
      height: 200,
      top: 0,
      borderRadius: 14,
      marginBottom: 10,
    }
  }
)
