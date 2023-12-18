import {Text, View, StyleSheet} from "react-native";
import React from "react";
import {styles} from "../../styles";
import {settingStyles} from "../../../screens/settings/settingStyles";
import SingleProContainer from "./SingleProContainer";


const localStyles = StyleSheet.create(
  {
    text: {
      color: 'white',
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5
    },
    moreTextStyles: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white"
    }
  }
)

let optionsData = [
  {
    text: "Free Access to Google's Gemini Model"
  },
  {
    text: "Unlimited Access and Messages"
  },
]
const BOTTOM_COLORS = ['#0e198c', '#1d155e', '#7F00FF', '#0e198c'];
export const PlusAdContainer = () => {

  const mainContainerStyles = [settingStyles.topBtn, {backgroundColor: 'rgba(127,0,255,0.8)'}];

  return(
    <View style={mainContainerStyles} >
      <View style={styles.header}>
        <Text style={localStyles.text}>Features in this App</Text>
      </View>
      {optionsData.map((item, index) => (
        <SingleProContainer key={index} text={item.text} />
      ))}
    </View>
  );
}

/*
import {Pressable, Text, View, StyleSheet} from "react-native";
import React, {useCallback, useContext, useMemo} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {styles} from "../../styles";
import {settingStyles} from "../../../screens/settings/settingStyles";
import SingleProContainer from "./SingleProContainer";
import {useDispatch, useSelector} from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {DefaultText} from "../../text/DefaultText";
import {ThemeContext} from "../../../screens/Context";

const localStyles = StyleSheet.create(
  {
    text: {
      color: 'white',
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5
    },
    moreTextStyles: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white"
    }
  }
)

let optionsData = [
    {
        text: "Unlimited Access and Messages"
    },
    {
        text: "Access to GPT-4"
    },
    {
        text: "No Ads anymore!"
    },
]
const BOTTOM_COLORS = ['#0e198c', '#1d155e', '#7F00FF', '#0e198c'];
export const PlusAdContainer = () => {

  const route = useRoute();

  // @ts-ignore
  const text = useSelector(state => state.text.value)
  // @ts-ignore
  const icon = useSelector(state => state.icon.value)
  // @ts-ignore
  const screens = useSelector(state => state.screens.value)

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const irgendwasJuckMichNicht = useMemo(() => {
    if (!(route.name === "PurchaseScreen")) {
      return (
      <Pressable style={styles.btnContainer} onPress={onExplore}>
        <DefaultText text={text.plusPlanButton} moreStyles={localStyles.moreTextStyles}/>
        <MaterialCommunityIcons name={icon.arrow} size={28} color="rgba(255,255,255,.8)" />
      </Pressable>
      )}
  }, [route.name])

  const onExplore = useCallback(() => {
      console.log("route: ", route)
      if (route.name === "AccountMain") {
          console.log("PURCHASEACCESS")
          dispatch({
              type: 'PURCHASEACCESS',
              payload: true
          });
      }

    navigation.navigate("Settings", {screen: "PurchaseScreen"});


  }, []);
  const mainContainerStyles =
    [settingStyles.topBtn, {backgroundColor: 'rgba(127,0,255,0.8)'}];
  return(
    <View style={mainContainerStyles} >
      <View style={styles.header}>
        <Text style={localStyles.text}>Upgrade To Pro</Text>
      </View>
      {optionsData.map((item, index) => (
        <SingleProContainer key={index} text={item.text} />
      ))}
      {irgendwasJuckMichNicht}
    </View>
  );
}
 */