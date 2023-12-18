import {ActivityIndicator, View, StyleSheet} from "react-native";
import {DefaultText} from "../../../components/text/DefaultText";
import {HeadingText} from "../../../components/text/HeadingText";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {useContext, useMemo, useState} from "react";
import {DefaultButton} from "../../../components/buttons/DefaultButton";

import {useNavigation} from "@react-navigation/native";
import {AuthContext, PrimaryContext, ThemeContext} from "../../Context";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";

const localStyles = StyleSheet.create(
  {
    main: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
      paddingTop: 150,
      elevation: 20,
      paddingVertical: 50,
    }
  }
)
export const EmailConfirmationFP = () => {

  const {email, setEmail} = useContext(AuthContext);
  const { loading, setLoading } = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);

  const errorTextColor = { color: customTheme.errorText } //

  const [errorMessage, setError] =
    useState<{ code: string; helpText: string; message: string; } | null>(null);
  const [finalError, setFinalError] =
    useState<{ code: string; helpText: string } | null>(null);

  const navigation = useNavigation()

  const sendOTP = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(getAuth(), email)
        .then(() => {
          // @ts-ignore
            navigation.navigate("NewPasswordConfirmation")
        })
    } catch (e: unknown) {
      if (e instanceof Error) {
        // @ts-ignore
        setError(e.message.toString());
      }
    } finally {
      setLoading(false);
      console.log("errorMessage", errorMessage);
      console.log("finalError: ", finalError)
    }
  };

  const errorMessageText = useMemo(() => {
     if(errorMessage) {
       return (
         <DefaultText
           text={errorMessage}
           moreStyles={errorTextColor}
         />
       )
     }else {
       return(
         <DefaultText
           text={"We will send you a confirmation Mail"}
           moreStyles={{color: customTheme.text}}/>
       );
     }
  }, [errorMessage])

  const content = useMemo(() => {
    if (loading) {
      return (<ActivityIndicator size={"large"}/>);
    } else {
      return(
        <>
          <HeadingText
            text={"Password reset"}
            extraStyles={undefined}/>

          <HeadingText
            text={"E-Mail confirmation"}
            extraStyles={undefined}/>

          <DefaultInput
            placeholder={"Connected E-Mail"}
            value={email}
            onChangeAction={setEmail}
            secure={false}
            editable={true}
            keyboardType={"email-address"}
            extraStyles={undefined}
          />

          {errorMessageText}
          <DefaultButton
            extraStyles={undefined}
            onPressAction={() => sendOTP(email)}
            text={"Send Mail"}
            secondIcon={undefined}
          />
        </>
      )
    }
  }, [loading, email])

  return (
    <View
      style={[localStyles.main, {backgroundColor: customTheme.primary}]}>
      {content}
    </View>
  );
}