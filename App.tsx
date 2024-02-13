import React, {useEffect} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import {
  PrimaryContext,
  ToolContext,
  ThemeContext,
  lightModeTheme,
  darkModeTheme,
  MediaContext,
  InputContext, UserObject
} from "./screens/Context";

import NavigationMain from "./components/navigation/Footer";
import { getDarkmode } from "./components/container/modalContainers/DarkMode";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";

import {getAuth} from "firebase/auth";

import NetInfo from "@react-native-community/netinfo";

// HOOKS
import {useUser} from "./AppHooks/AuthHooks";
import {useAppIsReady, useFirstContact, useIsConnected} from "./AppHooks/InitHooks";
import {useCustomTheme, useDarkmode} from "./AppHooks/ThemeHook";
import {useInputContextHooks} from "./AppHooks/ContextHooks/InputContextHooks";
import {usePrimaryContextHooks} from "./AppHooks/ContextHooks/PrimaryContextHooks";
import {useToolHooks} from "./AppHooks/ToolHooks";
import {useMediaContextHooks} from "./AppHooks/ContextHooks/MediaContextHooks";


export default function App() {
  // AUTH HOOKS
  const {setUser } = useUser();

  // INIT HOOKS
  const {appIsReady, setAppIsReady} = useAppIsReady();
  const {setIsConnected} = useIsConnected();
  const {firstContact, setFirstContact} = useFirstContact();

  // THEME HOOKS
  const {darkmode, setDarkmode}= useDarkmode();
  const {customTheme, setCustomTheme} = useCustomTheme();

  // STYLES
  const gestureHandlerStyles = { flex: 1, backgroundColor: customTheme.primary }

  //////////// INIT THE APPLICATION
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log("Internet Connection set:", state.isConnected);
      setIsConnected(state.isConnected || false);
    });
  }, []);


  useEffect(() => {
    getAuth().onAuthStateChanged((userObject) => {
      if (userObject) {
        const customuserObject:UserObject= {
          uid: userObject.uid,
          email: undefined,
          emailService: undefined
        }
        setUser(customuserObject);
        console.log("User object set: ", userObject)
      } else {
        console.log("User could not be set in App")
      }
    });
  }, []);

  // IF user && authenticated STATE: getJwtToken -> in AuthHooks

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

      }catch(e: unknown) {
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
    console.log("darkModeAPP.tsx", darkmode);
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
    <ThemeContext.Provider value={{customTheme}}>
      <MediaContext.Provider value={useMediaContextHooks()}>
        <InputContext.Provider value={useInputContextHooks()}>
          <PrimaryContext.Provider value={usePrimaryContextHooks()}>
            <ToolContext.Provider value={useToolHooks()}>
              <GestureHandlerRootView style={gestureHandlerStyles}>
                <BottomSheetModalProvider>
                  <NavigationContainer>
                    <NavigationMain firstContact={firstContact} setFirstContact={setFirstContact}/>
                  </NavigationContainer>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </ToolContext.Provider>
          </PrimaryContext.Provider>
        </InputContext.Provider>
      </MediaContext.Provider>
    </ThemeContext.Provider>
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



/*



*/
