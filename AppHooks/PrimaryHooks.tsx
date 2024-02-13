import {UserObject} from "../screens/Context";
import React, {useEffect, useState} from "react";
import NetInfo from "@react-native-community/netinfo";
import {setUserObject} from "../AppFunctions/UserFunctions";
import {connectionAlert} from "../AppFunctions/AppFunctions";

import {useAuthenticated, useUser} from "./AuthHooks";

type UseUserType = () => [UserObject | null, React.Dispatch<React.SetStateAction<UserObject>>];


// Loading Hook
export function useLoading() {
  const [loading, setLoading] = useState<boolean>(false);
  return {loading, setLoading};
}




export function useError() {
  const [error, setError] = useState<string>("");

  return {error, setError};
}





export const useConnected = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { setUser } = useUser();
  const {setAuthenticated} = useAuthenticated();
  const {setError} = useError();

    useEffect(() => {
      console.log("Check for the internet connection..");
      if (isConnected) {
        console.log("Connection online...");
        const unsubscribe = NetInfo.addEventListener((state) => {
          if (state.isConnected) {
            setUserObject(setUser, setAuthenticated, setError)
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


