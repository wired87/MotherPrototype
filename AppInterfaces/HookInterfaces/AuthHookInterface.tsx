import {GoogleServices, JwtToken, UserObjectInterface} from "../AuthInterfaces";
import {Dispatch, SetStateAction} from "react";

// USER INTEFACE
export interface UserHookInterface {
  user: UserObjectInterface | null;
  setUser: Dispatch<SetStateAction<UserObjectInterface | null>>;
  updateUser: (value: UserObjectInterface | null) => void;
  updateUserGoogleServices: (key: keyof GoogleServices, value: boolean) => void;
  updateGoogleServicesNull: () => void;
}
export interface UserParamInterface {
  authenticated: boolean;
  updateAuthenticated: (value: boolean) => void;
  updateJwtToken: (value: JwtToken | null) => void;
}

// JWT INTERFACE
export interface JwtHookInterface {
  jwtToken: JwtToken | null;
  setJwtToken: Dispatch<SetStateAction<JwtToken | null>>;
  updateJwtToken: (value: JwtToken | null ) => void;
}

// AUTH INTERFACE
export interface AuthenticatedHookInterface {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  updateAuthenticated: (value: boolean) => void;
}


