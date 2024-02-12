
import {StyleSheet, Dimensions} from "react-native";
const windowWidth:number = Dimensions.get('window').width;

export const motherMainStyles = StyleSheet.create(
  {
    justifyAlignCenter: {
      justifyContent: "center",
      alignItems: "center",
    },
    flatList: {
      width: windowWidth,
      padding: 3
    },
    marginVertical10: {
      marginVertical: 10
    },
    marginVer50: {
      marginVertical: 50,

    },
    flexColumn: {
      flexDirection: "column"
    },
    flex: {
      flex: 1,
    }
  }
)