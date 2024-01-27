import React, {memo, useCallback, useContext, useState} from "react";
import {View, StyleSheet, Dimensions, ActivityIndicator} from "react-native";
import {PrimaryContext, ThemeContext} from "../../../screens/Context";
import ContactAutoButton from "../../buttons/ContactAutoButton";
import {ContactFormTypes} from "../modalContainers/Contact/Contact";
import {getAuth} from "firebase/auth";
import {DefaultText} from "../../text/DefaultText";
import {userMesssageObject} from "../../../screens/chat/ChatNavigator";
import {toolStyles as ts} from "../../../screens/tools/toolStyles";
import ErrorMailButton from "../../buttons/ErrorMailButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";
import successSent from "../../../assets/animations/successSent.json";
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
  const { loading } = useContext(PrimaryContext);

  // STYLES
  const extraStyles = [ls.main, {
    borderColor: customTheme.text,
    shadowColor: customTheme.text,
  }];

  const form: ContactFormTypes = {
    option: "problem",
    first_name: "ChatMessageError",
    last_name: "unknown",
    e_mail: getAuth()?.currentUser?.email || "unknown",
    message: `User: ${getAuth()?.currentUser?.uid}, Message:${item.message}, Time: ${item.timeToken}`
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
      return (
        <View style={{width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <LottieView style={{width: 60, height: 60}} source={successSent} autoPlay={true} loop={false}/>
          <DefaultText moreStyles={{marginBottom: 20}} text={"Successfully sent Message"}/>
        </View>
      )
    }else if (loading) {
      return <ActivityIndicator size={"large"} color={customTheme.primaryButton}/>
    }else {
      return (
        <View style={ls.buttonContainer}>
          <View style={ls.singleButtonContainer}>
            <DefaultText text={"Send us a E-Mail"}/>
            <ErrorMailButton problem={item.message} />
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

  const moreTextStyles :object= [ts.text, {position: "absolute", bottom: 2, left: 3, fontSize: 10}]

  return(
    <View style={extraStyles}>
      <DefaultText text={item.message}/>
      {sendButton()}
      <DefaultText text={messageTime.toString()} moreStyles={moreTextStyles}/>
    </View>
  );
}

export default memo(SingleErrorMessage);

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
