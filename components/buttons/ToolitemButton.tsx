import React, {memo, useCallback, useMemo} from "react";
import {Text, StyleSheet, Pressable} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";



const ls = StyleSheet.create(
  {
    bgView: {
      backgroundColor: "black",
      borderRadius: 22,
      paddingVertical: 0,
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
      opacity: .9
    },
    text:  {
      color: "white",
      fontSize: 19,
      textAlign: "center",
      lineHeight: 25,
      opacity: .9,
      fontFamily: "JetBrainsMono"
    },
    extraText: {
      color: "white",
      textAlign: "center",
      fontSize: 14,
      marginTop: 10,
    }
  }
)

let coolColors = [
  "#232f44",
  "rgba(7,32,68,0.51)",// "rgba(7,40,65,0.36)", "rgba(7,5,61,0.2)", "rgba(7,9,56,0.4)" "rgba(0,43,72,0.7)", "rgb(43,33,84)",
]

function randomChoice(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

interface ToolitemButton {
  text?: string;
  color: string;
  extraText?: string;
  icon: string,
  navigationScreen?: string;
}

const ToolitemButton: React.FC<ToolitemButton> = (
  {
    text,
    color,
    extraText,
    icon,
    navigationScreen

  }
) => {

  const navigation = useNavigation();

  const extraTextComponent = useMemo(() => {
    const extratextStyles = [ls.extraText]
    if (extraText) return <Text style={extratextStyles}>{extraText}</Text>
  }, [extraText]);


  const finalButton = useCallback((className: any) => {
    return [className, {width: 170}]
  }, [icon]);

  const getRandomBoolean = useCallback(() => {
    return Math.random() < 0.5
  }, [icon]);

  const navigate = useCallback(() => {
    if (navigationScreen) {
      // @ts-ignore
      navigation.navigate(navigationScreen);
    }
  }, [navigationScreen, navigation]);


  return(
    <Pressable style={finalButton(ls.bgView)} onPress={navigate}>
      <LinearGradient
        style={[finalButton(ls.button), {height: getRandomBoolean() ? 150 : 200}]}
        colors={[randomChoice(coolColors), "black"]}
        start={{ x: 0, y: 0 }}
        end={{ x: .1, y: .8 }}>
        <MaterialCommunityIcons size={30} style={ls.icon} color={color} name={icon} />
          <Text style={ls.text}>{text}</Text>
      </LinearGradient>
    </Pressable>
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