import * as SecureStore from "expo-secure-store";
import {Alert} from "react-native";
import * as Linking from "expo-linking";
import {JwtToken} from "./screens/Context";
import RNRestart from 'react-native-restart';
import {Dispatch, SetStateAction} from "react";
import {CHECK_JWT, LOGIN_JWT} from "@env";
import {getAuth} from "firebase/auth";
import { Buffer } from 'buffer';
import * as RNLocalize from "react-native-localize";


// URLS
const checkEndpoint: string = CHECK_JWT;
const getEndpoint: string = LOGIN_JWT;
const eMailBody: string = "Hey, i detected a security Problem while try set the JwtToken!"
const errorUrl: string = `https://mail.google.com/mail/?view=cm&fs=1&to=codingWizardaix@gmail.com&su=Error-while-Application-Process-detected&body=${eMailBody}`



export const checkTokenAvailability = async (): Promise<JwtToken | null> => {
  try {
    const JwtToken = await SecureStore.getItemAsync("JwtData");
    console.log("JWtToken:", JwtToken);
    if (JwtToken) {
      const parsedToken = JSON.parse(JwtToken);
      console.log("parsedToken", parsedToken)
      return parsedToken;
    }
  }catch(e: unknown){
    if (e instanceof Error)
      console.error("Could not get the JwtToken from SecureStore:", e);
  }
  return null;
}

export const saveJwtToken = async (data: JwtToken) => {
  const jsonData = JSON.stringify(data);
  await SecureStore.setItemAsync("JwtData", jsonData);
}

export const getToken = async (setJwtToken: Dispatch<SetStateAction<JwtToken | null>>) => {
  const userJwtTokenExist = await checkTokenAvailability();
  console.log("userJwtTokenExist:", userJwtTokenExist);
  if (userJwtTokenExist) {
    try {
      await checkExistingToken(userJwtTokenExist, setJwtToken);
    }catch (e) {
      if (e instanceof Error) {
        console.error("Error occurred AAAAAAAH,", e);
      }
    }
  }else {
    const tokenResponse = await getNewTokenProcess(setJwtToken);
    console.log("tokenResponse getToken:", tokenResponse);
    return tokenResponse;
  }
}

export const checkExistingToken = async (token: JwtToken, setJwtToken: Dispatch<SetStateAction<JwtToken | null>>) => {
  // Generate here a new access token with sending the refresh token to the Backend
  console.log("checkEndpoint:", checkEndpoint);
  const res = await fetch(checkEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"refresh": token.refresh}),
  });
  console.log("res checkEndpoint:", res);
  const response = await res.json();

  console.log("checkEndpoint Response:", response);
  if (response.refresh && response.refresh.access) {
    console.log("accessToken received..");
    token.access = response.refresh.access;
    await saveJwtToken(token);
    setJwtToken(token);
    console.log("Token was successfully Set..");
    return response.refresh.access;
  }else {
    console.log("response contains not refresh...")
    const tokenResponse = await getNewTokenProcess(setJwtToken);
    if (!tokenResponse) {
      return null;
    }
    return tokenResponse
  }
}

export const getNewTokenProcess = async (setJwtToken: Dispatch<SetStateAction<JwtToken | null>>) => {
  // Generate here a new TokenObject
  console.log("getNewTokenProcess started..")
  const tokenObject: JwtToken | null  = await getNewToken();
  console.log("tokenObject getNewTokenProcess:", tokenObject);
  if (tokenObject) {
    setJwtToken(tokenObject);
    return tokenObject
  }else {
    console.log("Could not save the new JWT Token!")
    return null;
  }
}

