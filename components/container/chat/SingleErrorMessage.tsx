import React, {memo, useContext} from "react";
import {View, StyleSheet} from "react-native";
import {ThemeContext} from "../../../screens/Context";
import {SingleMessageTypes} from "./SingleMessage";
import {StyleProps} from "react-native-reanimated";

const ls: StyleProps = StyleSheet.create(
  {
    main: {
      width: 100,
      height: 100,
      backgroundColor: "red",
    }
  }
)


const SingleErrorMessage: React.FC<SingleMessageTypes> = (

) => {

  const { customTheme } = useContext(ThemeContext);

  return(
    <View style={ls.main}>
    </View>
  );
}

export default memo(SingleErrorMessage);
