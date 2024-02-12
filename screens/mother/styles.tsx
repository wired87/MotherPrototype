
import {StyleSheet, Dimensions} from "react-native";
const windowWidth = Dimensions.get('window').width;

export const motherMainStyles = StyleSheet.create(
  {
    justifyAlignCenter: {
      justifyContent: "center",
      alignItems: "center",
    },
    flatList: {
      width: windowWidth,
      padding: 3
    }

  }
)