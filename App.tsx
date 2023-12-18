import React, {useEffect, useState} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

import {PrimaryContext, Theme, ThemeContext, lightModeTheme, darkModeTheme} from "./screens/Context";
import { store } from "./Redux/store";
import NavigationMain from "./components/navigation/Footer";
import { getDarkmode } from "./components/container/modalContainers/DarkMode";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";

import { getAuth, signInAnonymously } from "firebase/auth";
import firebase from "firebase/compat";
import {FIREBASE_AUTH} from "./firebase.config";

export default function App() {

  // PrimaryContext definitions
  const [darkmode, setDarkmode] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [customTheme, setCustomTheme] = useState<Theme>(darkmode? darkModeTheme : lightModeTheme);
  const [loading, setLoading] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  // init DarkMode
  const toggleTheme = () => setDarkmode(!darkmode);

  useEffect(() => {
    console.log("appIsReady", appIsReady);

    const loadPreferences = async () => {
      try {
        // Keep the splash screen visible while fetching fonts
        await SplashScreen.preventAutoHideAsync();

        signInAnonymously(FIREBASE_AUTH)
          .then((userCredential) => {
            setUser(user as firebase.User);
            console.log("User initialized:", userCredential.user);
          })
          .catch((error) => {
            console.error("Error signing in anonymously:", error);
          });

        console.log("User initialized:", user)

        console.log("Splashscreen initialized..");

        await Font.loadAsync({
          'JetBrainsMono': require('./assets/fonts/codeFont/JetBrainsMono.ttf'),
          'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
          'wizardFont': require('./assets/fonts/poweredFont.otf'),
          'logoFont': require('./assets/fonts/AILogo.regular.ttf'),
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
        <PrimaryContext.Provider value={{ darkmode, toggleTheme, setDarkmode, user, setUser, loading, setLoading }}>
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
