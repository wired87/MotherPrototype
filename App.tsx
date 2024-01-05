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
import {alert, checkTokenAvailability, saveJwtToken} from "./AppFunctions";
import {JWT_CHECK, JWT_GET} from "@env";
import axios from "axios/index";


// SECURE URLS
const checkEndpoint: string = JWT_CHECK;
const getEndpoint: string = JWT_GET;


export default function App() {

  // PrimaryContext definitions
  const [darkmode, setDarkmode] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [customTheme, setCustomTheme] = useState<Theme>(darkmode? darkModeTheme : lightModeTheme);
  const [loading, setLoading] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [clearMessages, setClearMessages] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [jwtToken, setJwtToken] = useState<JwtToken>({} as JwtToken);
  const toggleTheme = () => setDarkmode(!darkmode);

  const contextValue = {darkmode, toggleTheme, setDarkmode, user, setUser, loading, setLoading,
    clearMessages, setClearMessages, jwtToken, setJwtToken}
  // init DarkMode


  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {

        setUser((user as firebase.User));
        console.log("User set in App: ", user)

      } else {
        console.log("User could not be set in App")
      }
    });
  }, []);

  const getNewToken = useCallback(async(): Promise<JwtToken | null> => {
    const response = await axios.post(JWT_GET, user?.uid);
    const data: JwtToken = response.data;
    if (response.status && data.access && data.refresh) {
      await saveJwtToken(data);
      return data;
    }
    return null
  }, [user])

  const getNewTokenProcess = async () => {
    const tokenObject: JwtToken | null  = await getNewToken();
    if (tokenObject) {
      setJwtToken(tokenObject);
    }else {
      console.log("Could not save the new JWT Token!")
      alert()
    }
  }

  const getToken = useCallback(async() => {
    const userJwtTokenExist = await checkTokenAvailability()
    if (userJwtTokenExist) {
      const response = await axios.post(checkEndpoint, {"refresh": userJwtTokenExist.refresh});
      if (response.data.access) {
        console.log("")
        userJwtTokenExist.access = response.data.access
        await saveJwtToken(userJwtTokenExist);
        setJwtToken(userJwtTokenExist);
        console.log("Token was successfully Set..")
      } else {
        await getNewTokenProcess()
        }
      }
    else {
      await getNewTokenProcess()
    }
  }, [jwtToken])


  useEffect(() => {
    if (authenticated && user) {
      getToken()
        .then(
          () => setAuthenticated(false)
        );
    }
  }, [authenticated, user]);


  useEffect(() => {
    console.log("appIsReady", appIsReady);

    const loadPreferences = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        try {
           signInAnonymously(FIREBASE_AUTH)
             .then(() => {
               setAuthenticated(true);
             })
        }
        catch(e:unknown) {
          if (e instanceof Error) console.log("Could not sign in the user anonymously..")
        }

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
    if (!(appIsReady)) loadPreferences().then(() => console.log("Fonts have been successfully loaded!"));
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
    if (appIsReady) updateDarkMode().then(() => console.log("Alright"));
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
