import {useContext, useEffect, useState} from "react";
import {getToken} from "../AppFunctions/JwtFunctions";
import {GoogleServices, JwtToken, UserObjectInterface} from "../AppInterfaces/AuthInterfaces";
import {
  AuthenticatedHookInterface,
  JwtHookInterface,
  UserHookInterface, UserParamInterface
} from "../AppInterfaces/HookInterfaces/AuthHookInterface";
import {GoogleSignin, User} from "@react-native-google-signin/google-signin";
import {PrimaryContext} from "../screens/Context";
import {useError} from "./PrimaryHooks";
import {DELETE_GOOGLE_OBJECT_URL, SAVE_GOOGLE_OBJECT_URL, UPDATE_GOOGLE_OBJECT_URL} from "@env";
import {saveUser} from "../AppFunctions/UserFunctions";
import {handleGoogleAuth} from "../screens/tools/google/AuthFunctions";



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

  const [userFieldUpdate, setUserFiledUpdate] = useState<boolean>(false);

  const updateUser = (value:UserObjectInterface | null) =>
  {
    console.log("User in custom HOOK updated to:", value);
    setUser(value);
  }

  function updateUserGoogleServices<T extends keyof GoogleServices>(key: T, value: boolean) {
    setUser((currentUser) => ({
      ...currentUser,
      services: {
        ...currentUser?.services,
        googleServices: {
          ...currentUser?.services?.googleServices,
          [key]: value
        }
      },
    }));
    setUserFiledUpdate(true);
  }

  useEffect(() => {
    if ( userFieldUpdate && user ) {
      saveUser(user)
        .then(() => console.log("User has been saved in SecureStore..."))
    }
  }, [userFieldUpdate, user]);

  useEffect(() => {
    if (authenticated && user && user.uid) {
      console.log("User exist and is Authenticated. Start JWT Processn with user_id:", user.uid);
      getToken(updateJwtToken, user?.uid)
        .then(
          () => updateAuthenticated(false)
        );
    }
  }, [authenticated, user]);

  return {user, setUser, updateUser, updateUserGoogleServices}
}


export const useGoogleAuthObject = () => {
  const [authObject, setAuthObject] = useState<User | null>(null);
  const [deleteObject, setDeleteObject] = useState<boolean>(false);
  const [updateResponse, setUpdateResponse] = useState<string>("");
  const [saveResponse, setSaveResponse] = useState<string>("");
  const [deleteResponse, setDeleteResponse] = useState<string>("");
  const [save, setSave] = useState<boolean>(false);

  const {
    defaultPostRequest,
    setUser,
    user,
    setLoading,
    updateUserGoogleServices} = useContext(PrimaryContext);

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


  const getUpdateObject = (scopes: string[]):object => {
    return {
      "user_id": user?.uid,
      "scopes": scopes
    }
  }

  const addScopesGoogle = async<T extends keyof GoogleServices> (key: T, scopes: string[]) => {
    console.log("User is Signed n with Google -> add scopes...");
    try {
      const googleUser = await GoogleSignin.addScopes({
        scopes: scopes,
      });
      defaultPostRequest(
        UPDATE_GOOGLE_OBJECT_URL,
        getUpdateObject(scopes),
        setError,
        setUpdateResponse,
      ).then(() => {
        console.log("Successfully updated Google User Object on SS...")
        updateUserGoogleServices(key, true)
      })
    }catch (e:unknown) {
      if ( e instanceof Error ) {
        console.log("Error occurred:", e);
      }
      console.log("Something unexpected happened:", e);
    }finally {
      console.log("Scopes FUNCTION END");
    }
  }

  const onSwitchGoogle = async <T extends keyof GoogleServices>(key: T, scopes: string[]) => {
    console.log("Toggle GoogleService:", key);
    console.log("with scopes:", scopes);
    setLoading(true);
    if (user?.services?.googleServices?.signedIn) {
      await addScopesGoogle(key, scopes);
    } else {
      try {
        handleGoogleAuth(
          user,
          scopes,
          key,
          updateAuthObject,
          updateDeleteObject,
          updateUserGoogleServices,
        );
      }catch (e:unknown) {
        console.log("Couldn't handle the google auth process because the following Error:", e)
      }
    }
    setLoading(false);
  };

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
    setUser((prevState) => ({
      ...prevState,
      googleServices: value,
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
    setDeleteResponse, setSaveResponse,
    updateResponse, setUpdateResponse,
    onSwitchGoogle
  }
}