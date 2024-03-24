import React, {Dispatch, SetStateAction} from "react";
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

export interface DefaultPostReqInter {
  postUrl: string,
  postObject: object,
  setError: Dispatch<SetStateAction<string>>,
  setResponse: Dispatch<SetStateAction<any>>,
  setStatus?: Dispatch<SetStateAction<number>>,
  toolAction?:boolean
}