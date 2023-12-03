import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import {View, SafeAreaView, KeyboardAvoidingView} from 'react-native';

import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
    verifyBeforeUpdateEmail
} from 'firebase/auth';

// Lottie animations
import {userStyles} from "../userStyles";
import {useSelector} from "react-redux";
import {HeadingText} from "../../../components/text/HeadingText";
import {DefaultText} from "../../../components/text/DefaultText";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import {PrimaryContext} from "../../Context";

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
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [awaitConfirmation, setAwaitConfirmation] = useState(false);
  const [reAuth, setReAuth] = useState(false);

  const { setLoading, loading } = useContext(PrimaryContext);

  // @ts-ignore
  const text = useSelector(state => state.text.value)

  const auth = getAuth();
  const user = auth.currentUser;

  const handleChangeEmail = async () => {
      setModalVisible(true);
      // @ts-ignore
      const credential = EmailAuthProvider.credential(user?.email, currentPassword);
      if (newEmail.includes("@") && newEmail.length > 0) {
          /*let action = {
              type: 'LOADING',
              payload: true
          };
          dispatch(action); loading indicator starts */
          setLoading(true);
          console.log("new email: ", newEmail);
          try {
              // @ts-ignore
              await reauthenticateWithCredential(user, credential).then(() => {
                  console.log("reauth success...");
                  setReAuth(true);
                  // @ts-ignore
                  verifyBeforeUpdateEmail(user, newEmail)
                    .then(() => {  // second aruemnt is a redirect url to rediret after confirmation
                        user?.reload()
                        console.log("ReAuth sent. Await confirmation...");
                        setReAuth(false);
                        setAwaitConfirmation(true);
                    }).catch(error => {
                      console.log("reAuth error: Could not change mail", error.message);
                  })
              }).catch(error => {
                  setError(error.message);
                  console.log("ReAuth error: ", error.message);
                 /* let action = {
                      type: 'LOADING',
                      payload: false
                  };
                  dispatch(action); // loading indicator starts */
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
      /*let action = {
        type: 'LOADING',
        payload: false
      };
      dispatch(action); */
      setLoading(false);
      setModalVisible(false);
      setSuccess(true);
      setAwaitConfirmation(false);
    }
  }, [])

  const matchedError =
    errorMessages.find(item => error.includes(item.error));

  const extraContent = useMemo(() => {
    if (reAuth) {
      return <DefaultText text={"Reauthentication successful..."} moreStyles={undefined}/>
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
  }, [matchedError, success, awaitConfirmation, reAuth, newEmail])

  return (
    <SafeAreaView style={userStyles.main_container}>
      <KeyboardAvoidingView style={userStyles.infoContainer}>
        <HeadingText text={text.changeEmail} extraStyles={undefined} />
        <DefaultText text={"current E-Mail: "+ user?.email} moreStyles={undefined} />
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



/*
      <AwaitConfirmationModal
        action={
          reAuth? (
            <DefaultText text={"Reauthentication successful..."} moreStyles={undefined} />
          ): awaitConfirmation? (
            <View style={{gap: 50}}>
              <DefaultText
                text={"Confirmation sent to: " + newEmail + "\n This may take a few minutes."}
                moreStyles={undefined} />
            </View>
          ): success? (
            <DefaultText
              text={"Your E-Mail Address " + newEmail + " has been successfully confirmed."}
              moreStyles={undefined} />
          ): matchedError? (
            <DefaultText
              text={matchedError.message}
              moreStyles={localStyles.errormessageStyles}
            />
          ):null}
        success={success}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        lottieSource={successLottie}/>
 */
