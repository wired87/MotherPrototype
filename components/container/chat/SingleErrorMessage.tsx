import {memo, useContext} from "react";
import {View, StyleSheet} from "react-native";
import {ThemeContext} from "../../../screens/Context";

const ls = StyleSheet.create(
  {
    main: {
      width: 100,
      height: 100,
      backgroundColor: "red",
    }
  }
)

const SingleErrorMessage = () => {

  const { customTheme } = useContext(ThemeContext);

  return(
    <View style={ls.main}>

    </View>
  );
}

export default memo(SingleErrorMessage);
