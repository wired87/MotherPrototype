import {useEffect, useState} from "react";
import {JwtToken, UserObject} from "../screens/Context";
import {getToken} from "../AppFunctions/AppFunctions";

export const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  return {authenticated, setAuthenticated}
}

export const useJwt = () => {
  const [jwtToken, setJwtToken] = useState<JwtToken | null>(null);

  return {jwtToken, setJwtToken}
}



export const useUser = () => {
  const [user, setUser] = useState<UserObject | null>(null);

  const {authenticated, setAuthenticated} = useAuthenticated();
  const {jwtToken, setJwtToken} = useJwt();

  const checkJwt = () => {
    if (authenticated && user) {
      getToken(setJwtToken)
        .then(
          () => setAuthenticated(false)
        );
    }
  }

  useEffect(() => {
    checkJwt();
  }, [authenticated, user]);


  return {user, setUser}
}