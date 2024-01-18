import React, {memo, useContext} from "react";
import {StyleSheet, View} from "react-native";
import {HeadingText} from "../text/HeadingText";
import {DefaultText} from "../text/DefaultText";
import LottieView from "lottie-react-native";
import Party from "../../assets/animations/Party.json";
import {ThemeContext} from "../../screens/Context";

// STRINGS
const headingText:string = "Welcome to the Beta!";
const welcomeText:string = "I'm Happy you are here!";
const reminder:string= "We would appreciate to report any Bug that you can find.";
const wishes:string = "Have a great Time!"


const ls = StyleSheet.create(
  {
    main: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: "transparent",
    },
    text: {
      textAlign: "center",
      fontWeight: "bold",
    },
    wishes: {
      textAlign: "center",
      fontWeight: "bold",
    },
    defaultView: {
      marginTop: 30,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      backgroundColor: "transparent",
      paddingHorizontal: 15,
    },
    lottieStyle: {
      width: "100%",
      backgroundColor: "transparent",
      position: "absolute",
      top: 0,
    }
  }
)

const WelcomeContainer: React.FC = () => {
  const { customTheme } = useContext(ThemeContext);

  const textStyles = [ls.text, {color: customTheme.text}]
  const wishesStyle = [textStyles, {fontSize: 16}];
  const heading:object = {fontFamily: "JetBrainsMono", fontSize: 22};
  return(
    <>
      <LottieView resizeMode={"contain"} style={ls.lottieStyle} source={Party} autoPlay loop />
      <View style={ls.main}>
        <View style={ls.defaultView}>
          <HeadingText text={headingText} extraStyles={heading}  />
        </View>
        <View style={ls.defaultView}>
          <DefaultText moreStyles={textStyles} text={welcomeText}
          />
        </View>
        <View style={ls.defaultView}>
          <DefaultText moreStyles={textStyles} text={reminder}
          />
        </View>
        <View style={ls.defaultView}>
        <DefaultText moreStyles={wishesStyle} text={wishes}
          />
        </View>
      </View>
    </>
  );
}


export default memo(WelcomeContainer);