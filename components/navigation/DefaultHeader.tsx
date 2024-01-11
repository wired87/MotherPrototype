import {StyleSheet} from "react-native";
import { Appbar } from "react-native-paper";
import {useNavigation, useRoute} from "@react-navigation/native";
import React, {memo, useCallback, useContext} from "react";
import {uniStyles} from "../../screens/universalStyles";
import {HeaderView} from "../container/headerContainer";
import {ThemeContext} from "../../screens/Context";


const localStyles = StyleSheet.create(
  {
    main: {
      justifyContent: "flex-start",
      alignItems: "flex-end",
      height: 20,
    },
    leftExtraStyles: {
      alignItems: "flex-start",
      justifyContent: "flex-end",
      height: "100%",
    },

    backIcon: {
      left: 5,
      position: "absolute",
      zIndex: 900000
    },
    rightExtra: {
      justifyContent: "flex-start",
      alignItems: "flex-end",

    },
    middleExtra: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
    }
  }
)

const backIconName: string = "less-than";

interface DefaultHeaderTypes {
  childrenMiddle?: React.ReactNode;
  childrenRight?: React.ReactNode;
  extraStyles?: any;
}

const DefaultHeader: React.FC<DefaultHeaderTypes> =
({
 childrenMiddle,
 childrenRight,
}) => {

  const {customTheme} = useContext(ThemeContext);
  const route = useRoute();
  const navigation = useNavigation();

  const shouldShowBackIcon = useCallback(() => {
    const screensToShowBackIcon = [
      "PurchaseScreen",
      "AccountMain",
      "PasswordChange",
      "EmailChange",
      "NewPasswordConfirmation",
      "ForgotPassword",
      "AuthNavigator",
      "Speech-to-Text",
      "ResumeCreator",
      "ChatResponseHelper",
    ];
    return navigation.canGoBack() && screensToShowBackIcon.includes(route.name) &&
      !["ChatMain", "ChatNavigation"].includes(route.name);
  }, [navigation, route.name,]);

  const shouldShowChildren = useCallback(() => {
    return ![
      "SettingsMain"].includes(route.name);
  }, [route.name]);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const headerStyles = [uniStyles.headerContainer, {backgroundColor: customTheme.primary}]

  if (shouldShowChildren()) {
    return (
      <Appbar.Header style={headerStyles}>
        <HeaderView extraStyles={localStyles.leftExtraStyles}>
          {shouldShowBackIcon() && (
            <Appbar.Action
              icon={backIconName}
              style={localStyles.backIcon}
              color={customTheme.text}
              size={27}
              iconColor={customTheme.headerIconColors}
              onPress={navigateBack}
            />
          )}
        </HeaderView>

        <HeaderView extraStyles={localStyles.middleExtra}>
          {childrenMiddle}
        </HeaderView>

        <HeaderView extraStyles={localStyles.rightExtra}>
          {childrenRight}
        </HeaderView>

      </Appbar.Header>
    );
  }
}

export default memo(DefaultHeader);










/*





return (
    <View style={[extraStyles, localStyles.main, { backgroundColor: customTheme.primary }]}>
      {shouldShowChildren() && (
        <Appbar.Header style={uniStyles.headerContainer}>
          <HeaderView extraStyles={localStyles.leftExtraStyles}>
            {shouldShowBackIcon() && (
              <Appbar.Action
                icon={backIconName}
                style={localStyles.backIcon}
                color={customTheme.text}
                size={27}
                iconColor={customTheme.headerIconColors}
                onPress={navigateBack}
              />
            )}
          </HeaderView>

          <HeaderView extraStyles={localStyles.middleExtra}>
            {childrenMiddle}
          </HeaderView>

          <HeaderView extraStyles={localStyles.rightExtra}>
            {childrenRight}
          </HeaderView>
        </Appbar.Header>
      )}
    </View>












const DefaultHeader = (
    // @ts-ignore
    { childrenMiddle, childrenRight, extraStyles }
) => {

  const {customTheme} = useContext(ThemeContext);

  const route = useRoute();

  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const backIcon =
    canGoBack ||
    route.name === "PurchaseScreen" ||
    route.name === "AccountMain" ||
    route.name !== "ChatMain"

  const routeNames =
    route.name !== "PasswordChange" &&
    route.name !== "EmailChange" &&
    route.name !== "ForgotPassword" &&
    route.name !== "NewPasswordConfirmation" &&
    route.name !== "AccountMain";

  const notSettingsMain = route.name !== "SettingsMain";

  const navigateBack = useCallback(() => {
    return () => navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={[extraStyles? extraStyles : null, localStyles.main,
      {backgroundColor: customTheme.primary}]}>
      {notSettingsMain? (
      <Appbar.Header style={uniStyles.headerContainer}>
        <HeaderView extraStyles={localStyles.leftExtraStyles}>
          {backIcon? (
            <Appbar.Action
              icon={backIconName}
              style={localStyles.backIcon}
              color={customTheme.text}
              size={27}
              iconColor={customTheme.headerIconColors}
              onPress={navigateBack}
            />
          ):null}
        </HeaderView>d

        <HeaderView extraStyles={localStyles.middleExtra}>
          {routeNames?(
          childrenMiddle
          ):null}
        </HeaderView>

        <HeaderView extraStyles={localStyles.rightExtra}>
          {routeNames ? (
            childrenRight
          ):null}
        </HeaderView>

      </Appbar.Header>
      ):null}
    </SafeAreaView>
  );
}

export default memo(DefaultHeader);








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
    useEffect(() => {

    console.log("purchaseAccess", purchaseAccess)
    if (!(route.name === "PurchaseScreen" && purchaseAccess)) {
      navigation.goBack();
    } else if (route.name === "PurchaseScreen" && !purchaseAccess) {
      // @ts-ignore
      navigation.navigate("SettingsMain");
    } else {
      setShouldNavigate(true);
      dispatch({
        type: 'PURCHASEACCESS',
        payload: false
      });

    }

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
}, [shouldNavigate]);
*/


