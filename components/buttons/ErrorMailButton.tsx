import React, {memo, useCallback, useContext} from "react";
import {Linking, Pressable, StyleSheet} from "react-native";
import {DefaultText} from "../text/DefaultText";
import {ThemeContext} from "../../screens/Context";

const ls = StyleSheet.create(
  {
    main: {
      paddingVertical: 3,
      paddingHorizontal: 5,
      backgroundColor: "transparent",
      marginTop: 12,
      borderRadius: 20,
      bottom: 0,
      borderWidth: 1,
      justifyContent: "space-between",
      shadowOpacity: .2,
      shadowRadius: 14,
      color: "white"
    }
  }
)

interface errorMailButton {
  problem: string;
}

const ErrorMailButton: React.FC<errorMailButton> = (
  {
    problem
  }
) => {
  const { customTheme }  = useContext(ThemeContext)
  const styles = [ls.main, {backgroundColor: customTheme.primaryButton}]



  const sendMail = useCallback(() => {
    const errorUrl: string =
      `https://mail.google.com/mail/?view=cm&fs=1&to=codingWizardaix@gmail.com&su=Error-while-Application-Process-detected&body=${problem}`
      Linking.openURL(errorUrl)
  }, [problem]);

  return(
    <Pressable style={styles} onPress={() => sendMail()}>
      <DefaultText text={"E-Mail"}/>
    </Pressable>
  );
}

export default memo(ErrorMailButton);