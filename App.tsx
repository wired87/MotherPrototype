import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';

import {
  ToolContext,
  MediaContext,
  InputContext,
} from "./screens/Context";

import NavigationMain from "./components/navigation/Footer";

// HOOKS
import {useFirstContact} from "./AppHooks/InitHooks";
import {useInputContextHooks} from "./AppHooks/ContextHooks/InputContextHooks";
import {useToolHooks} from "./AppHooks/ToolHooks";
import {useMediaContextHooks} from "./AppHooks/ContextHooks/MediaContextHooks";

// PROVIDER
import PrimaryContextProvider from "./AppContextCoponents/PrimaryContextProvider";
import ThemeContextProvider from "./AppContextCoponents/ThemeContextProvider";

export default function App() {

  const { firstContact, setFirstContact} = useFirstContact();

  // STYLES
  const gestureHandlerStyles = { flex: 1 }

  return (
    <ThemeContextProvider>
      <MediaContext.Provider value={useMediaContextHooks()}>
        <InputContext.Provider value={useInputContextHooks()}>
          <PrimaryContextProvider>
            <ToolContext.Provider value={useToolHooks()}>
              <GestureHandlerRootView style={gestureHandlerStyles}>
                <BottomSheetModalProvider>
                  <NavigationContainer>
                    <NavigationMain firstContact={firstContact} setFirstContact={setFirstContact} />
                  </NavigationContainer>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </ToolContext.Provider>
          </PrimaryContextProvider>
        </InputContext.Provider>
      </MediaContext.Provider>
    </ThemeContextProvider>
  );
}

