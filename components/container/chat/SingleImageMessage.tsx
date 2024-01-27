import {DefaultText} from "../../text/DefaultText";
import {Dimensions, View, Image, StyleSheet} from "react-native";
import React, {memo, useContext} from "react";
import {ThemeContext} from "../../../screens/Context";
import CopyButton from "../../buttons/CopyButton";
import {StyleProps} from "react-native-reanimated";
import  {userMesssageObject} from "../../../screens/chat/ChatNavigator";


const windowWidth = Dimensions.get('window').width;




export interface SingleImageMessageTypes {
  item: userMesssageObject;
  primaryTextStyles: StyleProps;
  secondaryTextStylesText: StyleProps;
  styles?: StyleProps;
}


const SingleImageMessage: React.FC<SingleImageMessageTypes> =
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

    const messageTime = item.timeToken;

    return(
      <View style={[containerStyles, extraStyles]}>
        {item.image? (
          <Image style={ls.image} source={{uri: item.image}} />
        ):null}
        <DefaultText text={item.message} moreStyles={primaryTextStyles}/>
        <DefaultText text={messageTime.toString()} moreStyles={secondaryTextStylesText}/>
        <CopyButton value={item.message} size={15}/>
      </View>
    );
  }

export default memo(SingleImageMessage);



const ls = StyleSheet.create(
  {
    image: {
      resizeMode: "cover",
      width: "90%",

    }
  }
)