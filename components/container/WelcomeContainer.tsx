import React, {memo} from "react";
import {StyleSheet, View} from "react-native";
import {HeadingText} from "../text/HeadingText";
import {DefaultText} from "../text/DefaultText";

// STRINGS
const headingText:string = "Welcome to the Beta!";
const welcomeText:string = "Im Happy you are here \njoining the Beta!";
const reminder :string= "We work really hard to make the experience best possible for you. \n We would appreciate " +
  "to report any Bugs that you can find. \n We are 24/7 available and will solve it asap!";
const wishes:string = "Have a great Time!"


const ls = StyleSheet.create(
  {
    main: {
      flex: 1, justifyContent: "flex-start", alignItems: "flex-start", borderWidth: 2, borderColor: "red"
    },
    welcomeTextBig: {

    },
    welcomeTextSmall: {

    },
    defaultView: {
      justifyContent: "center",
      alignItems: "center",

    }
  }
)


const WelcomeContainer: React.FC = () => {

  return(
    <View style={ls.main}>
      {/*SOME MASCOT ANIMATION HERE*/}
      <View style={ls.defaultView}>
        <HeadingText text={headingText} extraStyles={undefined}  />
      </View>

      <DefaultText moreStyles={ls.welcomeTextBig} text={welcomeText}/>
      <DefaultText moreStyles={ls.welcomeTextSmall} text={reminder}/>
      <DefaultText moreStyles={ls.welcomeTextSmall} text={wishes}/>
    </View>
  );
}


export default memo(WelcomeContainer);