const getNewToken = async(): Promise<JwtToken | null> => {
  console.log("getNewToken started..");
  const senderObject = JSON.stringify({"user_id": getAuth().currentUser?.uid});
  console.log("senderObject created:", senderObject);
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
    console.log("res:", res)
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
  console.log("INFO DATA REFRESH:", refreshToken);
  console.log("INFO DATA ACCESS:", accessToken);

  // get th encoded data
  const refreshPayload = refreshToken.split('.')[1];
  const accessPayload = accessToken.split('.')[1];

  // decode the token strings
  const decodedRefreshPayload = Buffer.from(refreshPayload, 'base64').toString();
  const decodedAccessPayload = Buffer.from(accessPayload, 'base64').toString();
  console.log("INFO DATA DECODED REFRESH PAYLOAD:", decodedRefreshPayload)
  console.log("INFO DATA DECODED ACCESS PAYLOAD:", decodedAccessPayload)

  // transform Token back to Json
  const refreshTokenData = JSON.parse(decodedRefreshPayload);
  const accessTokenData = JSON.parse(decodedAccessPayload);
  console.log("INFO DATA DECODED REFRESH ENCODED DATA:", refreshTokenData);
  console.log("INFO DATA DECODED ACCESS ENCODED DATA:", accessTokenData);

  // check if Tokens are expired
  const currentDate = new Date();
  const refreshExpirationDate = new Date(refreshTokenData.exp * 1000);
  const accessExpirationDate = new Date(accessTokenData.exp * 1000);
  console.log("INFO DATE:", currentDate);
  console.log("INFO REFRESH EXP DATA:", refreshExpirationDate);
  console.log("INFO ACCESS EXP DATA:", accessExpirationDate);

  const refreshExpired= currentDate > refreshExpirationDate;
  const accessExpired= currentDate > accessExpirationDate;
  console.log("INFO REFRESH EXP BOOL:", refreshExpired);
  console.log("INFO ACCESS EXP BOOL:", accessExpired);

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

export const alert = () => {
  Alert.alert(
    'Too many requests',
    'Please contact the Support-Team ASAP to solve it!',
    [
      {
        text: 'close',
        onPress: () => console.log('Ask me later pressed'),
        style: 'cancel',
      },
      {
        text: 'Contact us',
        onPress: () => Linking.openURL(errorUrl),
        style: 'destructive',
      },
    ]
  );
}

export const connectionAlert = () => {
  Alert.alert(
    'No internet connection detected',
    `You need a internet connection to use our service. \nYou think that's an issue? Please report it and we check it ASAP`,
    [
      {
        text: 'close',
        onPress: () => console.log('Ask me later pressed'),
        style: 'cancel',
      },
      {
        text: 'refresh App',
        onPress: () => RNRestart.restart(),
        style: 'destructive',
      },
    ]
  );
}


/*
import * as SecureStore from "expo-secure-store";
import {Alert} from "react-native";
import * as Linking from "expo-linking";
import {JwtToken} from "./screens/Context";
import RNRestart from 'react-native-restart';
import {Dispatch, SetStateAction, useCallback} from "react";
import {CHECK_JWT, LOGIN_JWT} from "@env";
import {getAuth} from "firebase/auth";
const eMailBody: string = "Hey, i detected a security Problem while try set the JwtToken!"
const errorUrl: string = `https://mail.google.com/mail/?view=cm&fs=1&to=codingWizardaix@gmail.com&su=Error-while-Application-Process-detected&body=${eMailBody}`


// SECURE URLS
const checkEndpoint: string = CHECK_JWT;
const getEndpoint: string = LOGIN_JWT;



export const checkTokenAvailability = async (): Promise<JwtToken | null> => {
  try {
    const JwtToken = await SecureStore.getItemAsync("JwtData");
    console.log("JWtToken:", JwtToken);
    if (JwtToken) {
      const parsedToken = JSON.parse(JwtToken);
      console.log("parsedToken", parsedToken)
      return parsedToken;
    }
  }catch(e: unknown){

    if (e instanceof Error)
      console.error("Could not get the JwtToken from SecureStore:", e);
  }
  return null;
}

export const saveJwtToken = async (data: JwtToken) => {
  const jsonData = JSON.stringify(data);
  await SecureStore.setItemAsync("JwtData", jsonData);
}

export const getToken = async (setJwtToken: Dispatch<SetStateAction<JwtToken | null>>) => {
  const userJwtTokenExist = await checkTokenAvailability();
  console.log("userJwtTokenExist:", userJwtTokenExist);
  if (userJwtTokenExist) {
    try {
      await checkExistingToken(userJwtTokenExist, setJwtToken);
    } catch(e) {
      if (e instanceof Error) {
        console.error("Error occurred AAAAAAAH,", e);
      }
    }
  }else {
    await getNewTokenProcess(setJwtToken);
  }
}

export const checkExistingToken = async (token: JwtToken, setJwtToken: Dispatch<SetStateAction<JwtToken | null>>) => {
  // Generate here a new access token with sending the refresh token to the Backend
  const res = await fetch(checkEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"refresh": token.refresh}),
  });
  console.log("res checkEndpoint:", res);
  const response = await res.json();

  console.log("checkEndpoint Response:", response);
  if (response.refresh && response.refresh.access) {
    console.log("accessToken received..");
    token.access = response.refresh.access;
    await saveJwtToken(token);
    setJwtToken(token);
    console.log("Token was successfully Set..");
    return response.refresh.access;
  }else {
    const await getNewTokenProcess(setJwtToken);

  }
}

const getNewTokenProcess = async (setJwtToken: Dispatch<SetStateAction<JwtToken | null>>) => {
  // Generate here a new TokenObject
  console.log("getNewTokenProcess started..")
  const tokenObject: JwtToken | null  = await getNewToken();
  console.log("tokenObject getNewTokenProcess:", tokenObject);
  if (tokenObject) {
    setJwtToken(tokenObject);
    return tokenObject
  }else {
    console.log("Could not save the new JWT Token!")
    alert();
    return null;
  }
}

const getNewToken = async(): Promise<JwtToken | null> => {
  console.log("getNewToken started..");
  const senderObject = JSON.stringify({"user_id": getAuth().currentUser?.uid});
  console.log("senderObject created:", senderObject);
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
    console.log("res:", res)
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
  const decodedRefreshPayload = atob(refreshPayload);
  const decodedAccessPayload = atob(accessPayload);

  // transform Token back to Json
  const refreshTokenData = JSON.parse(decodedRefreshPayload);
  const accessTokenData = JSON.parse(decodedAccessPayload);

  // check if Tokens are expired
  const refreshExpirationDate = new Date(refreshTokenData.exp * 1000);
  const accessExpirationDate = new Date(accessTokenData.exp * 1000);

  return {
    "refreshTokenData": refreshTokenData,
    "accessTokenData": accessTokenData,
    "refreshExp": refreshExpirationDate,
    "accessExp": accessExpirationDate,
  }
}












// ALERTS

export const alert = () => {
  Alert.alert(
    'Too many requests',
    'Please contact the Support-Team ASAP to solve it!',
    [
      {
        text: 'close',
        onPress: () => console.log('Ask me later pressed'),
        style: 'cancel',
      },
      {
        text: 'Contact us',
        onPress: () => Linking.openURL(errorUrl),
        style: 'destructive',
      },
    ]
  );
}

export const connectionAlert = () => {
  Alert.alert(
    'No internet connection detected',
    `You need a internet connection to use our service. \nYou think that's an issue? Please report it and we check it ASAP`,
    [
      {
        text: 'close',
        onPress: () => console.log('Ask me later pressed'),
        style: 'cancel',
      },
      {
        text: 'refresh App',
        onPress: () => RNRestart.restart(),
        style: 'destructive',
      },
    ]
  );
}
 */