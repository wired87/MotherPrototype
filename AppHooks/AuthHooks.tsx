import {useEffect, useState} from "react";
import {getToken} from "../AppFunctions/JwtFunctions";
import {JwtToken, UserObjectInterface} from "../AppInterfaces/AuthInterfaces";
import {
  AuthenticatedHookInterface,
  JwtHookInterface,
  UserHookInterface, UserParamInterface
} from "../AppInterfaces/HookInterfaces/AuthHookInterface";



export const useAuthenticated = ():AuthenticatedHookInterface => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const updateAuthenticated = (value:boolean) => setAuthenticated(value);

  return {authenticated, setAuthenticated, updateAuthenticated};
}

export const useJwt = ():JwtHookInterface => {
  const [jwtToken, setJwtToken] = useState<JwtToken | null>(null);

  const updateJwtToken = (value:JwtToken | null) => setJwtToken(value);

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
    if (authenticated && user) {
      console.log("User exist and is Authenticated. Start JWT Process...")
      getToken(updateJwtToken, user.uid)
        .then(
          () => updateAuthenticated(false)
        );
    }
  }, [authenticated, user]);

  return {user, setUser, updateUser}
}