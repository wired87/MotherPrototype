import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {connectionAlert, getToken} from "./AppFunctions";

import NetInfo from "@react-native-community/netinfo";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";



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
  const [bottomSheetLoaded, setBottomSheetLoaded] = useState<boolean>(false);

  const toggleTheme = () => setDarkmode(!darkmode);

  const contextValue = {
    darkmode, toggleTheme, setDarkmode, user, setUser, loading, setLoading,
    clearMessages, setClearMessages, jwtToken, setJwtToken, isConnected, setIsConnected,
    bottomSheetLoaded, setBottomSheetLoaded
  };

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
      getToken(setJwtToken)
        .then(
          () => setAuthenticated(false)
        );
    }
  }, [authenticated, user, setJwtToken]);



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
          setDarkmode(storedThemePreference === "true");
        }else {
          setDarkmode(false);
        }
        setAppIsReady(true);
      } catch (e: unknown) {
        if (e instanceof Error) console.error("Cant load preferences", e.message);

      } finally {
        console.log("SplashScreen will be closed..");
        await SplashScreen.hideAsync();
      }
    }
    if (!(appIsReady)) {
      loadPreferences()
        .then(() => {
          console.log("Fonts have been successfully loaded!");
        });
    }
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
    if (appIsReady) {
      updateDarkMode()
        .then(() => console.log("Alright"));
    }
  }, [darkmode, appIsReady]);


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