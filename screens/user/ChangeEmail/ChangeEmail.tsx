import React, {useEffect, useState} from 'react';
import { View, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updateEmail,
    verifyBeforeUpdateEmail
} from 'firebase/auth';

// Lottie animations
import successLottie from "../../../assets/animations/successLottie.json"; // check later when have screen
import {userStyles} from "../userStyles";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {HeadingText} from "../../../components/text/HeadingText";
import {DefaultText} from "../../../components/text/DefaultText";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {DefaultButton} from "../../../components/buttons/DefaultButton";
import {AwaitConfirmationModal} from "../../../components/modals/AwaitConfirmationModal";

export const EmailChangeComponent =() => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [awaitConfirmation, setAwaitConfirmation] = useState(false);
    const [reAuth, setReAuth] = useState(false);

    const navigation = useNavigation()
    const dispatch = useDispatch()
    // @ts-ignore
    const text = useSelector(state => state.text.text)
    // @ts-ignore
    const screen = useSelector(state => state.screens.screen)

    const auth = getAuth();
    const user = auth.currentUser;

    const handleChangeEmail = async () => {
        setModalVisible(true);
        console.log("user1: ", user);
        console.log("current password: " + currentPassword);
        // @ts-ignore
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        if (newEmail.includes("@") && newEmail.length > 0) {
            let action = {
                type: 'LOADING',
                payload: true
            };
            dispatch(action); // loading indicator starts

            console.log("new email: ", newEmail);
            try {
                // @ts-ignore
                await reauthenticateWithCredential(user, credential).then(() => {
                    console.log("reauth success...");
                    setReAuth(true);
                    // @ts-ignore
                    verifyBeforeUpdateEmail(user, newEmail)
                        .then(() => {  // second aruemnt is a redirect url to rediret after confirmation
                            // @ts-ignore
                            user.reload()
                            console.log("reauth sent. await confirmation...");
                            setReAuth(false);
                            setAwaitConfirmation(true);
                        }).catch(error => {
                        console.log("reAuth error: Could not change mail", error.message);
                    })
                }).catch(error => {
                    setError(error.message);
                    console.log("reauth error: ", error.message);
                    let action = {
                        type: 'LOADING',
                        payload: false
                    };
                    dispatch(action); // loading indicator starts
                });
            } catch (error) {
                console.log("error: ", error);
                // @ts-ignore
                setError(error.message);
            }
        } else {
            setError("Invalid E-Mail format. Please try again.");
        }
    };
    useEffect(() => {

        // @ts-ignore
        if (user.emailVerified && awaitConfirmation) {
            // @ts-ignore
            let action = {
                type: 'LOADING',
                payload: false
            };
            dispatch(action);
            setModalVisible(false);
            setSuccess(true);
            setAwaitConfirmation(false);
        }
    }, [])


    return (
        <SafeAreaView style={[userStyles.main_container, {flex:1, justifyContent: "center", alignItems: "center"}]}>
            <KeyboardAvoidingView style={userStyles.infoContainer}>
                <HeadingText text={text.changeEmail} extraStyles={undefined} ></HeadingText>
                {/*@ts-ignore*/}
                <DefaultText text={"current E-Mail: "+ user.email} moreStyles={undefined}></DefaultText>
                <DefaultInput
                    placeholder={"New E-Mail Address"}
                    value={newEmail}
                    onChangeAction={setNewEmail}
                    secure={false}
                    editable={true} />

                <DefaultInput
                    placeholder={"Confirm with your Password"}
                    value={currentPassword}
                    onChangeAction={setCurrentPassword}
                    secure={true}
                    editable={true} />
                <DefaultButton
                    extraStyles={[userStyles.changeBtn, {marginTop: 30}]}
                    onPressAction={handleChangeEmail}
                    indicatorColor={undefined}
                    indicatorSize={"small"}
                    text={"Confirm"}
                    secondIcon={undefined} />
            </KeyboardAvoidingView>
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
                            moreStyles={undefined} /> // before: styles.errorText
                    ): error.includes("auth/missing-password")? (
                        <DefaultText
                            text={"No password was entered. \n Please try again."}
                            moreStyles={undefined} />
                    ): error.includes("auth/wrong-password") || error.includes("Invalid E-Mail format") ? (
                        <DefaultText
                            text={"Invalid Input. Please try again..."}
                            moreStyles={undefined} />

                    ): error.includes("auth/operation-not-allowed") ? (
                        <DefaultText
                            text={"Could not change Email. \n Maybe already registered within another Account?"}
                            moreStyles={undefined} />
                    ):null}
                success={success}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                lottieSource={successLottie}/>
        </SafeAreaView>
    );
}

// error ? lottieAnimations.lottieFiles.failed : lottieAnimations.lottieFiles.success