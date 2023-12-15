import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Text, View} from "react-native";
import React, {memo} from "react";
import {styles} from "./plusContainerStyles";

interface SingleproContainerTypes {
  text: string;
}
const SingleProContainer: React.FC<SingleproContainerTypes> = (
    { text }
) => {
  return(
    <View style={styles.singleProtextContainer}>
      <Icon name={"check"} size={20} color="#2eb82e" />
      <Text style={styles.topBtnTxt}>
        {text}
      </Text>
    </View>
  );
}
export default memo(SingleProContainer);