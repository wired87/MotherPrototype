import * as SecureStore from "expo-secure-store";
import {UserObject} from "../screens/Context";
import {signInAnonymously} from "firebase/auth";
import {FIREBASE_AUTH} from "../firebase.config";
import React, {Dispatch, SetStateAction} from "react";

interface UserObjectTypes {
  uid: string;
}


export const checkUserAvailability = async (): Promise<UserObjectTypes | null> => {
  try {
    const userObject = await SecureStore.getItemAsync("UserObject");
    console.log("Token available...");
    if (userObject) {
      return JSON.parse(userObject);
    }
  }catch(e: unknown){
    if (e instanceof Error)
      console.error("Could not get the JwtToken from SecureStore:", e);
  }
  return null;
}


export const saveUser = async (data: UserObjectTypes) => {
  const userObject = JSON.stringify(data);
  console.log("UserData saved in Secure Store...");
  await SecureStore.setItemAsync("UserObject", userObject);
}

export const getUserID = (user: UserObject | null) => {
  if (user && user.uid) {
    return user.uid
  }
  return "null"
}


type userObjectType = (
  initialValue: null | UserObjectTypes
) => [null | UserObjectTypes, React.Dispatch<React.SetStateAction<UserObjectTypes | null>>];

type SetUserObjectTypes =
  (initialValue: Dispatch<SetStateAction<UserObjectTypes | null>>, initialValue2: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;

export const setUserObject: SetUserObjectTypes = async (setUser, setAuthenticated) => {
  console.log("Init the UserObject..");
  try {
    const existingUser = await checkUserAvailability();
    if (existingUser) {
      setUser(existingUser); /////////////////////////////////////////////////////////////////////////////////////////
      setAuthenticated(true);
    } else {
      await signInAnonymously(FIREBASE_AUTH);
      setAuthenticated(true);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error during user initialization:", e);
      setError("authentication_problem")
    }
  }
}