import React, {useCallback, useState} from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { getAuth, EmailAuthProvider, updatePassword, reauthenticateWithCredential } from 'firebase/auth';
import { styles } from '../../toolStyles';
import {AlertBox} from "../../../universal/errorBox";

// @ts-ignore
import {useSelector, useDispatch} from "react-redux";
const dispatch = useDispatch();
import LottieView from 'lottie-react-native';
// animations
import successAnimation from "../../../../assets/lottie_animations/successAnimation.json";
import failed from "../../../../assets/lottie_animations/failed.json";

import {DefaultInput} from "../../components/input/DefaultInput";
import {HeadingText} from "../../components/text/HeadingText";
import {DefaultButton} from "../../components/buttons/DefaultButton";




// useselecotor for loading
// @ts-ignore
export const  PasswordChangeComponent = ({navigation}) => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    // use Selectors
    // @ts-ignore
    const loading = useSelector(state => state.loading.loading);
    // @ts-ignore
    const text = useSelector(state => state.text.text)

    const user = getAuth().currentUser;

    const handleChangePassword = useCallback(async () => {
        let action = {
            type: 'LOADING',
            payload: true
        };
        dispatch(action);
        const auth = getAuth();
        const user = auth.currentUser;
        console.log("user: ", user);
        console.log("current password: ", currentPassword);
        console.log("new password: ", newPassword);
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        try {
            await reauthenticateWithCredential(user, credential).then(r => console.log("reauthenticated...")).catch(err => console.log("error: ", err));
            await updatePassword(user, newPassword).then(r => console.log("password changed...")).catch(err => console.log("error: ", err));
            setError(false);
        } catch (error) {
            console.log("not able to change password!", error);
            setError(true);
        } finally {
            action = {
                type: 'LOADING',
                payload: false
            };
            dispatch(action);
        }
    };
    return (
        <View style={[styles.main_container,{flex:1, justifyContent: "center", alignItems: "center"}]}>
            <View style={styles.infoContainer}>

                <HeadingText text={text.changePassword} />

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

                <DefaultButton loading={loading}
                               onPressAction={handleChangePassword}
                               indicatorColor={undefined}
                               indicatorSize={text.indicatorSizeSmall}
                               text={text.changePassword}
                               secondIcon={undefined}
                               extraStyles={undefined} />
                <TouchableOpacity style={styles.changeInfoBtn} onPress={}>
                    <Text style={{color: '#fff'}}>change Password</Text>
                </TouchableOpacity>
            </View>
            {error === true ? (
                <AlertBox
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    buttonText={text.tryAgain}
                    redirectAction={() => navigation.navigate(text.navigatePasswordChange)}
                    errorAnimation={<LottieView source={failed}/>}
                />
            ): error === false ? (
                <AlertBox
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    buttonText={text.goHomeText}
                    redirectAction={() => navigation.navigate(text.navigateToolsMain)}
                    errorAnimation={<LottieView source={successAnimation} style={styles.lottieAnimationView}/>}
                />
            ):null}
        </View>
    );
}


