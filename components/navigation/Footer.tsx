import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';

import {SettingNavigation} from "../../screens/settings/SettingsNavigator";
import {Platform} from "react-native";
import {ChatNavigation} from "../../screens/chat/ChatNavigator";
const Tab = createMaterialBottomTabNavigator();

import {useDispatch, useSelector} from "react-redux";
import {themeColors} from "../../colors/theme";
import React, {useCallback, useContext, useEffect, useState} from "react";

import firebase from "firebase/compat";
import auth = firebase.auth;
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth, onAuthStateChanged} from "firebase/auth";

// GOOGLE ADMOB
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {SwipeModal} from "../modals/SwipeModal";
import {ChatMenuModalContent} from "../container/ChatMenuModalContainer/ChatMenuModalContent";

import {PrimaryContext, InputContext} from "../../screens/Context";



const adUnitIdBannerAd = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios" ?
  "ca-app-pub-2225753085204049/2862976257" :
  "ca-app-pub-2225753085204049/8777981057"

// @ts-ignore
export default function NavigationMain() {

  const [user, setUser] = useState(getAuth().currentUser);


  const { bottomSheetRef} = useContext(PrimaryContext);
  //const bottomSheetRef = useRef<BottomSheet>(null);

  const [messageIndex, setMessageIndex] = useState(0);
  const [input, setInput] = useState("");
  const [messagesLeft, setMessagesLeft] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const [messageBreakOption, setMessageBreakOption] = useState(false);
  const [typing, setTyping] = useState(false); // typing indicator

  const {darkmode, setDarkmode} = useContext(PrimaryContext);

  // make Active Tabbar Shadow color transparent
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  // @ts-ignore
  const colors = useSelector(state => state.colors.value)

  const dispatch = useDispatch();

  const updateModalIndex = useCallback((number: number, bottomSheetRef: { current: { snapToIndex: (arg0: number) => void; }; }) => {
    bottomSheetRef.current?.snapToIndex(number);
  }, []);

  const closeModal = () => {
    bottomSheetRef.current?.close();
  }
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
        console.log("User in Footer: ", user)
        dispatch({
          type: "USER",
          payload: {
            email: user.email,
            uid: user.uid,
          }
        })
      } else {
        console.log("User could not be set")
      }
      console.log("user:", user)
    });
  }, []);


  const storeUserSessionData = async () => {
    try {
      const jsonValue = JSON.stringify(5);
      await AsyncStorage.setItem(`user_${user?.uid}`, jsonValue);
    } catch (e) {
      console.log("There was an error save the user session ...")    }
  };

  const getUserSessionData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`user_${user?.uid}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  async function retrieveUserSession() {
    try { // check if the user is already stored
      const data = await getUserSessionData();
      if (data !== undefined || true) {
        storeUserSessionData()
          .then(() => console.log("User session successfully saved ..."))
      }
    } catch (error) {
      console.log("There was an error save the user session ...")
    }
  }

  useEffect(() => {
    // Anmelden mit Firebase Anonymous Auth
    const signInAnonymously = async () => {
      if(!user) {
        // first check if the user is in the encrypt storage
        const { user } = await auth().signInAnonymously();  // get the user id
        console.log('User ID:', user?.uid);
      }
    };

    signInAnonymously()
      .then(() => console.log("User is authenticated"))
      .catch(() => console.log("Fail in footer while try set the user"))
  }, []);

  const dispatchHistorySent = (value: boolean) => {
    dispatch({
      type: "HISTORY_SENT",
      payload: value
    })
    console.log("Dispatched History Text.")
  }
  return (
    <>
      <Tab.Navigator
        shifting={false}
        labeled={false}

        initialRouteName="Settings"
        activeColor={themeColors.sexyBlue}
        inactiveColor={themeColors.sexyBlue}
        backBehavior={"firstRoute"}
        barStyle={{
          height: 50,
          marginTop: 0,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 0,
          paddingVertical: 0,
          backgroundColor:  colors.navigatorColor[darkmode?  1 : 0]  //"transparent"//
        }}>
          <Tab.Screen
            name="Chat"
             // if the Screen Component contains any props just pass them at the bottom
            children={
              () =>
                <InputContext.Provider
                  value={{
                    input, setInput,
                    messagesLeft, setMessagesLeft,
                    messages, setMessages,
                    messageIndex,
                    setMessageIndex,
                    messageBreakOption,
                    setMessageBreakOption,
                    typing, setTyping,
                    }
                  }>
                  <ChatNavigation
                    updateModalIndex={updateModalIndex}
                    dispatchHistorySent={dispatchHistorySent}
                  />
                </InputContext.Provider>
              }
            options={{
              // tabBarBadge: 0, take it to show new messages
              tabBarColor: colors.navigatorColor[darkmode? 1 : 0] ,
              // @ts-ignore
              headerShown: false,
              tabBarIconStyle: { display: "none"},
              // tabBarOnPress: animations for tabPress
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons
                  style={{top: 0, position: "relative"}}
                  name={focused ? "comment-multiple" : "comment-multiple-outline"}
                  color={color} size={29}
                />
              ),
            }}
          />
        <Tab.Screen
          name="Tools"
          component={ToolsNavigation}
          options={{
            tabBarIcon: ({ color, focused }) => (// @ts-ignore
              <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={color} size={29} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingNavigation}
          options={{
            tabBarIcon: ({ color, focused }) => (// @ts-ignore
                <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={color} size={29} />
            ),
          }}
        />
      </Tab.Navigator>
      <SwipeModal
        animation={true}
        Content={
          <ChatMenuModalContent
            changeText={setInput}
            dispatchHistorySent={dispatchHistorySent}
          />
        }
       bottomSheetRef={bottomSheetRef}
        modalIndex={-1}
      />
      <BannerAd
        unitId={adUnitIdBannerAd}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </>
  );
}




/* later





<Tab.Screen
                name="Tools"
                component={ToolScreens} // if the Screen Component contains any props just pass them at the bottom
                options={{
                    tabBarColor: "transparent",
                    tabBarIcon: ({color, focused}) => (
                        <MaterialCommunityIcons name={focused ? "ballot" : "ballot-outline"} color={color} size={26} />
                    ),
                }}
            />
<Tab.Screen
        name="Profile"
        component={ProfileMain}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
 */
