import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';

import {SettingNavigation} from "../../screens/settings/SettingsNavigator";
import {Platform, StyleSheet} from "react-native";
import ChatNavigation from "../../screens/chat/ChatNavigator";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import React, {Dispatch, memo, SetStateAction, useCallback, useContext, useEffect, useRef, useState} from "react";

// GOOGLE ADMOB
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

import {PrimaryContext, InputContext, ThemeContext, ToolContext} from "../../screens/Context";
import {Recording} from "expo-av/build/Audio/Recording";

import { BANNER_FOOTER_IOS, BANNER_FOOTER_ANDORID, BANNER_HEADER_IOS, BANNER_HEADER_ANDROID } from "@env";
import ToolsNavigator from "../../screens/tools/ToolsNavigation";
import {
  checkToolActionValue,
  getToolActionValue,
  postToolActionValue,
  showToolAds
} from "../../screens/chat/functions/AdLogic";
import SwipeModal from "../modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import WelcomeContainer from "../container/WelcomeContainer";
import {sendObject} from "../../screens/chat/functions/SendProcess";
import {getToken} from "../../AppFunctions";
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


const NavigationMain: React.FC = () => {

  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  // InputContext definitions
  const [messageIndex, setMessageIndex] = useState(0);
  const [input, setInput] = useState("");
  const [messagesLeft, setMessagesLeft] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [messageBreakOption, setMessageBreakOption] = useState(false);
  const [typing, setTyping] = useState(false); // typing indicator
  const [currentRecording, setCurrentRecording] = useState(false);
  const [userRecording, setUserRecording] = useState<Recording | null>(null);




  const {customTheme} = useContext(ThemeContext)

  // make Active Tabbar Shadow color transparent
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent"

  const elements = {
    input, setInput,
    messagesLeft, setMessagesLeft,
    messages, setMessages,
    messageIndex,
    setMessageIndex,
    messageBreakOption,
    setMessageBreakOption,
    typing, setTyping,
    userRecording, setUserRecording,
    currentRecording, setCurrentRecording
  }
  const checkToolActionValueProcess = async (): Promise<boolean> => {
    const valueToolActions = await getToolActionValue();
    console.log("Try to get the user Tool Action Value", valueToolActions);
    if (!valueToolActions) {
      await postToolActionValue("1").then(async () => {
        setToolActionValue("1");
      });
    } else {
      setToolActionValue(valueToolActions);
    }
    return await checkToolActionValue(valueToolActions || "1", setToolActionValue);
  };

  const {
    bottomSheetLoaded,
    jwtToken,
    setJwtToken,
    setLoading
  } = useContext(PrimaryContext);


  ////////////////////////////////////////////  TOOL CONTEXT
  const [toolActionValue, setToolActionValue] = useState<string>("");

  const toolPostRequest = async (
    postUrl: string,
    postObject: object,
    setError: Dispatch<SetStateAction<string | object>>,
    setResponse: Dispatch<SetStateAction<string | object>>,
  ):Promise<any> => {

    console.log("jwtToken n Application Content:", jwtToken);

    // just show if in one of the tool screens
    if (toolActionValue === "0") {
      console.log("User has 0 Actions left. Init Ads...")
      await showToolAds(toolActionValue, setToolActionValue);
    }

    setToolActionValue("0");

    setLoading(true);
    let response;

    try {
      if (jwtToken?.refresh && jwtToken.access) {
        console.log("Application data sent: ", postObject);
        response = await sendObject(
          postObject,
          jwtToken,
          setJwtToken,
          postUrl
        );
      } else {
        console.error("No token provided");
        const newToken = await getToken(setJwtToken);
        if (newToken) {
          response = await sendObject(
            postObject,
            newToken,
            setJwtToken,
            postUrl
          );
        } else {
          console.error("New Token request failed...");
          setError("Authentication Error");
        }
      }
      if (response) {
        console.log("Application response Successfully:", response);
        setResponse(response);
      } else {
        console.error("Received no result:", response);
        setError("Error occurred. Please try again or contact the support.");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
        console.error("Error while contact submit occurred:", e.message);
      }
    } finally {
      console.log("Application request finished without trouble...");
      setLoading(false);
    }
  }

  const toolElements = {
    toolActionValue,
    setToolActionValue,
    checkToolActionValueProcess,
    toolPostRequest
  }

  ////////////////////// !!! TOOL



  const welcomeBottomSheetRef = useRef<BottomSheetMethods>(null);

  useEffect(() => {
    if(welcomeBottomSheetRef) {
      setTimeout(() => {
        console.log("4 sec...")
        updateWelcomeBottomSheetIndex(1);
      }, 4000);
      console.log("0 sec...")
    }
  }, [bottomSheetLoaded]);



  const updateWelcomeBottomSheetIndex = useCallback((number: number) => {
    if(welcomeBottomSheetRef.current) {
      welcomeBottomSheetRef.current.snapToIndex(number);
    }
  }, []);


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
                <InputContext.Provider
                  value={elements}>
                  <ChatNavigation
                    bottomSheetRef={bottomSheetRef}
                  />
                </InputContext.Provider>
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
          children={
            () =>
            <ToolContext.Provider value={toolElements}>
              <ToolsNavigator />
            </ToolContext.Provider>
          }
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? "view-dashboard" : "view-dashboard-outline"} color={color} size={29} />
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
 <Tab.Navigator
        shifting={false}
        labeled={false}
        initialRouteName="ToolsNavigator"
        activeColor={footerActiveIconColor}
        inactiveColor={footerIconColor}
        backBehavior={"firstRoute"}
        barStyle={[localStyles.barStyles, { backgroundColor: customTheme.primary }]}>
 */