import React, {useCallback, useState} from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { getAuth, EmailAuthProvider, updatePassword, reauthenticateWithCredential } from 'firebase/auth';


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


// @ts-ignore
export const  PasswordChangeComponent = ({navigation}) => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();

    // use Selectors
    // @ts-ignore
    const loading = useSelector(state => state.loading.value);
    // @ts-ignore
    const text = useSelector(state => state.text.value)

    const user = getAuth().currentUser;

    const handleChangePassword = useCallback(async () => {
        let action = {
            type: 'LOADING',
            payload: true
        };
        dispatch(action);
        console.log("user: ", user);
        console.log("current password: ", currentPassword);
        console.log("new password: ", newPassword);
        // @ts-ignore
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        try {
            // @ts-ignore
            await reauthenticateWithCredential(user, credential).then(r => console.log("reauthenticated...")).catch(err => console.log("error: ", err));
            // @ts-ignore
            await updatePassword(user, newPassword).then(r => console.log("password changed...")).catch(err => console.log("error: ", err));
            // @ts-ignore
            setError(false);
        } catch (error) {
            console.log("not able to change password!", error);
            // @ts-ignore
            setError(true);
        } finally {
            action = {
                type: 'LOADING',
                payload: false
            };
            dispatch(action);
        }
    }, [])

    return (
        <View style={[userStyles.main_container,{flex:1, justifyContent: "center", alignItems: "center"}]}>
            <View style={userStyles.infoContainer}>
                <HeadingText text={text.changePassword} extraStyles={undefined} />

                <DefaultInput placeholder={text.currentPasswordText}
                              value={currentPassword}
                              onChangeAction={setCurrentPassword}
                              secure={true}
                              editable={true} />

                <DefaultInput placeholder={text.defaultPasswordPlaceholder}
                              value={newPassword}
                              onChangeAction={setNewPassword}
                              secure={true}
                              editable={true} />

                <DefaultButton
                               onPressAction={handleChangePassword}
                               indicatorColor={undefined}
                               indicatorSize={text.indicatorSizeSmall}
                               text={text.changePassword}
                               secondIcon={undefined}
                               extraStyles={undefined} />
                <DefaultButton
                    extraStyles={userStyles.changeInfoBtn}
                    onPressAction={handleChangePassword}
                    indicatorColor={undefined}
                    indicatorSize={"small"}
                    text={"Change Password"}
                    secondIcon={undefined} />
            </View>
            <AlertBox
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                buttonText={text.goHomeText}
                redirectAction={
                    () => navigation.navigate(error ? text.navigatePasswordChange : text.navigateToolsMain)
                }
                errorAnimation={
                    <LottieView source={error? failLottie : successLottie} style={styles.lottieAnimationViewContainer}/>
                }
            />
        </View>
    );
}


