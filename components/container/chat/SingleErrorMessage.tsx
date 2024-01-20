import React, {memo, useCallback, useContext, useState} from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import {ThemeContext} from "../../../screens/Context";
import ContactAutoButton from "../../buttons/ContactAutoButton";
import {ContactFormTypes} from "../modalContainers/Contact/Contact";
import {getAuth} from "firebase/auth";
import {DefaultText} from "../../text/DefaultText";
import {userMesssageObject} from "../../../screens/chat/ChatNavigator";
import {toolStyles as ts} from "../../../screens/tools/toolStyles";
import ErrorMailButton from "../../buttons/ErrorMailButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get('window').width;

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
      width: windowWidth * .8
    },
    buttonContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      alignItems:"center",
      paddingVertical: 10,
      paddingHorizontal: 0,
      marginHorizontal: 0,
      marginVertical: 10,
    },
    singleButtonContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },

  }
)

interface SingleErrorTypes {
}
interface SingleErrorTypes {
  item: userMesssageObject;
}

const SingleErrorMessage: React.FC<SingleErrorTypes> = (
  {
    item
  }
) => {
  // CONTEXT
  const { customTheme } = useContext(ThemeContext);
  const [response, setResponse ] = useState<string>("");
  const [error, setError ] = useState<string>("");
  const [status, setStatus ] = useState<number>(0);
  const [fieldError, setFieldError] = useState<string>("");

  // STYLES
  const extraStyles = [ls.main, {
    borderColor: customTheme.text,
    shadowColor: customTheme.text,
  }];

  const form: ContactFormTypes = {
    option: "problem",
    first_name: getAuth()?.currentUser?.uid || "unknown",
    last_name: "unknown",
    e_mail: getAuth()?.currentUser?.email || "unknown",
    message: item.message
  }

  const messageTime = item.timeToken;

  const sendButton = useCallback(() => {
    if (status == 500 && !response){
      return(
        <View style={ls.singleButtonContainer}>
          <DefaultText text={"Could not send the Message"} />
          <MaterialCommunityIcons color={customTheme.errorText} name={"close"}/>
          <View style={ls.singleButtonContainer}>
            <ErrorMailButton problem={item.message} />
          </View>
        </View>
      )
    }else if (response && !(status == 500) && error.length == 0) {
      return(

        <>
          <MaterialCommunityIcons color={customTheme.errorText} name={"close"}/>
          <DefaultText text={"Successfully sent Message"} />
        </>
      )
    }else {
      return (
        <View style={ls.buttonContainer}>
          <View style={ls.singleButtonContainer}>
            <ErrorMailButton problem={item.message}/>
          </View>
          <View style={ls.singleButtonContainer}>
            <DefaultText text={"Inform us by one click"}/>
            <ContactAutoButton
              form={form}
              setFieldError={setFieldError}
              setError={setError}
              setResponse={setResponse}
            />
          </View>
        </View>
      );
    }
  }, [form, response, error, status]);


  return(
    <View style={extraStyles}>
      <DefaultText text={item.message}/>
      {sendButton()}
      <DefaultText text={messageTime.toString()} moreStyles={ts.text}/>
    </View>
  );
}

export default memo(SingleErrorMessage);
