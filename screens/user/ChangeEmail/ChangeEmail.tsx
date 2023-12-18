import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import {View, SafeAreaView, KeyboardAvoidingView} from 'react-native';

// Lottie animations
import {userStyles} from "../userStyles";
import {useSelector} from "react-redux";
import {HeadingText} from "../../../components/text/HeadingText";
import {DefaultText} from "../../../components/text/DefaultText";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import {PrimaryContext, ThemeContext} from "../../Context";

const errorMessages = [
    {
        error: "auth/missing-password",
        message: "No password was entered. \n Please try again."
    },
    {
        error: "auth/wrong-password Invalid E-Mail format",
        message: "Invalid Input. Please try again..."
    },
    {
        error: "auth/operation-not-allowed",
        message: "Could not change Email. \n Maybe already registered within another Account?"
    }
]

const EmailChange = () => {
  // State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [awaitConfirmation, setAwaitConfirmation] = useState(false);
  const [reAuth, setReAuth] = useState(false);

  // Context
  const { setLoading } = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);

  // Styles
  const mainContainerStyles =
    [userStyles.main_container, {backgroundColor: customTheme.primary}];
  const moreTextStyles = {color: customTheme.text};

  // @ts-ignore
  const text = useSelector(state => state.text.value)
  const { user } = useContext(PrimaryContext);
  const handleChangeEmail = async () => {
      setModalVisible(true);
      // @ts-ignore
      const credential = auth.EmailAuthProvider.credential(user?.email, currentPassword);
      if (newEmail.includes("@") && newEmail.length > 0) {
          setLoading(true);
          console.log("new email: ", newEmail);
          try {
              user?.reauthenticateWithCredential(credential).then(() => {
                  console.log("reauth success...");
                  setReAuth(true);
                  // @ts-ignore
                  verifyBeforeUpdateEmail(user, newEmail)
                    .then(() => {
                        user?.reload();
                        setError("");
                        console.log("ReAuth sent. Await confirmation...");
                        setReAuth(false);
                        setAwaitConfirmation(true);
                    }).catch((error: { message: string; }) => {
                      console.log("reAuth error: Could not change mail", error.message);
                  })
              }).catch((error: { message: string; }) => {
                  setError(error.message);
                  console.log("ReAuth error: ", error.message);
                setLoading(false);
              });
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.log("error: ", error);
              setError(error.message);
            }
          }
      } else {
        setError("Invalid E-Mail format. Please try again.");
      }
  };

  useEffect(() => {
    if (user?.emailVerified && awaitConfirmation) {
      setLoading(false);
      setModalVisible(false);
      setSuccess(true);
      setAwaitConfirmation(false);
    }
  }, []);

  const errorText = useMemo(() => {
    return <DefaultText text={error} moreStyles={{color: customTheme.errorText}} />
  }, [error]);

  const matchedError =
    errorMessages.find(item => error.includes(item.error));

  const extraContent = useMemo(() => {
    if (reAuth) {
      return <DefaultText text={"Authentication successful..."} moreStyles={undefined}/>
    } else if (awaitConfirmation) {
      return (
        <View style={{gap: 50}}>
          <DefaultText
            text={"Confirmation sent to you Email.\n This may take a few minutes."}
            moreStyles={undefined}/>
        </View>
      );
    } else if (success) {
      return <DefaultText
                text={"Your E-Mail Address has been successfully confirmed."}
                moreStyles={undefined}
              />
    } else if (matchedError) {
      return <DefaultText
        text={matchedError.message}
        moreStyles={userStyles.errormessageStyles}
      />
    }
  }, [matchedError, success, awaitConfirmation, reAuth, newEmail]);

  return (
    <SafeAreaView style={mainContainerStyles}>
      <KeyboardAvoidingView style={userStyles.infoContainer}>
        <HeadingText text={text.changeEmail} extraStyles={undefined} />
        <DefaultText text={"current E-Mail: "+ user?.email} moreStyles={moreTextStyles} />
        <DefaultInput
          placeholder={"New E-Mail Address"}
          value={newEmail}
          onChangeAction={setNewEmail}
          secure={false}
          editable={true}
          keyboardType={undefined}
          extraStyles={undefined}
        />

        <DefaultInput
          placeholder={"Confirm with your Password"}
          value={currentPassword}
          onChangeAction={setCurrentPassword}
          secure={true}
          editable={true}
          keyboardType={undefined}
          extraStyles={undefined}
        />

        {extraContent}
        {error.length > 0 && !error.includes(text.success) && errorText}

        <DefaultButton
          extraStyles={[userStyles.changeBtn, {marginTop: 30}]}
          onPressAction={handleChangeEmail}
          text={"Confirm"}
          secondIcon={undefined}
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default memo(EmailChange);

