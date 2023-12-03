import React, {memo, useCallback, useContext, useState} from 'react';
import { View } from 'react-native';
import { EmailAuthProvider, updatePassword, reauthenticateWithCredential } from 'firebase/auth';
import {useSelector} from "react-redux";

import LottieView from 'lottie-react-native';

// animations
import successLottie from "../../assets/animations/successLottie.json"
import failLottie from "../../assets/animations/failLottie.json"

import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import { styles } from '../../components/modals/styles';
import {userStyles} from "./userStyles";
import {AlertBox} from "../../components/modals/errorBox";
import {AuthContext, PrimaryContext} from "../Context";
import {useNavigation} from "@react-navigation/native";

const  PasswordChangeComponent = () => {

  const [newPassword, setNewPassword] = useState('');

  const navigation = useNavigation();
  const { user, setLoading } = useContext(PrimaryContext);

  const {
      password, setPassword,
      error, setError ,
      modalVisible, setModalVisible
  } = useContext(AuthContext);

  // @ts-ignore
  const text = useSelector(state => state.text.value)

  const handleChangePassword = useCallback(async () => {
    /*  let action = {
          type: 'LOADING',
          payload: true
      };
      dispatch(action);*/
    setLoading(false);
    console.log("user: ", user);
    console.log("current password: ", password);
    console.log("new password: ", newPassword);
    // @ts-ignore
    const credential = EmailAuthProvider.credential(user?.email, password);
    try {
      // @ts-ignore
      await reauthenticateWithCredential(user, credential)
      // @ts-ignore
      await updatePassword(user, newPassword)
      setError("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("not able to change password!", error);
        setError(error.message);
      }
      setModalVisible(true);
    } finally {
      /*  action = {
            type: 'LOADING',
            payload: false
        };
        dispatch(action);*/
      setLoading(false);
    }
  }, [])

  return (
    <View style={userStyles.main_container}>
      <View style={userStyles.infoContainer}>
        <HeadingText text={text.changePassword} extraStyles={undefined} />

        <DefaultInput
          placeholder={text.currentPasswordText}
          value={password}
          onChangeAction={setPassword}
          secure={true}
          editable={true}
          keyboardType={undefined}
          extraStyles={undefined}
        />

        <DefaultInput
          placeholder={text.defaultPasswordPlaceholder}
          value={newPassword}
          onChangeAction={setNewPassword}
          secure={true}
          editable={true} keyboardType={undefined} extraStyles={undefined}
        />

        <DefaultButton
          onPressAction={handleChangePassword}
          text={text.changePassword}
          secondIcon={undefined}
          extraStyles={undefined}
        />

        <DefaultButton
          extraStyles={userStyles.changeInfoBtn}
          onPressAction={handleChangePassword}
          text={"Change Password"}
          secondIcon={undefined}
        />

      </View>
      <AlertBox
        buttonText={text.goHomeText}
        // @ts-ignore
        redirectAction={() => navigation.navigate(text.navigatePasswordChange)}
        errorAnimation={
            <LottieView source={error ? failLottie : successLottie} style={styles.lottieAnimationViewContainer} />
        }
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

export default memo(PasswordChangeComponent);