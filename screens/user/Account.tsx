import React, {useCallback, useContext} from 'react';
import { View, ScrollView } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {getAuth} from "firebase/auth";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {DefaultInput} from "../../components/input/DefaultInput";
import {BottomImage} from "../../components/images/BottomImage";

import {useSelector, useDispatch} from "react-redux";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {HeadingText} from "../../components/text/HeadingText";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";
import { userStyles } from './userStyles';
import {themeColors} from "../../colors/theme";
import {AuthContext, PrimaryContext, ThemeContext} from "../Context";

export const AccountMain = () => {

  const auth = getAuth();
  const {user, setUser} = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);
  const {setError} = useContext(AuthContext);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  // @ts-ignore
  const loading = useSelector(state => state.loading.value);
  // @ts-ignore
  const text = useSelector(state => state.text.value)
  // @ts-ignore
  const icon = useSelector(state => state.icon.value)
  // @ts-ignore
  const screens = useSelector(state => state.screens.value)
  // @ts-ignore
  const newLogout = useSelector(state => state.logout.value)

  const moveToScreen = useCallback((screenName: string, params?: object) => {

    // @ts-ignore
    return () => navigation.navigate(screenName, params);
  }, []);

  //modal zum bestätigenn einbauen
  const deleteUser = useCallback(async () => {
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
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({
        type: 'LOADING',
        payload: false
      })
    }
  }, []);


  const userLogout = async () => {
    dispatch({
      type: "LOGOUT",
      payload: true
    });
    dispatch({
      type: 'LOADING',
      payload: true
    });
    console.log("successfully dispatched", "\n loading:", loading)

    try {
      await auth.signOut().then(() => {
        console.log("User is successfully logged out")
        setUser(null);
      });
      setError("false")
      console.log("user:", user)

    } catch (error) {
      setError("true"); // @ts-ignore
      console.log("There was an error while logging the user out: \n" + error.message);

    } finally {
      dispatch({
        type: 'LOADING',
        payload: false
      });
      console.log("Data dispatched. newLogout: ", newLogout, "\n loading:", loading)
      // @ts-ignore
      navigation.navigate("ChatMain");
    }
  };

  // @ts-ignore
  return (
    <ScrollView contentContainerStyle={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: customTheme.primary
    }} style={{paddingTop: 50}}>
      <View style={userStyles.adContainer}>
        <PlusAdContainer/>
      </View>
      <View style={[userStyles.profileSection, {
        backgroundColor: "transparent",
        borderBottomWidth: 1, borderBottomColor: themeColors.borderThin, marginVertical: 10
      }]}>
        <HeadingText text={text.profileHeading} extraStyles={undefined}/>
        <View style={userStyles.inputSection}>
          <DefaultInput
            placeholder={undefined}
            // @ts-ignore
            value={user ? user.email : null}
            onChangeAction={null}
            secure={false}
            editable={false}
            keyboardType={undefined}
            extraStyles={undefined}
          />
          <DefaultButton
            text={text.changeEmail}
            onPressAction={moveToScreen(screens.emailChangeScreen)}
            extraStyles={{marginBottom: 15}}
            secondIcon={undefined}/>
          <DefaultInput
            placeholder={null}
            value={text.password}
            onChangeAction={null}
            secure={true}
            editable={false}
            keyboardType={undefined}
            extraStyles={undefined}/>
          <DefaultButton
            text={text.changePassword}
            onPressAction={moveToScreen(screens.passwordChangeScreen)} extraStyles={undefined}
            secondIcon={undefined}
          />
        </View>
      </View>

      <View style={userStyles.mainContainerProfile}>
        <DefaultButton
          onPressAction={moveToScreen("Settings", {screen: screens.settingsScreen})}
          extraStyles={undefined}
          text={text.settings}
          secondIcon={
            <MaterialCommunityIcons
              name={icon.settingsIcon}
              size={20} color={"rgb(255,255,255)"}
              style={userStyles.buttonIcon}
            />
          }
        />
        <DefaultButton
          onPressAction={
            userLogout
          }
          extraStyles={undefined}
          text={text.logoutButtonText}
          secondIcon={
            <MaterialCommunityIcons
              name={text.logoutIcon}
              size={20}
              color={"rgb(255,255,255)"}
              style={userStyles.buttonIcon}
            />
          }
        />
        <DefaultButton
          onPressAction={() => {
            deleteUser().then(() => console.log("User successfully deleted"))
          }}
          extraStyles={undefined}
          text={text.deleteAccount}
          secondIcon={
            <MaterialCommunityIcons
              name={icon.trashIcon}
              size={20} color={"rgb(255,255,255)"}
              style={userStyles.buttonIcon}
            />
          }
        />
      </View>
      <BottomImage/>
    </ScrollView>
  );
}