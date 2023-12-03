import React, {useEffect, useState} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import {PrimaryContext, Theme, ThemeContext, lightModeTheme, darkModeTheme} from "./screens/Context";
import { store } from "./Redux/store";
import NavigationMain from "./components/navigation/Footer";
import { getDarkmode } from "./components/container/modalContainers/DarkMode";
import * as SecureStore from "expo-secure-store";
import firebase from "firebase/compat";


//  const bottomSheetRef = React.createRef<BottomSheetMethods>();
export default function App() {

  // PrimaryContext definitions
  const [darkmode, setDarkmode] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [customTheme, setCustomTheme] = useState<Theme>(darkmode? darkModeTheme : lightModeTheme);
  const [loading, setLoading] = useState(false);

  // init DarkMode
  const toggleTheme = () => setDarkmode(!darkmode);

  useEffect(() => {
    const loadDarkMode = async () => {
      try {
        const storedThemePreference = await getDarkmode();
        console.log("storedThemePreference", storedThemePreference, typeof storedThemePreference)
        if (storedThemePreference !== null) {
          setDarkmode(storedThemePreference === "true")
        }
      } catch (e) {
        console.error('Failed to load theme preference', e);
      }
    };
    loadDarkMode().then(() => console.log("Preferences successfully load"));
  }, []);


  useEffect(() => {
    console.log("darkmodeAPP.tsx", darkmode)
    console.log("customTheme", customTheme);
    const updateDarkMode = async () => {
      try {
        await SecureStore.setItemAsync("darkmode", String(darkmode));
        console.log("DarkMode changed in main darkMode func to", darkmode);
      } catch (e) {
        console.error('Error updating dark mode', e);
      }
    };
    updateDarkMode()
      .then(() => {
        console.log("Successfully finished darkMode function..");
        // update the colors here
        setCustomTheme(darkmode? darkModeTheme : lightModeTheme)
      });
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

/*




import {
  PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,} from 'react-native-paper';
import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";

import {PrimaryContext} from "./screens/Context";
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
// import {Chat} from "@pubnub/react-native-chat-components";
import * as DocumentPicker from 'expo-document-picker';

// Redux
import {store} from "./Redux/store";
import * as Font from 'expo-font';


const pubnub = new PubNub({
  publishKey: 'myPublishKey',
  subscribeKey: 'mySubscribeKey',
  uuid: 'myUniqueUUID'
});

// @ts-ignore
import {Provider} from "react-redux";
import NavigationMain from "./components/navigation/Footer";
import {createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {useFonts} from "expo-font";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";

WebBrowser.maybeCompleteAuthSession();

import merge from 'deepmerge';
import {getDarkmode} from "./components/container/modalContainers/DarkMode";
import * as SecureStore from "expo-secure-store";
import firebase from "firebase/compat";
import User = firebase.User;

export const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
export const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);



export default function App() {

  const [darkmode, setDarkmode] = useState(false);
  const [user, setUser] = useState<User | null>(null);//(getAuth().currentUser)


  useEffect(() => {
    // @ts-ignore
    const darkmodeSet = async () => {
      await SecureStore.setItemAsync("darkmode", String(darkmode));
    }
    darkmodeSet().then(() => console.log("darkmode value changed"))
  }, [darkmode]);

  const toggleTheme = () => {
    setDarkmode(!darkmode);
  };

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const storedThemePreference = await getDarkmode();
        if (storedThemePreference !== null) {
          setDarkmode(storedThemePreference === 'true');
        }
      } catch (e) {
        // Fehlerbehandlung, falls das Lesen fehlschlägt
        console.error('Failed to load theme preference', e);
      }
    };
    loadPreferences().then(r => console.log("loadPreferences finished "));
  }, []);


  const [fontsLoaded] = useFonts({
    'JetBrainsMono': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  const customFonts = {
    'JetBrainsMono': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
  };

  const loadFonts = async () => {
    try {
      await Font.loadAsync(customFonts);
    } catch(error) {
      // @ts-ignore
      console.log(error.message);
    }
  }

  useEffect(() => {
    try {
      loadFonts().then(r => console.log("Jetbrains initialized"));
    } catch(error) {
      // @ts-ignore
      console.log(error.message)
    }
  }, []);

  return (
    <Provider store={store}>
      <PrimaryContext.Provider value={{ darkmode, toggleTheme, setDarkmode, user, setUser }}>
        <PaperProvider theme={darkmode? CombinedDarkTheme : CombinedDefaultTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <NavigationContainer>
                <NavigationMain />
              </NavigationContainer>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PaperProvider>
      </PrimaryContext.Provider>
    </Provider>
  );
}



user auth login


header:Ö::::: WICHTIG
<Stack.Navigator
        initialRouteName="Home" // the default route (HomeScreen)
        screenOptions={{ // set the
            header: (props) => <CustomNavigationBar {...props} />,
        }}>
          <Stack.Screen name="Home" component={AllTabs} />
        </Stack.Navigator>






const AllTabs = () => {
  return(
    <Tab.Navigator
      initialRouteName="Profile"
      tabBar={(props) => <FooterTabBar {...props} />}
      >
      <Tab.Screen name="Home" component={HomeMain} />
      <Tab.Screen name="Profile" component={ProfileMain} />
      <Tab.Screen name="Mom" component={ProfileMain} />
    </Tab.Navigator>
  );
}
*/