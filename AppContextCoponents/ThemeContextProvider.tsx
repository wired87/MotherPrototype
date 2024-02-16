import React, {Dispatch, memo, SetStateAction, useEffect} from "react";
import {ContextProviderInterface} from "../AppInterfaces/ContextProviderInterface";
import {darkModeTheme, lightModeTheme, ThemeContext} from "../screens/Context";
import {useCustomTheme, useDarkmode} from "../AppHooks/ThemeHook";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {getDarkmode} from "../components/container/modalContainers/DarkMode";
import {useAppIsReady} from "../AppHooks/InitHooks";
import * as SecureStore from "expo-secure-store";

const ThemeContextProvider: React.FC<ContextProviderInterface> = (
  {
    children
  }
) => {

  const {darkmode, setDarkmode, toggleTheme} = useDarkmode();
  const {customTheme, setCustomTheme} = useCustomTheme();
  const { appIsReady, setAppIsReady} = useAppIsReady();

  useEffect(() => {
    console.log("appIsReady", appIsReady);
    const loadPreferences = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        console.log("Splashscreen initialized..");
        await Font.loadAsync({
          'JetBrainsMono': require('../assets/fonts/codeFont/JetBrainsMono.ttf'),
          'Roboto': require('../assets/fonts/Roboto-Regular.ttf'),
          'wizardFont': require('../assets/fonts/poweredFont.otf'),
          'typeIndicator': require('../assets/fonts/codeFont/JetBrainsMono-Italic.ttf'),
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

  const elements = {
    darkmode, setDarkmode, toggleTheme,
    customTheme
  };

  return(
    <ThemeContext.Provider value={elements}>
      {
        children
      }
    </ThemeContext.Provider>
    )
}
export default memo(ThemeContextProvider);