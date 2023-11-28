import {Platform, SafeAreaView} from "react-native";
import { Appbar } from "react-native-paper";
import {useNavigation, useRoute} from "@react-navigation/native";
import React, {memo, useContext, useEffect, useState} from "react";
import {uniStyles} from "../../screens/universalStyles";
import {HeaderView} from "../container/headerContainer";
import {useDispatch, useSelector} from "react-redux";
import {PrimaryContext, ThemeContext} from "../../screens/Context";

export const DefaultHeader = (
    // @ts-ignore
    { childrenMiddle, childrenRight, extraStyles, back }
) => {
  const dispatch = useDispatch()

  const {customTheme} = useContext(ThemeContext);

  // @ts-ignore
  const purchaseAccess = useSelector(state => state.purchaseAccess.value)

  const [shouldNavigate, setShouldNavigate] = useState(false);

  const navigation = useNavigation()
  const r = useRoute()

  const navigateBack = () => {
    console.log("purchaseAccess", purchaseAccess)
    if (r.name === "PurchaseScreen" && purchaseAccess) {
      // @ts-ignore
      navigation.goBack();
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
  };

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
    <SafeAreaView style={[extraStyles? extraStyles : null,
      {justifyContent: "flex-start", alignItems: "flex-end",
        backgroundColor: customTheme.primary}]}>

      <Appbar.Header
        style={[[uniStyles.headerContainer], { paddingVertical: Platform.OS === "ios" ? 20 : 0,
          backgroundColor: "transparent"}]}>

        <HeaderView extraStyles={{alignItems: "flex-start", justifyContent: "flex-start", height: "100%"}}>
          {(back || r.name === "PurchaseScreen" || r.name === "AccountMain" )? (
            <Appbar.Action
              icon="less-than"
              style={{left: 5, position: "absolute", zIndex: 900000}}
              color={"rgba(0, 0, 0, .8)"}
              size={27}
              iconColor={customTheme.headerIconColors}
              // @ts-ignore
              onPress={() => {navigateBack()}}
            />
          ):null}
        </HeaderView>

        <HeaderView extraStyles={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          {childrenMiddle}
        </HeaderView>

        <HeaderView extraStyles={{justifyContent: "center", alignItems: "flex-end"}}>
          {childrenRight}
        </HeaderView>

      </Appbar.Header>
    </SafeAreaView>
  );
}


//  ALL PROPS FROM NAVIGATOR
/*
     <Appbar.Action
            icon={rightIcon}
            style={[{left: 5, position: "absolute", zIndex: 900000}]}
            color={"rgba(0, 0, 0, .8)"}
            size={27}
            iconColor={customTheme.headerIconColors}
            // @ts-ignore
            onPress={() => {navigateBack()}}
          />
      <Appbar.Action
            icon={middleIcon}
            style={{left: 5, position: "absolute", zIndex: 900000}}
            color={"rgba(0, 0, 0, .8)"}
            size={27}
            iconColor={customTheme.headerIconColors}
            // @ts-ignore
            onPress={() => {navigateBack()}}
          />
<HeaderView
                  extraStyles={{justifyContent: "center", alignItems: "center", left: 3, backgroundColor: "blue"}}>
  return (
    <SafeAreaView style={[extraStyles? extraStyles : null,
      {justifyContent: "flex-start", alignItems: "flex-end",
      backgroundColor: customTheme.primary}]}>

      <Appbar.Header
        style={[[uniStyles.headerContainer], { paddingVertical: Platform.OS === "ios" ? 20 : 0,
          backgroundColor: "transparent", borderWidth: 10, borderColor: "red",}]}>
          <>
            <HeaderView extraStyles={{alignItems: "flex-start", justifyContent: "flex-start", height: "100%"}}>
              {(back || r.name === "PurchaseScreen" || r.name === "AccountMain" )? (
              <Appbar.Action
                icon="less-than"
                style={{left: 5, position: "absolute", zIndex: 900000}}
                color={"rgba(0, 0, 0, .8)"}
                size={27}
                iconColor={customTheme.headerIconColors}
                // @ts-ignore
                onPress={() => {navigateBack()}}
              />
                ):null}
            </HeaderView>
            <HeaderView extraStyles={undefined}>
              {childrenMiddle}
            </HeaderView>
            <HeaderView extraStyles={undefined}>
              {childrenRight}
            </HeaderView>
          </>
      </Appbar.Header>
    </SafeAreaView>
  );
  return (
    <SafeAreaView style={[extraStyles? extraStyles : null,
      {justifyContent: "flex-start", alignItems: "flex-end", borderWidth: 10, borderColor: "red",
      backgroundColor: customTheme.primary}]}>

      <Appbar.Header
        style={[[uniStyles.headerContainer], { paddingVertical: Platform.OS === "ios" ? 20 : 0,
          backgroundColor: "transparent"}]}>
        {(back || r.name === "PurchaseScreen" || r.name === "AccountMain" )? (
          <>
            <HeaderView extraStyles={{alignItems: "flex-start", justifyContent: "flex-start", height: "100%"}}>
              <Appbar.Action
                icon="less-than"
                style={{left: 5, position: "absolute", zIndex: 900000}}
                color={"rgba(0, 0, 0, .8)"}
                size={27}
                iconColor={customTheme.headerIconColors}
                // @ts-ignore
                onPress={() => {navigateBack()}}
              />
            </HeaderView>
            <HeaderView extraStyles={undefined}>

            </HeaderView>
            <HeaderView extraStyles={undefined}>

            </HeaderView>
          </>
        ):null}
        {children ? (
            children
        ):null}
      </Appbar.Header>
    </SafeAreaView>
  );
}

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


