import { Platform, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import {CommonActions , useNavigation, useRoute} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {uniStyles} from "../../screens/universalStyles";
import {HeaderView} from "../container/headerContainer";
import {useDispatch, useSelector} from "react-redux";


//  ALL PROPS FROM NAVIGATOR
/*
"back": Object {
    "title": "ChatMain",
  },
  "navigation": Object {
    "addListener": [Function addListener], ->
    "canGoBack": [Function canGoBack],->
    "dispatch": [Function dispatch], ->
    "getId": [Function getId], ->
    "getParent": [Function getParent], ->
    "getState": [Function anonymous],  ->
    "goBack": [Function anonymous], ->
    "isFocused": [Function isFocused], ->
    "jumpTo": [Function anonymous], ->
    "navigate": [Function anonymous], ->
    "pop": [Function anonymous], ->
    "popToTop": [Function anonymous],->
    "push": [Function anonymous],->
    "removeListener": [Function removeListener],->
    "replace": [Function anonymous],-> ->
    "reset": [Function anonymous],->
    "setOptions": [Function setOptions],->
    "setParams": [Function anonymous],->
  },
  "options": Object {
    "header": [Function header],->
  },
  "route": Object {
    "key": "Login-ZX2JpI24p5XYTlBx8KFD2",->
    "name": "Login",->
    "params": undefined,->
  },
*/




export const DefaultHeader = (
    // @ts-ignore
    { visible, children, extraStyles, statement, back, route }

) => {
  const dispatch = useDispatch()
  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value);
  // @ts-ignore
  const purchaseAccess = useSelector(state => state.purchaseAccess.value)
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const navigation = useNavigation()
  const r = useRoute()

  const navigateBack = () => {

    console.log("purchaseAccess", purchaseAccess)
    if (r.name === "PurchaseScreen" && purchaseAccess) {
      // @ts-ignore
      navigation.dispatch(CommonActions.popToTop());
      // Setzen Sie einen Zustand, um die Navigation auszulösen, nachdem popToTop abgeschlossen ist
      setShouldNavigate(true);
      dispatch({
        type: 'PURCHASEACCESS',
        payload: false
      });
    } else if (r.name === "PurchaseScreen" && !purchaseAccess) {
      // @ts-ignore
      navigation.navigate("SettingsMain");
    } else {
      navigation.goBack();
    }

  }

  useEffect(() => {
    if (shouldNavigate) {
      // @ts-ignore
      navigation.navigate('Chat', {
        screen: 'AuthNavigator',
        params: {
          screen: 'AccountMain',
        }
      });
      setShouldNavigate(false);
    }
  }, [shouldNavigate, navigation]);
  return (
    <SafeAreaView style={[extraStyles? extraStyles : null, {flex: 1, justifyContent: "flex-start", alignItems: "flex-end", backgroundColor: "transparent"}]}>
      <Appbar.Header
        style={[[uniStyles.headerContainer], { paddingVertical: Platform.OS === "ios" ? 20 : 0,
          backgroundColor: "transparent"}]}>
        {(back || r.name === "PurchaseScreen")? (
          <>
            <HeaderView
              extraStyles={undefined}>
                <Appbar.Action
                  icon="less-than"
                  color={"rgba(0, 0, 0, .8)"}
                  size={27}
                  iconColor={darkmode.headerIconColors}
                  // @ts-ignore
                  onPress={() => {navigateBack()}}
                />
              </HeaderView>
            <HeaderView children={undefined} extraStyles={undefined} />
            <HeaderView children={undefined} extraStyles={undefined} />
          </>
        ):null}
        {children ? (
            children
        ):null}
      </Appbar.Header>
    </SafeAreaView>
  );
}


/*
{!(route.name === "AuthNavigator") ?(
<Appbar.Action  // set here the icon for to action
    icon="account-circle"
    color={"rgba(255, 255, 255, .8)"}
    size={27}
    onPress={() => navigation.navigate('AuthNavigator', {screen: user ? "AccountMain" : "Login"})}// change later to modal opener
/>navigate(route.initialRouteName === "SettingsMain"? "SettingsMain" : "ChatMain")

  const navigateBack = () => {
    console.log("purchaseAccess", purchaseAccess)
    if (r.name === "PurchaseScreen" && purchaseAccess) {
      // @ts-ignore
      navigation.navigate('Chat', {
        screen: 'AuthNavigator',
        params: {
          screen: 'AccountMain',
        }
      });
      dispatch({
        type: 'PURCHASEACCESS',
        payload: false
      });
    } else if (r.name === "PurchaseScreen" && tabName === "Settings") {
        // @ts-ignore
      navigation.navigate("SettingsMain");
    } else {
      navigation.goBack();
    }

  }

 */
