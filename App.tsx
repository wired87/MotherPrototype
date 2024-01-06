import React, {useCallback, useEffect, useState} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

import {PrimaryContext, Theme, ThemeContext, lightModeTheme, darkModeTheme, JwtToken} from "./screens/Context";
import { store } from "./Redux/store";
import NavigationMain from "./components/navigation/Footer";
import { getDarkmode } from "./components/container/modalContainers/DarkMode";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";

import {getAuth, signInAnonymously} from "firebase/auth";
import firebase from "firebase/compat";
import {FIREBASE_AUTH} from "./firebase.config";
import {alert, checkTokenAvailability, connectionAlert, saveJwtToken} from "./AppFunctions";
import {CHECK_JWT, LOGIN_JWT} from "@env";

import NetInfo from "@react-native-community/netinfo";

// SECURE URLS
const checkEndpoint: string = CHECK_JWT;
const getEndpoint: string = LOGIN_JWT;


export default function App() {
  // PrimaryContext definitions
  const [darkmode, setDarkmode] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [customTheme, setCustomTheme] = useState<Theme>(darkmode? darkModeTheme : lightModeTheme);
  const [loading, setLoading] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [clearMessages, setClearMessages] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [jwtToken, setJwtToken] = useState<JwtToken | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const toggleTheme = () => setDarkmode(!darkmode);

  const contextValue = {darkmode, toggleTheme, setDarkmode, user, setUser, loading, setLoading,
    clearMessages, setClearMessages, jwtToken, setJwtToken, isConnected, setIsConnected};


  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log("Internet Connection set:", state.isConnected);
      setIsConnected(state.isConnected || false);
    });
  }, []);

  useEffect(() => {
    console.log("Check for the internet connection..")
    if(isConnected){
      console.log("Connection online..")
      const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected) {
          setUserObject()
            .then(() => console.log("Connection successfully restored.."));
        } else {
          console.log("Could not restore the connection..");
          connectionAlert()
        }
      });
      return () => unsubscribe();
    }
  }, [isConnected]);


  const setUserObject = async () => {
    console.log("Init the UserObject..");
    try {
      signInAnonymously(FIREBASE_AUTH)
        .then(() => {
          setAuthenticated(true);
        });
    } catch (e: unknown) {
      console.log("Error, cant sign in anonymously:", e);
      if (e instanceof Error) {
        console.log("Could not set the user", e)
      }
    }
  }

  useEffect(() => {
    getAuth().onAuthStateChanged((userObject) => {
      if (userObject) {
        setUser((userObject as firebase.User));
        console.log("User object set: ", userObject)
      } else {
        console.log("User could not be set in App")
      }
    });
  }, []);


  useEffect(() => {
    if (authenticated && user) {
      getToken()
        .then(
          () => setAuthenticated(false)
        );
    }
  }, [authenticated, user]);


  const getToken = useCallback(async() => {
    const userJwtTokenExist = await checkTokenAvailability();
    console.log("userJwtTokenExist:", userJwtTokenExist);
    if (userJwtTokenExist) {
      try {
        const res = await fetch(checkEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"refresh": userJwtTokenExist.refresh}),
        });
        console.log("res checkEndpoint:", res);
        const response = await res.json();
        console.log("checkEndpoint Response:", response);
        if (response.refresh && response.refresh.access) {
          console.log("accessToken received..");
          userJwtTokenExist.access = response.refresh.access;
          await saveJwtToken(userJwtTokenExist);
          setJwtToken(userJwtTokenExist);
          console.log("Token was successfully Set..");
        } else {
          await getNewTokenProcess();
        }
      } catch(e) {
        if (e instanceof Error) {
          console.error("Error occurred AAAAAAAH,", e);
        }
      }
    } else {
      await getNewTokenProcess();
    }
  }, [jwtToken, user, authenticated]);

  useEffect(() => {
    console.log("JWTTOKEN:", jwtToken);
  }, [jwtToken]);


  useEffect(() => {
    console.log("jwtToken:", jwtToken);
  }, []);
  const getNewTokenProcess = async () => {
    console.log("getNewTokenProcess started..")
    const tokenObject: JwtToken | null  = await getNewToken();
    console.log("tokenObject getNewTokenProcess:", tokenObject);
    if (tokenObject) {
      setJwtToken(tokenObject);
    }else {
      console.log("Could not save the new JWT Token!")
      alert()
    }
  }



  const getNewToken = async(): Promise<JwtToken | null> => {
    console.log("getNewToken started..");
    const senderObject = JSON.stringify({"user_id": user?.uid});
    console.log("senderObject created:", senderObject);
    try {
      const res = await fetch(
        getEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: senderObject,
        }
      );
      console.log("res:", res)
      const response = await res.json();
      console.log("response getNewToken:", response);
      if (response.access && response.refresh) {
        await saveJwtToken(response);
        return response;
      }
    }catch (e: unknown) {
      if (e instanceof Error) console.error("Error occurred in getNewToken", e.message);
    }
  return null
  }


  useEffect(() => {
    console.log("appIsReady", appIsReady);
    const loadPreferences = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        console.log("Splashscreen initialized..");
        await Font.loadAsync({
          'JetBrainsMono': require('./assets/fonts/codeFont/JetBrainsMono.ttf'),
          'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
          'wizardFont': require('./assets/fonts/poweredFont.otf'),
          'typeIndicator': require('./assets/fonts/codeFont/JetBrainsMono-Italic.ttf'),
        })

        console.log("Fonts have been loaded..");
        const storedThemePreference: string | false | null | true = await getDarkmode();

        console.log("storedThemePreference", storedThemePreference, typeof storedThemePreference);

        if (storedThemePreference !== null) {
          console.log("storedThemePreference !== null");
          setAppIsReady(true);
          setDarkmode(storedThemePreference === "true");
        }else {
          setAppIsReady(true);
          setDarkmode(false);
        }
      } catch (e: unknown) {
        if (e instanceof Error) console.error("Cant load preferences", e.message);

      } finally {
        console.log("SplashScreen will be closed..");
        await SplashScreen.hideAsync();
      }
    }
    if (!(appIsReady)) loadPreferences()
      .then(() => console.log("Fonts have been successfully loaded!"));
  }, []);



  useEffect(() => {
    console.log("darkmodeAPP.tsx", darkmode);
    const updateDarkMode = async () => {
      try {
        await SecureStore.setItemAsync("darkmode", String(darkmode));
        console.log("DarkMode changed in main darkMode func to", darkmode);
        const storedValue = await getDarkmode();
        console.log("Stored value in Secure Store:", storedValue);
        // update the colors here
        setCustomTheme(darkmode ? darkModeTheme : lightModeTheme);
      } catch (e) {
        console.error('Error updating dark mode', e);
      }
    };
    if (appIsReady) updateDarkMode()
      .then(() => console.log("Alright"));
  }, [darkmode]);


  return (
    <ReduxProvider store={store}>
      <ThemeContext.Provider value={{customTheme}}>
        <PrimaryContext.Provider
          value={contextValue}>
          <PaperProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <NavigationContainer>
                  <NavigationMain />
                </NavigationContainer>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </PaperProvider>
        </PrimaryContext.Provider>
      </ThemeContext.Provider>
    </ReduxProvider>
  );
}

/*
FIREBASE REVENUE CAT CHECK IFR A USER IS ON PAID PLAN
getAuth().currentUser.getIdTokenResult()
  .then((idTokenResult) => {
    // Confirm the user has a premium entitlement.
    if (!!idTokenResult.claims.activeEntitlements.includes("premium")) {
      // Show premium UI.
      showPremiumUI();
    } else {
      // Show regular user UI.
      showFreeUI();
    }
  })
  .catch((error) => {
    console.log(error);
  });

  useEffect(() => {
    console.log("Check for the internet connection..")
    if(!isConnected){
      console.log("Connection online..")
      const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected) {
          setUserObject()
            .then(() => console.log("Connection successfully restored.."));
        } else {
          console.log("Could not restore the connection..");
          connectionAlert()
        }
      });
      return () => unsubscribe();
    } else {
      console.log("isConnected:", isConnected);
      connectionAlert();
    }
  }, [isConnected]);

 */