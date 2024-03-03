import * as SecureStore from "expo-secure-store";
import {Alert} from "react-native";
import RNRestart from 'react-native-restart';
import {Dispatch, SetStateAction} from "react";
import {CHECK_JWT, LOGIN_JWT, PORCUPINE_API_KEY} from "@env";
import { Buffer } from 'buffer';
import * as RNLocalize from "react-native-localize";

import {Cheetah} from '@picovoice/cheetah-react-native';

// import {OrcaWorker} from '@picovoice/orca-react-native'; ////////////////////////////////////////////////////////////

import {JwtToken} from "../AppInterfaces/AuthInterfaces";

// URLS
const checkEndpoint: string = CHECK_JWT;
const getEndpoint: string = LOGIN_JWT;

export const getLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    return locales[0].languageTag
  }
  return "en-US"
}

/////////////// CHECK GET SET JWT /////////////
export const checkTokenAvailability = async (): Promise<JwtToken | null> => {
  try {
    const jwtToken = await SecureStore.getItemAsync("JwtData");
    if (jwtToken) {
      console.log("Token available:", jwtToken);
      return JSON.parse(jwtToken);
    }
  }catch(e: unknown){
    if (e instanceof Error)
      console.error("Could not get the JwtToken from SecureStore:", e);
  }
  return null;
}

export const saveJwtToken = async (data: JwtToken) => {
  const jsonData = JSON.stringify(data);
  console.log("Data saved in Secure Store...");
  await SecureStore.setItemAsync("JwtData", jsonData);
}

export const getToken = async (updateJwtToken: (value:JwtToken | null) => void, userID?:string) => {
  console.log("Try get Token...")
  const userJwtTokenExist = await checkTokenAvailability();
  if (userJwtTokenExist) {
    try {
      await checkExistingToken(userJwtTokenExist, updateJwtToken, userID);
    }catch (e) {
      if (e instanceof Error) {
        console.error("Error occurred AAAAAAAH,", e);
      }
    }
  }else {
    const tokenResponse = await getNewTokenProcess(updateJwtToken, userID);
    console.log("tokenResponse getToken:", tokenResponse);
    return tokenResponse;
  }
}

export const checkExistingToken = async (
  token: JwtToken,
  updateJwtToken: (value:JwtToken | null) => void,
  userID?:string
) => {
  // Generate here a new access token with sending the refresh token to the Backend
  console.log("Check existing Token... user id:", userID);
  const res = await fetch(checkEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"refresh": token.refresh, "user_id": userID}),
  });
  const response = await res.json();

  console.log("Check Token Response", response);

  if (response.refresh && response.refresh.access) {
    console.log("Received AccessToken valid...");
    token.access = response.refresh.access;
    if (response.refresh.refresh) {
      token.refresh = response.refresh.refresh;
    }
    await saveJwtToken(token);
    updateJwtToken(token);
    console.log("Token successfully Set...");

    return response.refresh;
  }else {
    console.log("response contains no valid token...")
    const tokenResponse = await getNewTokenProcess(updateJwtToken, userID);
    if (!tokenResponse) {
      return null;
    }
    return tokenResponse
  }
}

export const getNewTokenProcess = async ( updateJwtToken: (value:JwtToken | null) => void, userID?:string ) => {
  // Generate here a new TokenObject
  console.log("getNewTokenProcess started...");
  const tokenObject: JwtToken | null  = await getNewToken(userID);
  console.log("tokenObject getNewTokenProcess:", tokenObject);
  if (tokenObject) {
    updateJwtToken(tokenObject);
    return tokenObject
  }else {
    console.log("Could not save the new JWT Token!")
    return null;
  }
}


const getNewToken = async(userID?:string): Promise<JwtToken | null> => {
  console.log("getNewToken started..");
  const senderObject = JSON.stringify({"user_id": userID});
  try {
    const res = await fetch(
      getEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: senderObject,
      }
    );
    const response = await res.json();
    console.log("response getNewToken:", response);
    if (response.access && response.refresh) {
      await saveJwtToken(response);
      return response;
    }
  } catch (e: unknown) {
    if (e instanceof Error) console.error("Error occurred in getNewToken", e.message);
  }
  return null
}

export const getTokenInfoData = (jwtToken: JwtToken) => {
  const refreshToken = jwtToken.refresh;
  const accessToken = jwtToken.access;

  // get th encoded data
  const refreshPayload = refreshToken.split('.')[1];
  const accessPayload = accessToken.split('.')[1];

  // decode the token strings
  const decodedRefreshPayload = Buffer.from(refreshPayload, 'base64').toString();
  const decodedAccessPayload = Buffer.from(accessPayload, 'base64').toString();


  // transform Token back to Json
  const refreshTokenData = JSON.parse(decodedRefreshPayload);
  const accessTokenData = JSON.parse(decodedAccessPayload);


  // check if Tokens are expired
  const currentDate = new Date();
  const refreshExpirationDate = new Date(refreshTokenData.exp * 1000);
  const accessExpirationDate = new Date(accessTokenData.exp * 1000);


  const refreshExpired= currentDate > refreshExpirationDate;
  const accessExpired= currentDate > accessExpirationDate;


  return {
    "refreshTokenData": refreshTokenData,
    "accessTokenData": accessTokenData,
    "refreshExp": refreshExpired,
    "accessExp": accessExpired,
  }
}





export const getCurrentLanguage = () => {
  const languages = RNLocalize.getLocales();
  if (languages.length > 0) return languages[0].languageCode;
  return null;
};


// ALERTS

export const connectionAlert = (
  title:string = 'No internet connection detected',
  message:string=`You need a internet connection to use our service. 
  \nYou think that's an issue? Please report it and we check it ASAP`
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'close',
        onPress: () => console.log('Ask me later pressed'),
        style: 'cancel',
      },
      {
        text: 'Refresh the App',
        onPress: () => RNRestart.restart(),
        style: 'destructive',
      },
    ]
  );
}



const createCheetah = async () => {
  let cheetah;
  try {
    cheetah = await Cheetah.create(
      PORCUPINE_API_KEY,
      "../PicoVoice/Cheetah/cheetah_params.pv"
    );
    console.log("Cheetah created:", cheetah);
    return cheetah;
  } catch (err:unknown) {
    if (err instanceof Error) {
      console.error("Error while creating Cheetah", err);
      return;
    }
  }
}


const detectedKeyWord = async (
  detected: boolean,
  setDetected: Dispatch<SetStateAction<boolean>>
) => {
  if (detected) {
    return
  }
  setDetected(true);
  // start processing

}

