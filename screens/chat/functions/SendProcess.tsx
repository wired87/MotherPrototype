import firebase from "firebase/compat";
import {JwtToken} from "../../Context";
import {Dispatch, SetStateAction} from "react";
import {checkExistingToken, getNewTokenProcess, getTokenInfoData} from "../../../AppFunctions";

export const getCurrentTime = () => {
  const timeNow = new Date();
  let timeHoursNow = timeNow.getHours();
  let timeMinutesNow = timeNow.getMinutes()
  if (timeHoursNow < 10)  {
    timeHoursNow = Number("0" + timeHoursNow)
  } else if (timeMinutesNow < 10){
    timeMinutesNow = Number("0" + timeMinutesNow)
  }
  return(timeHoursNow + ":" + timeMinutesNow);
}

export const postMessageObject = async (
  jwtToken: string,
  senderObject: any,
  postUrl: string,
  options: any
): Promise<any> => {


  const { timeout = 20000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  console.log("JwtToken.access postMessageObject:", jwtToken);
  try {
    const response = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(senderObject),
      ...options,
      signal: controller.signal
    });
    console.log("Response:", response);
    clearTimeout(id);
    let data;
    try {
      data = await response.json();
      console.log("Data postMessageObject:", data);
      return data;
    }catch {
      return null;
    }
  } catch (e: unknown) {
    clearTimeout(id);
    console.log("Error in postMessageObject:", e);
    return null;
  }
}

interface SenderObjectTypes {
  senderObject: any,
  messageIndex: number | string,
  user: firebase.User | null,
  jwtToken: JwtToken
}
export const sendObject = async (
  senderObject: any,
  jwtToken: JwtToken,
  setJwtToken: Dispatch<SetStateAction<JwtToken | null>>,
  customPostUrl?: string
) => {
  const postUrl = "http://wired87.pythonanywhere.com/open/chat-request/";

  const jwtTokenData = getTokenInfoData(jwtToken)
  if (jwtTokenData.refreshExp) {
    console.log("REFRESH Token expired. Creating a new one...");
    const newTokenObject = await getNewTokenProcess(setJwtToken);
    if (!newTokenObject) {
      console.log("Could not create a new Token Object..");
      return null;
    }
    console.log("New Token Object created:", newTokenObject);
    console.log("sendObject jwtToken.access old State:", jwtToken.access);
    jwtToken.access = newTokenObject.access;

  }else if(jwtTokenData.accessExp) {
    console.log("ACCESS Token expired. Creating a new one...");
    const newTokenObject = await checkExistingToken(jwtToken, setJwtToken);
    if (!newTokenObject) {
      console.log("Could not create a new ACCESS Token..");
      return null;
    }
    console.log("New Token Object created:", newTokenObject);
    console.log("sendObject jwtToken.access old State:", jwtToken.access);
    jwtToken.access = newTokenObject.access;
  }
  try {
    console.log("Create the post Object with accessToken:", jwtToken.access)
    const response = await postMessageObject(
      jwtToken.access,
      senderObject,
      customPostUrl || postUrl,
      {
        timeout: 20000
      }
    );
    console.log("sendObject res ===", response)
    if (!response) {

    }else if (response.detail){
      const checkTokenAgain = await checkExistingToken(jwtToken, setJwtToken);
      if (!checkTokenAgain) {
        return null;
      }
    }
    // Success
    console.log("Response", response);
    return response.message;

  }catch(e) {
    console.log('Error in "sendObject":', e)
    return null;
  }
}

export default function getDurationFormatted(milliseconds: any) {
  const minutes = milliseconds / 1000 / 60;
  const sec = Math.round((minutes - Math.floor(minutes)) * 60);
  return sec < 10 ? `${Math.floor(minutes)}:0${sec}` : `${Math.floor(minutes)}:${sec}`
}



const sendErrorMessage = () => {

}













/*
export const postMessageObject = (
  senderObject: any,
  options: any
) => {

  const { timeout = 8000 } = options
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  console.log("JSON.stringify(senderObject)", JSON.stringify(senderObject))
  try {
    const response = fetch("http://192.168.178.51:8080/open/chat-request/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(senderObject),
      ...options,
      signal: controller.signal
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    clearTimeout(id);
    console.log("Chat Request response", response);
    return response
  } catch(e: any) {
    console.log("error in postMessageObject- method:", e)
    if (e.name == "AbortError") {
      console.error("Timeout Limit reached or Error occurred in postMessageObject while post the senderObject", e)
    }else if (e.name === "TypeError") {

    }
  }
}

return {
        data: {
          message: "Ups that request is taking too much time." +
            "\nIf that issue is coming up again feel free to contact the support to fix it."
        },
        status: 200,
      }
 */

export const createMessageObject = (
  input: string,
  type: string,
  messageIndex: string | number,
  user: firebase.User | null,
  publisher: string,
  className: string
) => {

  return(
    {
      "id": messageIndex ,
      "message": input,
      "timeToken": getCurrentTime(),
      "publisher": publisher,
      "class": className,
      "user_id": user?.uid || "1",
      "type": type
    }
  );
}


