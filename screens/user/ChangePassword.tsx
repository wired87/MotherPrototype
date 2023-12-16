import React, {memo, useCallback, useContext, useMemo, useState} from 'react';
import { View } from 'react-native';
import { EmailAuthProvider, updatePassword, reauthenticateWithCredential } from 'firebase/auth';
import {useSelector} from "react-redux";


import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {userStyles} from "./userStyles";
import {AuthContext, PrimaryContext, ThemeContext} from "../Context";
import {useNavigation} from "@react-navigation/native";
import {DefaultText} from "../../components/text/DefaultText";

const  PasswordChangeComponent = () => {

  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState("");
  const { user, setLoading } = useContext(PrimaryContext);

  const {
      password, setPassword,
      setModalVisible
  } = useContext(AuthContext);

  const { customTheme } = useContext(ThemeContext);

  // Styles
  const mainContainerStyles =
    [userStyles.main_container, {backgroundColor: customTheme.primary}];
  const moreTextStyles = {color: customTheme.text};

  // @ts-ignore
  const text = useSelector(state => state.text.value)


  const errorText = useMemo(() => {
    return <DefaultText text={error} moreStyles={{color: customTheme.errorText}}/>
  }, [error])


  const handleChangePassword = useCallback(async () => {
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
      setLoading(false);
    }
  }, [])

  return (
    <View style={mainContainerStyles}>
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

        {error.length > 0 && !error.includes(text.success) && errorText}

        <DefaultButton
          onPressAction={handleChangePassword}
          text={text.changePassword}
          secondIcon={undefined}
          extraStyles={undefined}
        />

      </View>
    </View>
  );
}

export default memo(PasswordChangeComponent);