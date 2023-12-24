import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../../screens/Context";

/*
"C-3PO", "Computer", "R2D2", "Optimus Prime", "SkyNet", "JARVIS", "Morpheus", "RoboCop"
const aiNameList = ["Computer"];
const aiName = aiNameList[Math.floor(Math.random() * aiNameList.length)];
 */



const aiName = "Computer";

export const TypeIndicator = () => {

  const { customTheme } = useContext(ThemeContext);

  return (
    <View
      style={styles.dots}>
      <Text style={[styles.typeIndicatorText, {color: customTheme.text}]}>Generate Answer...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    borderRadius: 50,
    width: 10,
    height: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  dots: {
    left: 0,
    flexDirection: "row",
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  typeIndicatorText: {
    opacity: .6,
    fontSize: 13,
    fontFamily: "typeIndicator",
  }
}
)

