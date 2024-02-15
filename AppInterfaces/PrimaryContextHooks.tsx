import React from "react";
import {UserObjectInterface} from "./AuthInterfaces";

export interface UseIsConnectedInterface {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  updateIsConnected: (value: boolean) => void;
}

export interface UseIsConnectedParams {
  updateUser: (value: UserObjectInterface | null) => void;
  updateAuthenticated: (value: boolean) => void;
  updateInitError: (value: string) => void;
}