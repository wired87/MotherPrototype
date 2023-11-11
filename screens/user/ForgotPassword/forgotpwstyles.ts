import {Dimensions, StyleSheet} from "react-native";
import {themeColors} from "../../../colors/theme";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const pwResetStyles = StyleSheet.create({
  inputContainer: {
    height: 100,
    width: 57,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: themeColors.borderThin,
  },
  numPadView: {
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: windowWidth * .9

  }
});