import React, {memo, useCallback, useContext} from "react";
import {Linking, Pressable, StyleSheet, Text} from "react-native";
import {ThemeContext} from "../../screens/Context";

const ls = StyleSheet.create(
  {
    main: {
      paddingHorizontal: 5,
      backgroundColor: "transparent",
      bottom: 0,
      shadowOpacity: .2,
      shadowRadius: 14,
      color: "white",
      paddingVertical: 5,
      width: 130,
      borderRadius: 9,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
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

  const color:object = {color: "white"}
  const buttonText = [{marginVertical: 5, marginHorizontal: 7, fontSize: 13}, color]

  const sendMail = useCallback(() => {
    const errorUrl: string =
      `https://mail.google.com/mail/?view=cm&fs=1&to=codingWizardaix@gmail.com&su=Error-while-Application-Process-detected&body=${problem}`
      Linking.openURL(errorUrl).then(() => {})
  }, [problem]);

  return(
    <Pressable style={styles} onPress={() => sendMail()}>
      <Text style={buttonText}>E-Mail</Text>
    </Pressable>
  );
}

export default memo(ErrorMailButton);