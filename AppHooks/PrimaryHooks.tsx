import {useEffect, useState} from "react";
import NetInfo from "@react-native-community/netinfo";
import {setUserObject} from "../AppFunctions/UserFunctions";
import {connectionAlert} from "../AppFunctions/JwtFunctions";

import {UseIsConnectedInterface, UseIsConnectedParams} from "../AppInterfaces/PrimaryContextHooks";

// Loading Hook
export function useLoading() {
  const [loading, setLoading] = useState<boolean>(false);

  const updateLoading = () => setLoading(!loading);

  return {loading, setLoading, updateLoading};
}


export function useError() {
  const [error, setError] = useState<string>("");

  return {error, setError};
}


export function useMotherError() {
  const [motherError, setMotherError] = useState<string>("");
  const updateMotherError = (text:string) => {setMotherError(text)}

  return {motherError, setMotherError, updateMotherError};
}


export const useIsConnected = (
  {
   updateUser,
   updateAuthenticated,
   updateInitError
  }: UseIsConnectedParams
): UseIsConnectedInterface => {

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const updateIsConnected = (value: boolean) => { setIsConnected(value); };

  useEffect(() => {
    console.log("Check for the internet connection..");
    if (isConnected) {
      console.log("Connection online...");
      const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected) {
          setUserObject(updateUser, updateAuthenticated, updateInitError)
            .then(() => console.log("Connection successfully restored.."));
        } else {
          console.log("Could not restore the connection..");
          connectionAlert();
        }
      });
      return () => unsubscribe();
    }
  }, [isConnected]);

  return {
    isConnected,
    setIsConnected,
    updateIsConnected
  };
}



