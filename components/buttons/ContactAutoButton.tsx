import React, {Dispatch, memo, SetStateAction, useCallback, useContext} from "react";
import {Pressable, StyleSheet, Text, Vibration} from "react-native";
import {ContactFormTypes} from "../container/modalContainers/Contact/Contact";
import {CONTACT_REQUEST_URL} from "@env";
import {PrimaryContext, ThemeContext} from "../../screens/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ls =  StyleSheet.create(
  {
    main: {

    },
    button: {
      paddingVertical: 5,
      width: 130,
      borderRadius: 9,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
    }
  }
)


interface ContactButtonType {
  form: ContactFormTypes;
  setFieldError: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  setResponse: Dispatch<SetStateAction<any>>;
}


const ContactAutoButton: React.FC<ContactButtonType> = (
  {
    form,
    setFieldError,
    setError,
    setResponse,
  }
) => {

  const { defaultPostRequest } = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);
  const color:object = {color: "white"};
  const buttonText = [{marginVertical: 5, marginHorizontal: 7, fontSize: 13}, color]
  const sendData = useCallback(async () => {
    if (form && form["message"].length == 0 && form["last_name"].length == 0 && form["first_name"].length == 0){
      Vibration.vibrate();
      setFieldError("Please submit a Message your first- and last Name.");
      return;
    }
    await defaultPostRequest(
      CONTACT_REQUEST_URL,
      form,
      setError,
      setResponse,
    )
  }, [form]);

  const buttonStyles = [ls.button, {backgroundColor: customTheme.primaryButton}];
  return(
    <Pressable
      onPress={sendData}
      style={buttonStyles}>
      <Text style={buttonText}>Send report</Text>
      <MaterialCommunityIcons name={"email-open-multiple-outline"} size={18} color="white" />
    </Pressable>
  );
}

export default memo(ContactAutoButton);