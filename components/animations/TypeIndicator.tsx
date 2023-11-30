import {Text, View} from "react-native";
import {TypingAnimation} from "react-native-typing-animation";
import {StyleSheet} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../../screens/Context";

const aiNameList = ["C-3PO", "Computer", "R2D2", "Optimus Prime", "SkyNet", "JARVIS", "Morpheus"]
const aiName = aiNameList[Math.floor(Math.random() * aiNameList.length)];

export const TypeIndicator = () => {
  const { customTheme } = useContext(ThemeContext);
  return (
    <View
      style={styles.dots}>
      <Text style={[styles.typeIndicatorText, {color: customTheme.text}]}>{aiName} is typing</Text>
      <TypingAnimation
        dotColor={customTheme.text}
        dotMargin={4}
        dotAmplitude={3}
        dotSpeed={0.25}
        dotRadius={2.5}
        dotX={10}
        dotY={10}
      />
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

  }
}
)