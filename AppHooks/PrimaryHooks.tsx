import {UserObject} from "../screens/Context";
import React, {useEffect, useState} from "react";
import NetInfo from "@react-native-community/netinfo";
import {setUserObject} from "../AppFunctions/UserFunctions";
import {connectionAlert, getToken} from "../AppFunctions/AppFunctions";


type UseUserType = () => [UserObject | null, React.Dispatch<React.SetStateAction<UserObject>>];


import { useState } from 'react';

// Darkmode Hook
export function useDarkmode() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  return [darkmode, setDarkmode];
}

// CustomTheme Hook
export function useCustomTheme() {
  const [darkmode] = useDarkmode();
  const [customTheme, setCustomTheme] = useState<Theme>(darkmode ? darkModeTheme : lightModeTheme);
  return [customTheme, setCustomTheme];
}

// Loading Hook
export function useLoading() {
  const [loading, setLoading] = useState(false);
  return [loading, setLoading];
}

// AppIsReady Hook
export function useAppIsReady() {
  const [appIsReady, setAppIsReady] = useState(false);
  return [appIsReady, setAppIsReady];
}

// ClearMessages Hook
export function useClearMessages() {
  const [clearMessages, setClearMessages] = useState(false);
  return [clearMessages, setClearMessages];
}

// IsConnected Hook
export function useIsConnected() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  return [isConnected, setIsConnected];
}

// BottomSheetLoaded Hook
export function useBottomSheetLoaded() {
  const [bottomSheetLoaded, setBottomSheetLoaded] = useState<boolean>(false);
  return [bottomSheetLoaded, setBottomSheetLoaded];
}

// AlreadyRunning Hook
export function useAlreadyRunning() {
  const [alreadyRunning, setAlreadyRunning] = useState<boolean>(false);
  return [alreadyRunning, setAlreadyRunning];
}

// FirstContact Hook
export function useFirstContact() {
  const [firstContact, setFirstContact] = useState<boolean>(true);
  return [firstContact, setFirstContact];
}



export const useConnected = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { setUser } = useUser();
  const {setAuthenticated} = useAuthenticated();

    useEffect(() => {
      console.log("Check for the internet connection..");
      if (isConnected) {
        console.log("Connection online...");
        const unsubscribe = NetInfo.addEventListener((state) => {
          if (state.isConnected) {
            setUserObject(setUser, setAuthenticated)
              .then(() => console.log("Connection successfully restored.."));
          } else {
            console.log("Could not restore the connection..");
            connectionAlert()
          }
        });
        return () => unsubscribe();
      }
    }, [isConnected]);

  return {isConnected, setIsConnected}
}


