import React, {Dispatch, memo, SetStateAction, useCallback, useContext, useState} from "react";
import {StyleSheet, Vibration} from "react-native";
import {DefaultButton} from "./DefaultButton";
import {ContactFormTypes} from "../container/modalContainers/Contact/Contact";
import {CONTACT_REQUEST_URL} from "@env";
import {PrimaryContext} from "../../screens/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ls =  StyleSheet.create(
  {
    main: {

    },
    button: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 25
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


  return(
    <DefaultButton
      onPressAction={sendData}
      extraStyles={ls.button}
      text={"Send"}
      secondIcon={
        <MaterialCommunityIcons name={"email-open-multiple-outline"} size={18} color="white" />
      }
    />
  );
}

export default memo(ContactAutoButton);