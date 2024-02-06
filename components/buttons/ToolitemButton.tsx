import React, {memo, useCallback} from "react";
import {Text, StyleSheet, Pressable} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {DataItem} from "../../screens/tools/ToolsMain";



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
  item: DataItem;
}

const ToolitemButton: React.FC<ToolitemButton> = (
  {
    item
  }
) => {

  const navigation = useNavigation();


  const finalButton = useCallback((className: any) => {
    return [className, {width: 170}]
  }, [item.icon]);

  const getRandomBoolean = useCallback(() => {
    return Math.random() < 0.5
  }, [item.icon]);

  const navigate = useCallback(() => {
    if (item.screen) {
      // @ts-ignore
      navigation.navigate(item.navigation, {screen: item.screen});
    }
  }, [item.screen, navigation]);


  return(
    <Pressable style={finalButton(ls.bgView)} onPress={navigate}>
      <LinearGradient
        style={[finalButton(ls.button), {height: getRandomBoolean() ? 150 : 200}]}
        colors={[randomChoice(coolColors), "black"]}
        start={{ x: 0, y: 0 }}
        end={{ x: .1, y: .8 }}>
        <MaterialCommunityIcons size={30} style={ls.icon} color={item.color} name={item.icon} />
          <Text style={ls.text}>{item.text}</Text>
      </LinearGradient>
    </Pressable>
  );
}


export default memo(ToolitemButton);
