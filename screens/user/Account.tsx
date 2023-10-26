import React, {useCallback, useEffect, useState} from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from '../../toolStyles';
import {useNavigation} from "@react-navigation/native";
import {getAuth} from "firebase/auth";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {DefaultInput} from "../../components/input/DefaultInput";
import {DefaultPageNavigationBtn} from "../../components/buttons/DefaultPageNavigationBtn"
import {BottomImage} from "../../components/images/BottomImage";

// @ts-ignore
import {useSelector, useDispatch} from "react-redux";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {HeadingText} from "../../components/text/HeadingText";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";
const dispatch = useDispatch();


export const AccountMain = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const [error, setError] = useState(false);
    const navigation = useNavigation();

    // @ts-ignore
    const loading = useSelector(state => state.loading.loading);
    // @ts-ignore
    const text = useSelector(state => state.text.text)
    // @ts-ignore
    const icon = useSelector(state => state.icon.icon)
    // @ts-ignore
    const screens = useSelector(state => state.screens.screens)


    const moveToScreen = useCallback((screenName: any) => {
        // @ts-ignore
        navigation.navigate(screenName);
    }, []);

    const deleteUser = useCallback(() => {
        // @ts-ignore
        user.delete()
    }, []);

    const logout = useCallback (async() => {
        let action = {
            type: 'LOADING',
            payload: true
        };
        dispatch(action);
        // @ts-ignore
        user.logout();

        try {
            await auth.signOut().then(() => // vhange type
                console.log("User is successfully logged out")
            );
        } catch (error) {
            setError(true); // @ts-ignore
            console.log("There was an error while logging the user out: \n" + error.message);
        }
    }, []);

    // @ts-ignore
    return (
        <ScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center"}} style={{paddingTop: 50}}>
            <View style={styles.adContainer}>
                <PlusAdContainer />
            </View>
            <View style={styles.profileSection}>
                <HeadingText text={text.profileHeading}/>

                <View style={styles.inputSection}>
                    {/*@ts-ignore*/}
                    <DefaultInput placeholder={undefined} value={user.email}
                                  onChangeAction={null} secure={false} editable={false}/>
                    <DefaultPageNavigationBtn text={text.changeEmail}
                                              onPressAction={moveToScreen(screens.emailChangeScreen)} extraTextStyles={undefined}
                                              extraBtnStyles={undefined}/>

                    <DefaultInput placeholder={null} value={text.password}
                                  onChangeAction={null}
                                  secure={true} editable={false}/>
                    <DefaultPageNavigationBtn text={text.changePassword}
                                              onPressAction={moveToScreen(screens.passwordChangeScreen)} extraTextStyles={undefined}
                                              extraBtnStyles={undefined}/>
                </View>
            </View>
            <View style={styles.mainContainerProfile}>
                <DefaultButton
                    loading={loading}
                    onPressAction={moveToScreen(screens.settingsScreen)}
                    indicatorColor={undefined}
                    extraStyles={undefined}
                    indicatorSize={text.indicatorSize}
                    text={text.settings}
                    secondIcon={
                        <MaterialCommunityIcons name={icon.settingsIcon} size={24} color={"rgb(255,255,255)"}
                                                style={styles.buttonIcon} />} />
                <DefaultButton
                    loading={loading}
                    onPressAction={logout}
                    indicatorColor={undefined}
                    extraStyles={undefined}
                    indicatorSize={text.indicatorSize}
                    text={text.logoutButtonText}
                    secondIcon={
                        <MaterialCommunityIcons name={text.logoutIcon} size={24} color={"rgb(255,255,255)"}
                                                style={styles.buttonIcon} />} />
                <DefaultButton
                    loading={loading}
                    onPressAction={logout}
                    indicatorColor={undefined}
                    extraStyles={undefined}
                    indicatorSize={text.indicatorSizeSmall}
                    text={text.deleteAccount}
                    secondIcon={
                        <MaterialCommunityIcons name={"trash"} size={24} color={"rgb(255,255,255)"}
                                                style={styles.buttonIcon} />} />
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