import {DefaultContainer} from "../../../components/container/DefaultContainer";
import {ActivityIndicator} from "react-native";
import {DefaultText} from "../../../components/text/DefaultText";
import {useDispatch, useSelector} from "react-redux";
import {HeadingText} from "../../../components/text/HeadingText";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {useContext, useEffect, useState} from "react";
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import {themeColors} from "../../../colors/theme";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";
import {AuthContext, PrimaryContext, ThemeContext} from "../../Context";


export const EmailConfirmationFP = () => {

  const {email, setEmail} = useContext(AuthContext);

  const [errorMessage, setError] =
    useState<{ code: string; helpText: string } | null>(null);
  const [finalError, setFinalError] =
    useState<{ code: string; helpText: string } | null>(null);
  const { customTheme } = useContext(ThemeContext);
  // @ts-ignore
  const loading = useSelector(state => state.loading.value)

  // @ts-ignore
  const colors = useSelector(state => state.colors.value)

  const navigation = useNavigation()
  const auth = getAuth();

  const dispatch = useDispatch()
  const sendOTP = async (email: string) => {
    dispatch({
      type: "LOADING",
      payload: true
      }
    )
    try {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          // @ts-ignore
            navigation.navigate("NewPasswordConfirmation")
        })
    } catch (e) {
      // @ts-ignore
      setError(e.message)


    } finally {
      dispatch({
          type: "LOADING",
          payload: false
        }
      )
      console.log("errorMessage", errorMessage);
      console.log("finalError: ", finalError)
    }
  };

  useEffect(() => {
    console.log("error: ", errorMessage)
  }, []);

  return (
    <DefaultContainer
      extraStyles={{flexDirection: "column", elevation: 20, backgroundColor: customTheme.primary}}>

      {loading ? (
        <ActivityIndicator size={"large"}/>
      ) : (
        <>
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
          <DefaultText
            text={"We will send you a confirmation Mail"}
            moreStyles={{color: customTheme.text}}/>
          <DefaultButton
            extraStyles={undefined} // @ts-ignore
            onPressAction={() => sendOTP(email)}
            text={"Send Mail"}
            secondIcon={undefined}
          />
          {errorMessage ? (
            <DefaultText
              text={errorMessage}
              moreStyles={{ color: themeColors.deleteRed }}
            />
          ):null}
        </>
      )}
    </DefaultContainer>
  );
}