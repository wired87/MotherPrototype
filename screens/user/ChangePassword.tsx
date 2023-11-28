import React, {useCallback, useContext, useState} from 'react';
import { View } from 'react-native';
import { EmailAuthProvider, updatePassword, reauthenticateWithCredential } from 'firebase/auth';


// @ts-ignore
import {useSelector, useDispatch} from "react-redux";

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


// @ts-ignore
export const  PasswordChangeComponent = ({navigation}) => {

    const [newPassword, setNewPassword] = useState('');

    const dispatch = useDispatch();

    const { user } = useContext(PrimaryContext);
    const {
        password, setPassword,
        error, setError ,
        modalVisible, setModalVisible
        } = useContext(AuthContext);

    // @ts-ignore
    const loading = useSelector(state => state.loading.value);
    // @ts-ignore
    const text = useSelector(state => state.text.value)

    const handleChangePassword = useCallback(async () => {
        let action = {
            type: 'LOADING',
            payload: true
        };
        dispatch(action);
        console.log("user: ", user);
        console.log("current password: ", password);
        console.log("new password: ", newPassword);
        // @ts-ignore
        const credential = EmailAuthProvider.credential(user.email, password);
        try {
            // @ts-ignore
            await reauthenticateWithCredential(user, credential).then(r =>
              console.log("reauthenticated...")).catch(err => console.log("error: ", err));
            // @ts-ignore
            await updatePassword(user, newPassword).then(r =>
              console.log("password changed...")).catch(err => console.log("error: ", err));
            // @ts-ignore
            setError(false);
        } catch (error) {
            console.log("not able to change password!", error);
            // @ts-ignore
            setError(true);
            setModalVisible(true);
        } finally {
            action = {
                type: 'LOADING',
                payload: false
            };
            dispatch(action);
        }
    }, [])

    return (
        <View style={[userStyles.main_container, {flex:1, justifyContent: "center", alignItems: "center"}]}>
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
              redirectAction={() => navigation.navigate(error ? text.navigatePasswordChange : text.navigateToolsMain)}
              errorAnimation={
                <LottieView source={error ? failLottie : successLottie} style={styles.lottieAnimationViewContainer} />
              }
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
        </View>
    );
}


