import React, {memo, useCallback, useMemo} from "react";
import {Text, StyleSheet, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {LinearGradient} from "expo-linear-gradient";



const ls = StyleSheet.create(
  {
    bgView: {
      backgroundColor: "black",
      borderRadius: 22,
      padding: 0,
      marginTop: 20,
      marginHorizontal: 11,
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 22,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

    },
    icon:{
      marginBottom: 10,
      color: "white",
      opacity: .9
    },
    text:  {
      color: "white",
      fontSize: 19,
      textAlign: "center",
      lineHeight: 25,
      opacity: .9
    }
  }
)

interface ToolitemButton {
  text?: string;
  color: string;
  extraText?: string;
  icon: string
}

const ToolitemButton: React.FC<ToolitemButton> = (
  {
    text,
    color,
    extraText,
    icon
  }
) => {

  const extraTextComponent = useMemo(() => {
    if (extraText) return <Text>{extraText}</Text>
  }, [extraText]);


  const finalButton = useCallback((className: any) => {
    return [className, {width: 170}]
  }, [icon]);

  const getRandomBoolean = useCallback(() => {
    return Math.random() < 0.5
  }, [icon]);

  return(
    <View style={finalButton(ls.bgView)}>
      <LinearGradient
        style={[finalButton(ls.button), {height: getRandomBoolean() ? 100 : 150}]}
        colors={[color, "black"]}
        start={{ x: 0, y: 0 }}
        end={{ x: .1, y: .8 }}>
        <MaterialCommunityIcons size={30} style={ls.icon} name={icon}/>
          <Text style={ls.text}>{text}</Text>
        {extraTextComponent}
      </LinearGradient>
    </View>
  );
}


export default memo(ToolitemButton);

/*
Tools * icon * text * container bg color * category
-------------------

https://callstack.github.io/react-native-paper/docs/guides/icons/

text 2 speech * "text-to-speech" * Voice to Text * 'rgba(255,99,0,.6)' * Assistant
image classify * "bird" + "message-image" * What's on this Image? * "rgba(0,179,0, .7)" * Creative
Application creator * "format-float-left" * Application creator (small text below: Let write AI your Job Application) * "rgba(0,0,98,0.7)" * Assistant
idea finder * "lightbulb-on" * Idea finder (small text below: Creative or ask about Ideas with help of AI) * "rgba(99,14,99, .7)" * Creative
document editor(make image from dec, edit it and download the result) *
get text from image

webAPP
audio, text and/or image to code (output component is editable either noCode or code)
Application creator * "format-float-left" * Application creator (small text below: Let write AI your Job Application) * "rgba(0,0,98,0.7)" * Assistant


 */