import firebase from "firebase/compat";
import {JwtToken} from "../../Context";
import {Dispatch, SetStateAction} from "react";
import {checkExistingToken, getNewTokenProcess, getToken, getTokenInfoData} from "../../../AppFunctions";
import {CHAT_REQUEST_URL} from "@env";

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
  console.log("POSTMESSAGEOBJECT JWT TOKEN:", jwtToken);
  try {
    const response = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(senderObject),
      ...options,
      signal: controller.signal
    });

    console.log("Response postMessageObject:", response);

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

export const sendObject = async (
  senderObject: any,
  jwtToken: JwtToken,
  setJwtToken: Dispatch<SetStateAction<JwtToken | null>>,
  customPostUrl?: string
) => {

  // CHECK TOKEN DATA FOR EXP
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
  // POST THE MESSAGE
  try {
    console.log("Create the post Object with accessToken:", jwtToken.access)
    const response = await postMessageObject(
      jwtToken.access,
      senderObject,
      customPostUrl || CHAT_REQUEST_URL,
      {
        timeout: 20000
      }
    );

    console.log("sendObject res ===", response)
    if (!response) {
      return null;
    }else if (response.detail){
      const checkTokenAgain = await checkExistingToken(jwtToken, setJwtToken);
      if (!checkTokenAgain) {
        console.log("Could not receive a valid Token postMessageObject...")
        return null;
      }else {
        console.log("TRY AGAIN TO SEND THE MESSAGE WITH UPDATED TOKEN:", checkTokenAgain);
        const response = await postMessageObject(
          checkTokenAgain.access,
          senderObject,
          customPostUrl || CHAT_REQUEST_URL,
          {
            timeout: 20000
          }
        );
        console.log("sendObject res ===", response)
        if (!response || response.detail) {
          return;
        }else{
          return response;
        }
      }
    }
    // Success
    console.log("Response", response);
    return response;

  }catch(e) {
    console.log('Error in "sendObject":', e)
    return null;
  }
}

/*
export const getResponse = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  setJwtToken: Dispatch<SetStateAction<JwtToken | null>>,
  jwtToken: JwtToken | null,
  body: object,
  setResponse: Dispatch<SetStateAction<any>>,
  customPostUrl?: string,
) => {

  setLoading(true);
  let response;

  try {
    if (jwtToken && jwtToken.refresh && jwtToken.access) {
      response = await sendObject(
        body,
        jwtToken,
        setJwtToken,
        customPostUrl
      )
    }else{
      const newToken = await getToken(setJwtToken);
      if (newToken) {
        response = await sendObject(
          body,
          newToken,
          setJwtToken,
          customPostUrl
        )
      }else{
        setError("Could not authenticate you. Please contact the support or try again later.")
      }
    }
    if (response) {
      console.log("response:" , response);
      setResponse(response);
    }else{
      setError("The Server returned no response. Please Contact the support.");
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log("Error while sending the chatCompletion request:", e.message)
      setError(e.message);
      console.log(e.message);
    }
  }finally {
    setLoading(false);
  }
};
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


