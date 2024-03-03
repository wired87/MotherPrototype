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
import {DELETE_GOOGLE_OBJECT_URL, SAVE_GOOGLE_OBJECT_URL} from "@env";
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
  const [deleteObject, setDeleteObject] = useState<boolean>(false);

  const [saveResponse, setSaveResponse] = useState<string>("");
  const [deleteResponse, setDeleteResponse] = useState<string>("");
  const [save, setSave] = useState<boolean>(false);

  const {defaultPostRequest, setUser, user} = useContext(PrimaryContext);

  const {setError} = useError();

  // UPDATES
  const updateAuthObject = (value:User | null) => setAuthObject(value);
  const updateDeleteObject = (value:boolean) => setDeleteObject(value);


  const getUnlockObject = () => {
    return {
      "user_id": user?.uid,
      "googleUser": authObject
    }
  }
  const getLockObject = () => {
    return {
      "user_id": user?.uid,
    }
  }

  useEffect(() => {
    if ( authObject ) {
      console.log("Save request sent...");
      defaultPostRequest(
        SAVE_GOOGLE_OBJECT_URL,
        getUnlockObject(),
        setError,
        setSaveResponse,
        ).then(() => {
          console.log("Google User Object sent ...");
          setAuthObject(null);
          setGoogleService(true);
        }
      )
    }else if( deleteObject ) {
      console.log("Delete request sent...");
      defaultPostRequest(
        DELETE_GOOGLE_OBJECT_URL,
        getLockObject(),
        setError,
        setDeleteResponse,
        ).then(() => {
          console.log("Google User Object deleted ...");
          setGoogleService(false);
          setDeleteObject(false);
        }
      )
    }
  }, [authObject, deleteObject]);

  const setGoogleService = (value: boolean) => {
    console.log("Set user gS to false...")
    setUser(prevState => ({
      ...prevState,
      googleServices: value
    }));
    setSave(true);
  };

  useEffect(() => {
    console.log("Auth useEffect triggered...")
    if (  (save && user && ["saveSuccess"].includes(saveResponse)) || (save && user && ["deleteSuccess"].includes(deleteResponse)) ) {
      console.log("If block triggered")
      saveUser(user)
        .then(() => {
          console.log("Updated User successfully Saved:", user);
          setSave(false);
        }
      );
    }
  }, [save, saveResponse, user]);


  return {
    updateDeleteObject,
    updateAuthObject,
    saveResponse, deleteResponse ,
    setGoogleService,
    setDeleteResponse, setSaveResponse
  }
}