import * as SecureStore from "expo-secure-store";
import {getAuth, signInAnonymously} from "firebase/auth";
import {FIREBASE_AUTH} from "../firebase.config";
import {UserObjectInterface} from "../AppInterfaces/AuthInterfaces";



export const checkUserAvailability = async (): Promise<UserObjectInterface | null> => {
  console.log("Try get user Object from secureStore...");
  try {
    const userObject = await SecureStore.getItemAsync("UserObject");
    console.log("User Object available...");
    if (userObject) {
      console.log("Successfully get the User Object...")
      return JSON.parse(userObject);
    }
  }catch(e: unknown){
    if (e instanceof Error)
      console.error("Could not get a User Object from SecureStore cause the following Error:", e);
  }
  return null;
}


export const saveUser = async (data: UserObjectInterface):Promise<void> => {
  console.log("Save User Object:", data, "in Secure Store");
  const userObject:string = JSON.stringify(data);
  console.log("UserData saved in Secure Store...");
  await SecureStore.setItemAsync("UserObject", userObject);
}

export const getUserID = (user: UserObjectInterface | null) => {
  if (user && user.uid) {
    return user.uid
  }
  return "null"
}


type SetUserObjectTypes =
  (
    updateUser: (value: UserObjectInterface | null) => void,
    updateAuthenticated: (value:boolean) => void,
    updateError: (text:string) => void
  ) => Promise<void>;

export const setUserObject: SetUserObjectTypes = async (
  updateUser,
  updateAuthenticated,
  updateError
) => {
  console.log("Init the UserObject..");
  try {
    const existingUser = await checkUserAvailability();
    console.log("Parsed User Object from SecureStore:", existingUser);
    if (existingUser) {
      updateUser(existingUser);
      updateAuthenticated(true);
      console.log("Auth and User States has been Set...");
    } else {
      console.log("No existing user in SecureStore. Authenticate Anonymously..");
      await signInAnonymously(FIREBASE_AUTH);

      if (getAuth().currentUser) {
        const customUserObject:UserObjectInterface= {
          uid: getAuth()?.currentUser?.uid,
          email: undefined,
          emailService: false
        }
        updateAuthenticated(true);
        updateUser(customUserObject);
        console.log("User object set: ", customUserObject);
        saveUser(customUserObject)
          .then(() => console.log("User Object stored successfully in SecureStore..."));
      } else {
        console.log("User could not be set in App")
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error during user initialization:", e);
      updateError("authentication_problem")
    }
  }
}