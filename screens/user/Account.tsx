import React, {useCallback, useEffect, useState} from 'react';
import { View, ScrollView } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {getAuth} from "firebase/auth";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {DefaultInput} from "../../components/input/DefaultInput";
import {DefaultPageNavigationBtn} from "../../components/buttons/DefaultPageNavigationBtn"
import {BottomImage} from "../../components/images/BottomImage";


import {useSelector, useDispatch} from "react-redux";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {HeadingText} from "../../components/text/HeadingText";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";
import { userStyles } from './userStyles';


export const AccountMain = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const user = auth.currentUser;
    const [error, setError] = useState(false);
    const navigation = useNavigation();

    // @ts-ignore
    const loading = useSelector(state => state.loading.value);
    // @ts-ignore
    const text = useSelector(state => state.text.value)
    // @ts-ignore
    const icon = useSelector(state => state.icon.value)
    // @ts-ignore
    const screens = useSelector(state => state.screens.value)


    const moveToScreen = useCallback((screenName: string, params?: object) => {
        // @ts-ignore
        return () => navigation.navigate(screenName, params);
    }, []);


    //modal zum bestätigenn einbauen
    const deleteUser = useCallback(async() => {
        dispatch({
            type: 'LOADING',
            payload: true
        })

        try {
            // @ts-ignore
            await user.delete().then(() => {
                console.log("successfully sign the User out")
                }
            )
        } catch(error) {
            console.log(error)
        } finally {
            dispatch({
                type: 'LOADING',
                payload: false
            })
        }

    }, []);

    const logout = useCallback (async() => {
        dispatch({
            type: 'LOADING',
            payload: true
        });

        try {
            await auth.signOut().then(() => // vhange type
                console.log("User is successfully logged out")
            );
            setError(false)
        } catch (error) {
            setError(true); // @ts-ignore
            console.log("There was an error while logging the user out: \n" + error.message);
        } finally {
            dispatch({
                type: 'LOADING',
                payload: false
            });
        }
    }, []);

    return (
        <ScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center"}} style={{paddingTop: 50}}>
            <View style={userStyles.adContainer}>

                <PlusAdContainer />

            </View>
            <View style={userStyles.profileSection}>

                <HeadingText text={text.profileHeading} extraStyles={undefined}/>

                <View style={userStyles.inputSection}>
                    {/*@ts-ignore*/}
                    <DefaultInput placeholder={undefined} value={user.email}
                                  onChangeAction={null} secure={false} editable={false}/>
                    <DefaultPageNavigationBtn text={text.changeEmail}
                                              onPressAction={moveToScreen(screens.emailChangeScreen)}
                                              extraTextStyles={undefined}
                                              extraBtnStyles={undefined}/>

                    <DefaultInput placeholder={null} value={text.password}
                                  onChangeAction={null}
                                  secure={true} editable={false}/>

                    <DefaultPageNavigationBtn text={text.changePassword}
                                              onPressAction={moveToScreen(screens.passwordChangeScreen)}
                                              extraTextStyles={undefined}
                                              extraBtnStyles={undefined}/>
                </View>
            </View>

            <View style={userStyles.mainContainerProfile}>
                <DefaultButton
                    onPressAction={moveToScreen("Settings", { screen: screens.settingsScreen })}
                    indicatorColor={undefined}
                    extraStyles={undefined}
                    indicatorSize={text.indicatorSize}
                    text={text.settings}
                    secondIcon={
                        <MaterialCommunityIcons name={icon.settingsIcon} size={24} color={"rgb(255,255,255)"}
                                                style={userStyles.buttonIcon} />} />
                <DefaultButton
                    onPressAction={
                        logout

                    }
                    indicatorColor={undefined}
                    extraStyles={undefined}
                    indicatorSize={text.indicatorSize}
                    text={text.logoutButtonText}
                    secondIcon={
                        <MaterialCommunityIcons name={text.logoutIcon} size={24} color={"rgb(255,255,255)"}
                                                style={userStyles.buttonIcon} />} />
                <DefaultButton
                    onPressAction={() => {deleteUser}}
                    indicatorColor={undefined}
                    extraStyles={undefined}
                    indicatorSize={text.indicatorSizeSmall}
                    text={text.deleteAccount}
                    secondIcon={
                        <MaterialCommunityIcons name={icon.trashIcon} size={24} color={"rgb(255,255,255)"}
                                                style={userStyles.buttonIcon} />} />
            </View>
            <BottomImage />
        </ScrollView>
    );
}




















/* , {rotateY: '180deg'}   <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgb(255,0,0)"}}>

      <View style={styles.purchasePlanContainer}>
        <TouchableOpacity style={styles.purchaseButtonAccountMain}>
          <Text>Get Upgrade!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainUserInfoContainer}>
        <View style={styles.infoChangeContainer}>
          <Text style={styles.personalInfoText}>user.email</Text>
        </View>
          <TouchableOpacity
          style={styles.changeBtn}
          onPress={() => navigation.navigate('PasswordChangeComponent')}
        >
          <Text style={{color: '#fff'}}>change E-Mail</Text>
        </TouchableOpacity>

        <View style={styles.infoChangeContainer}>
          <Text style={styles.personalInfoText}>user.password</Text>
        </View>
        <TouchableOpacity
          style={styles.changeBtn}
          onPress={() => navigation.navigate('PasswordChangeComponent')}
        >
          <Text style={{color: '#fff'}}>change Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.linearGradient}>
        <Text style={styles.buttonText}>
          Settings
        </Text>
      </View>
      <TouchableOpacity onPress={() => {
        getAuth().signOut().then(r => dispatch({ type: 'SIGN_IN', payload: null})).catch(r => console.log(r));
        }} style={styles.linearGradient}>
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>
      <View style={styles.linearGradient}>
        <Text style={styles.buttonText}>
          Delete
        </Text>
      </View>

      <View style={styles.endButton} >

      </View>
      <LinearGradient colors={['#1c528a', '#012f60', '#01152a']} style={styles.linearGradient}></LinearGradient> */



/*


        <Text>Passwort: {'*'.repeat(user.password.length)}</Text>

 <Text>Email ändern</Text>
        <TextInput
          style={styles.loginContainerInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Neue Email eingeben"
        />
        <TouchableOpacity style={styles.changeInfoBtn} onPress={handleChangeEmail}>
          <Text style={{color: '#fff'}}>Email ändern</Text>
        </TouchableOpacity>

 */