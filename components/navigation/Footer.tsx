import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SettingNavigation} from "../../screens/settings/SettingsNavigator";
import {Platform, StyleSheet} from "react-native";
import ChatNavigation from "../../screens/chat/ChatNavigator";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import React, {Dispatch, memo, SetStateAction, useCallback, useContext, useEffect, useRef} from "react";

// GOOGLE ADMOB
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

import {PrimaryContext, ThemeContext} from "../../screens/Context";

import { BANNER_FOOTER_IOS, BANNER_FOOTER_ANDORID, BANNER_HEADER_IOS, BANNER_HEADER_ANDROID } from "@env";
import ToolsNavigator from "../../screens/tools/ToolsNavigation";

import SwipeModal from "../modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import WelcomeContainer from "../container/WelcomeContainer";
import MotherNavigator from "../../screens/mother/MotherNavigator";
import {startListening, stopListening} from "../../AppFunctions/AppFunctions";
import {useRoute} from "@react-navigation/native";

const adUnitIdBannerAdFooter = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios" ?
    BANNER_FOOTER_IOS :
    BANNER_FOOTER_ANDORID

const adUnitIdBannerAdHeaderHeader = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios" ?
    BANNER_HEADER_IOS :
    BANNER_HEADER_ANDROID

const localStyles = StyleSheet.create(
  {
    icon: {
      top: 0,
      position: "relative",
      margin: 0,
    },
    barStyles: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',

    }
  }
)

interface NavMainTypes{
  firstContact: boolean;
  setFirstContact: Dispatch<SetStateAction<boolean>>;
}

const NavigationMain: React.FC<NavMainTypes> = (
  {
    firstContact,
    setFirstContact
  }
) => {

  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const {customTheme} = useContext(ThemeContext)

  const {bottomSheetLoaded} = useContext(PrimaryContext);

  const welcomeBottomSheetRef = useRef<BottomSheetMethods>(null);




  useEffect(() => {
    if(welcomeBottomSheetRef && firstContact ) {
      setTimeout(() => {
        updateWelcomeBottomSheetIndex(1);
      }, 4000);
    }
  }, [bottomSheetLoaded]);


  const updateWelcomeBottomSheetIndex = useCallback((number: number) => {
    if(welcomeBottomSheetRef.current && firstContact) {
      welcomeBottomSheetRef.current.snapToIndex(-1);
      welcomeBottomSheetRef.current.snapToIndex(number);
      setFirstContact(false);
    }
  }, [firstContact]);


  // STYLES
  const footerIconColor = customTheme.text;
  const footerActiveIconColor = customTheme.primaryButton;

  return (
    <>
      <BannerAd
        unitId={adUnitIdBannerAdHeaderHeader}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <Tab.Navigator
        initialRouteName="Chat" // Erster Tab beim Start der App
        backBehavior="initialRoute" // Verhalten, wenn die Zurück-Taste gedrückt wird
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: footerActiveIconColor, // Farbe des aktiven Tabs
          tabBarInactiveTintColor: footerIconColor, // Farbe der inaktiven Tabs
          tabBarShowLabel: false, // Ob Labels angezeigt werden sollen
          tabBarLabelStyle: { fontSize: 0 }, // Stil des Textlabels
          tabBarBadge: undefined,
          tabBarStyle: {
            backgroundColor: customTheme.primary,
            borderTopWidth: 0,
            borderTopColor: customTheme.primary,
            shadowOffset: {
              width: 0,
              height: 0, // for iOS
            },
            elevation: 0,
            zIndex: 0,
            shadowColor: customTheme.primary,
            height: 50,

          },
          tabBarHideOnKeyboard: true, // Bestimmt, ob die Tastatur die Tab-Leiste ausblendet
        }}>

          <Tab.Screen
            name="Chat"
            children={
              () =>
                  <ChatNavigation bottomSheetRef={bottomSheetRef}/>
              }
            options={{
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons
                  style={localStyles.icon}
                  name={focused ? "comment-multiple" : "comment-multiple-outline"}
                  color={color} size={29}
                />
              ),
            }}
          />
        <Tab.Screen
          name="ToolsNavigator"
          component={ToolsNavigator}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? "view-dashboard" : "view-dashboard-outline"} color={color} size={29} />
            ),
          }}
        />
        <Tab.Screen
          name="MotherNavigator"
          component={MotherNavigator}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? "account-child-circle" : "account-child-outline"} color={color} size={29} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingNavigation}
          options={{
            tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={color} size={29} />
            ),
          }}
        />
      </Tab.Navigator>
      <BannerAd
        unitId={adUnitIdBannerAdFooter}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <SwipeModal
        bottomSheetRef={welcomeBottomSheetRef}
        modalIndex={-1}
        Content={
          <WelcomeContainer />
        }
      />
    </>
  );
}
export default memo(NavigationMain);


/*



 */