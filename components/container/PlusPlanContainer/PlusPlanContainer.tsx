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
      marginBottom: 5,
      fontFamily: "JetBrainsMono"
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
    text: "Free Access to Google's Gemini-Pro Model"
  },
  {
    text: "Unlimited Access and Messages"
  },
  {
    text: "Many AI based Tools"
  },
];

// const BOTTOM_COLORS = ['#0e198c', '#1d155e', '#7F00FF', '#0e198c'];

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
