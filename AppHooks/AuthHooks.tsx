import {useContext, useEffect, useState} from "react";
import {getToken} from "../AppFunctions/JwtFunctions";
import {JwtToken, UserObjectInterface} from "../AppInterfaces/AuthInterfaces";
import {
  AuthenticatedHookInterface,
  JwtHookInterface,
  UserHookInterface, UserParamInterface
} from "../AppInterfaces/HookInterfaces/AuthHookInterface";
import {User} from "@react-native-google-signin/google-signin";
import {PrimaryContext} from "../screens/Context";
import {useError} from "./PrimaryHooks";
import {SAVE_GOOGLE_OBJECT_URL} from "@env";
import {saveUser} from "../AppFunctions/UserFunctions";



export const useAuthenticated = ():AuthenticatedHookInterface => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const updateAuthenticated = (value:boolean) => setAuthenticated(value);

  return {authenticated, setAuthenticated, updateAuthenticated};
}

export const useJwt = ():JwtHookInterface => {
  const [jwtToken, setJwtToken] = useState<JwtToken | null>(null);

  const updateJwtToken = (value:JwtToken | null) => {
    if (jwtToken !== value) {
      setJwtToken(value);
    }
  }

  return {jwtToken, setJwtToken, updateJwtToken}
}



export const useUser = (
  {
    authenticated,
    updateAuthenticated,
    updateJwtToken
  }:UserParamInterface
):UserHookInterface => {
  const [user, setUser] =
    useState<UserObjectInterface | null>(null);


  const updateUser = (value:UserObjectInterface | null) =>
  {
    console.log("User in custom HOOK updated to:", value);
    setUser(value);
  }

  useEffect(() => {
    if (authenticated && user && user.uid) {
      console.log("User exist and is Authenticated. Start JWT Processn with user_id:", user.uid);
      getToken(updateJwtToken, user?.uid)
        .then(
          () => updateAuthenticated(false)
        );
    }
  }, [authenticated, user]);

  return {user, setUser, updateUser}
}



export const useGoogleAuthObject = () => {
  const [authObject, setAuthObject] = useState<User | null>(null);
  const [saveResponse, setSaveResponse] = useState<string>("");

  const {defaultPostRequest, setUser, user, jwtToken} = useContext(PrimaryContext);

  const {error, setError} = useError();

  const updateAuthObject = (value:User | null) => setAuthObject(value);

  const getObject = () => {
    return {
      "user_id": user?.uid,
      "googleUser": authObject
    }
  }

  useEffect(() => {
    if ( authObject ) {
      defaultPostRequest(
        SAVE_GOOGLE_OBJECT_URL,
        getObject(),
        setError,
        setSaveResponse,
      ).then(() => {
        console.log("Google User Object sent...");
      })
    }
  }, [authObject]);

  const setGoogleService = () => {
    setUser(prevState => ({
      ...prevState,
      googleServices: true
    }));
  };

  useEffect(() => {
    // update user object and save in secure store
    if (saveResponse.includes("Successfully")) {
      console.log("Success response...");
      setGoogleService()

    }else if ( saveResponse.includes("Error")) {
      console.log("Error save Google Object Response...")
    }
  }, [saveResponse]);


  useEffect(() => {
    if (user?.googleServices) {
      saveUser(user)
        .then(() => console.log("Updated User successfully Saved..."));
    }
  }, [user]);


  return {authObject, setAuthObject, updateAuthObject}
}