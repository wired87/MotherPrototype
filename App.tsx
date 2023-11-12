import { PaperProvider } from 'react-native-paper';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
// import {Chat} from "@pubnub/react-native-chat-components";
import * as DocumentPicker from 'expo-document-picker';

// Redux
import {store} from "./Redux/store";
import * as Font from 'expo-font';

/*
const pubnub = new PubNub({
  publishKey: 'myPublishKey',
  subscribeKey: 'mySubscribeKey',
  uuid: 'myUniqueUUID'
});
*/
// @ts-ignore
import {Provider} from "react-redux";
import NavigationMain from "./components/navigation/Footer";
import {useEffect} from "react";
import {useFonts} from "expo-font";

//!!!!!!!!!!!!!!!!      C:\Users\wired\OneDrive\Desktop\AiChat0333\AiChat501    !!!!!!!!!!!!!!!!!!!!
// vars
WebBrowser.maybeCompleteAuthSession();

export default function App() {

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
      {/*<PubNubProvider client={pubnub}>*/}
        <PaperProvider>
          <NavigationContainer>
            <NavigationMain/>
          </NavigationContainer>
        </PaperProvider>
      {/*<PubNubProvider client={pubnub}>*/}
    </Provider>
  );
}



/*
user auth login


header:Ö::::: WICHTIG
<Stack.Navigator
        initialRouteName="Home" // the default route (HomeScreen)
        screenOptions={{ // set the
            header: (props) => <CustomNavigationBar {...props} />,
        }}>
          <Stack.Screen name="Home" component={AllTabs} />
        </Stack.Navigator>
 */




/*
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