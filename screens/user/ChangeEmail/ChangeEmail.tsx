import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, TextInput, Animated} from 'react-native';
import { styles } from '../../toolStyles';
import {useNavigation} from "@react-navigation/native";
import {getAuth} from "firebase/auth";
import {LinearGradient} from "expo-linear-gradient";
import Chroma from 'chroma-js';
import {themeColors} from "../../../../theme/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const TOP_COLORS =  ['#9c0582', '#0e198c', '#1d155e', '#2A3BEF', '#662250', '#6b0e5e'];
const BOTTOM_COLORS = ['#0e198c', '#1d155e', '#4f0c3d', '#7F00FF', '#0e198c'];
const GRADIENT_COLOR_LENGTH = 700;
const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(GRADIENT_COLOR_LENGTH);
const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(GRADIENT_COLOR_LENGTH);
const INTERVAL = 2;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);


export const AccountMain = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);
    const [colorTop, setColorTop] = useState(TOP_COLORS_SPECTRUM[0]);
    const [colorBottom, setColorBottom] = useState(BOTTOM_COLORS_SPECTRUM[0]);
    const [isPressed, setIsPressed] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    const [error, setError] = useState(false);
    const navigation = useNavigation();
    const logout = async () => {
        try {
            await auth.signOut().then(() => // vhange type
                console.log("User is successfully logged out")
            );
        } catch (error) {
            setError(true);
            console.log(
                "There was an error while logging the user out: \n" + error.message);
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            let newTopIndex = topIndex + 1;
            if (newTopIndex === TOP_COLORS_SPECTRUM.length) {
                newTopIndex = 0;
            }
            let newBottomIndex = bottomIndex + 1;
            if (newBottomIndex === BOTTOM_COLORS_SPECTRUM.length) {
                newBottomIndex = 0;
            }
            setTopIndex(newTopIndex);
            setBottomIndex(newBottomIndex);
            setColorTop(TOP_COLORS_SPECTRUM[newTopIndex]);
            setColorBottom(BOTTOM_COLORS_SPECTRUM[newBottomIndex]);
        }, INTERVAL);

        return () => clearInterval(interval); // Clear the interval on component unmount

    }, [topIndex, bottomIndex]);



    return (
        <ScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center"}} style={{paddingTop: 50}}>
            <View style={styles.adContainer}>
                <LinearGradient style={styles.adsCont} colors={[colorTop, colorBottom]} >
                    <View style={styles.rowPadding}>
                        <View style={styles.header}>
                            <Text style={{ color: 'white', fontSize: 28, }}>Upgrade To Pro</Text>
                        </View>
                        <View style={{marginTop: 20}}>
                            <Text style={styles.headerDesc}>Lorem ipsum dolor amet consectetur adipisicing.</Text>
                            <Text style={styles.headerDesc}>Lorem ipsum dolor amet consectetur adipisicing.</Text>
                        </View>
                    </View>
                    <View style={[styles.rowPadding, { marginTop: 40 }]}>
                        <TouchableOpacity activeOpacity={0.6} style={styles.btnContainer}>
                            <Text style={styles.btnTxt}>Erfahre mehr!</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.profileSection}>
                <Text style={styles.profileHeader}>
                    Profile
                </Text>

                <View style={styles.inputSection}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder={user.email}
                        placeholderTextColor="black"
                        style={styles.loginContainerInput}
                        editable={false}/>
                    <TouchableOpacity style={styles.roundBtn} onPress={() => {navigation.navigate("EmailChangeComponent")}}>
                        <Text style={styles.btnTxtProfile}>Change Email</Text>
                    </TouchableOpacity>
                    <TextInput
                        secureTextEntry={true}
                        value={"password"}
                        onChangeText={setCurrentPassword}
                        placeholderTextColor="black"
                        style={styles.loginContainerInput}
                        editable={false}/>
                    <TouchableOpacity style={styles.roundBtn} onPress={() => {navigation.navigate("PasswordChange")}}>
                        <Text style={styles.btnTxtProfile}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.mainContainerProfile}>
                <TouchableOpacity style={styles.changeInfoBtn}>
                    <Text style={styles.buttonTextProfile}>Settings</Text>
                    <MaterialCommunityIcons name="cog-outline" size={24} color="white" style={styles.buttonIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.changeInfoBtn} onPress={() => {
                    logout.then(r => console.log("logged out..."), navigation.navigate("Logout"));
                }}>
                    <Text style={styles .buttonTextProfile}>
                        Logout
                    </Text>
                    <MaterialCommunityIcons name="logout" size={24} color="white" style={styles.buttonIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonDeleteContainer]}>
                    <Text style={[{ color: themeColors.dotNineWhite, fontSize: 16 }]}>
                        Delete Account
                    </Text>
                </TouchableOpacity>
            </View>
            {/* 3 Footer */}
            <View style={styles.logoCont }  >
                <Text style={[styles.logoText ]}>AIX</Text>
                <Text style={[styles.mirrorLogo, {transform: [{rotateX: '110deg'} ]}]}>AIX</Text>
            </View>
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