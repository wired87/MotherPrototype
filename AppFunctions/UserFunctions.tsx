import * as SecureStore from "expo-secure-store";
import {JwtToken} from "../screens/Context";

interface UserObjectTypes {
  uid: string;
  emailLocked: boolean;
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