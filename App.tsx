import { PaperProvider } from 'react-native-paper';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";

// Pubnub
// @ts-ignore
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import {Chat} from "@pubnub/react-native-chat-components";

// other


// Redux
import {store} from "./Redux/store";
import * as Font from 'expo-font';
// @ts-ignore
import {Provider} from "react-redux";
import NavigationMain from "./components/navigation/Footer";
import {useEffect, useState} from "react";
import {useFonts} from "expo-font";
import {getAuth} from "firebase/auth";

const pubnub = new PubNub({
  publishKey: 'myPublishKey',
  subscribeKey: 'mySubscribeKey',
  uuid: 'myUniqueUUID'
});


// vars
WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const user = getAuth().currentUser;

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
    console.log("user:", user)
      try {
      loadFonts().then(r => console.log("Jetbrains initialized"));
    } catch(error) {
      // @ts-ignore
      console.log(error.message)
    }

  }, []);

  return (
      <Provider store={store}>
        <PubNubProvider client={pubnub}>
          <PaperProvider>
            <NavigationContainer>
              <NavigationMain />
              <Chat currentChannel={"Home"}/>
            </NavigationContainer>
          </PaperProvider>
        </PubNubProvider>
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