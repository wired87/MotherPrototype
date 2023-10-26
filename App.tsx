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
import NavigationMain from "./components/home/footer";

// Redux
import {store} from "./Redux/store";

// @ts-ignore
import {Provider} from "react-redux";

const pubnub = new PubNub({
  publishKey: 'myPublishKey',
  subscribeKey: 'mySubscribeKey',
  uuid: 'myUniqueUUID'
});

// vars
WebBrowser.maybeCompleteAuthSession();

export default function App() {
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