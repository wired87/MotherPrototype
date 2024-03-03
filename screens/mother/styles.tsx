
import {StyleSheet} from "react-native";
import {windowWidth} from "../chat/chatStyles";

export const motherMainStyles = StyleSheet.create(
  {
    flatList: {
      width: windowWidth,
      padding: 3,
    },
    marginVertical10: {
      marginVertical: 10
    },
    marginVer50: {
      marginVertical: 50,
    },
    marginHor10: {
      marginHorizontal: 10,
    },
    flexColumn: {
      flexDirection: "column"
    },
    flex: {
      flex: 1,
    }
  }
)