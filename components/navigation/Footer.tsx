import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';

import {SettingNavigation} from "../../screens/settings/SettingsNavigator";
import {Dimensions, Platform, View} from "react-native";
import {ChatNavigation} from "../../screens/chat/ChatNavigator";
const Tab = createMaterialBottomTabNavigator();

const windowWidth = Dimensions.get('window').width;

import {useDispatch, useSelector} from "react-redux";
import {themeColors} from "../../colors/theme";
import {useEffect, useState} from "react";

import firebase from "firebase/compat";
import auth = firebase.auth;
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth, onAuthStateChanged} from "firebase/auth";

// GOOGLE ADMOB
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitIdBannerAd = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios" ?
  "ca-app-pub-2225753085204049/2862976257" :
  "ca-app-pub-2225753085204049/8777981057"

///////////////////////////////////

// @ts-ignore
export default function NavigationMain() {

  const [user, setUser] = useState(getAuth().currentUser)

  const dispatch = useDispatch()

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

  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value);

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

  return (
    <>
      <Tab.Navigator
        shifting={false}
        labeled={false}
        initialRouteName="Chat"
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
          backgroundColor:  darkmode.primary, //"transparent"//
        }}
      >
        <Tab.Screen
          name="Chat"
          component={ChatNavigation} // if the Screen Component contains any props just pass them at the bottom
          options={{
            // tabBarBadge: 0, take it to show new messages
            tabBarColor: darkmode.navigatorColor ,

            // @ts-ignore
            headerShown: false,
            tabBarIconStyle: { display: "none"},
            // tabBarOnPress: animations for tabPress
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons style={{top: 0, position: "relative"}} name={focused ? "comment-multiple" : "comment-multiple-outline"} color={color} size={29} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingNavigation} // if the Screen Component contains any props just pass them at the bottom
          options={{
            tabBarIcon: ({ color, focused }) => (// @ts-ignore
                <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={color} size={29} />
            ),
          }}
        />
      </Tab.Navigator>
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
