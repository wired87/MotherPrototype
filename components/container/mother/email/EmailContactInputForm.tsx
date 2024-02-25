import React, {memo, useContext, useEffect, useState} from "react";
import {SafeAreaView, View} from "react-native";
import {StyleProps} from "react-native-reanimated";
import {uniStyles as us} from "../../../../screens/universalStyles";
import {PrimaryContext, ThemeContext} from "../../../../screens/Context";
import LockModal from "../../../modals/LockModal";
import {DefaultInput} from "../../../input/DefaultInput";
import {DefaultButton} from "../../../buttons/DefaultButton";
import TextStream from "../../../text/TextStream";
import {CREATE_EMAIL_CONTACT_URL, MEDIA_URL} from "@env";
import {emailContactPostObject} from "../../../../AppFunctions/GetObjectFunctions";


const serviceName:string = "Add Contact";
const inputLen:number = 200

const emailPlaceholder:string = "example@gmail.com";
const emailLabel:string = "Contact Email-Address";

const synonymPlaceholder:string = "example";
const synonymLabel:string = "The Contact identifier";

const buttonText:string = "Add Contact";

interface EmailContactInputFormTypes {
  success: string;
  updateSuccess: (value:string) => void;
}
const EmailContactInputForm: React.FC<EmailContactInputFormTypes> = (

  {
    success,
    updateSuccess
  }

) => {

  const [email, setEmail] = useState<string>("");
  const [synonym, setSynonym] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const {customTheme} = useContext(ThemeContext);

  // STYLES
  const standardContainer:StyleProps[]  = [
    us.justifyAlignCenter,
    us.fullScreenWidth,
    us.paddingH20,
  ];

  const {defaultPostRequest, jwtToken} = useContext(PrimaryContext);

  const backgroundColor:StyleProps  = {backgroundColor: customTheme.primary};
  const mainContainerStyles:StyleProps[]  = [us.scrollMain, us.paddingV50, backgroundColor, us.justifyAlignCenter];

  const inputCheck = (): boolean => {
    if (email.trim().length === 0 && synonym.trim().length === 0){
      setError("noInput")
      return false;
    }
    return true;
  }

  const sendContact = async () => {
    console.log()
    if(inputCheck()) {
      await defaultPostRequest(
        CREATE_EMAIL_CONTACT_URL,
        emailContactPostObject(email, synonym),
        setError,
        setResponse,
      )
    }
  }


  useEffect(() => {
    if(["success"].includes(response)) {
      updateSuccess("success")
    }
  }, [response]);


  return(
    <SafeAreaView style={mainContainerStyles}>

      <View style={standardContainer}>
        <TextStream message={serviceName} />
      </View>

      <DefaultInput
        onChangeAction={setEmail}
        value={email}
        placeholder={emailPlaceholder}
        keyboardType={"email-address"}
        max_length={inputLen}
        label={emailLabel}
      />

      <DefaultInput
        placeholder={synonymPlaceholder}
        keyboardType={"ascii-capable"}
        max_length={inputLen}
        label={synonymLabel}
        onChangeAction={setSynonym}
        value={synonym}
      />

      <DefaultButton
        extraStyles={undefined}
        onPressAction={sendContact}
        text={buttonText}
      />

    </SafeAreaView>
  )
}
export default memo(EmailContactInputForm);