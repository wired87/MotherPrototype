import axios from "axios";
import firebase from "firebase/compat";


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
  senderObject: any,
  options: any
): Promise<any> => {

  const { timeout = 20000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch("http://192.168.178.51:8080/open/chat-request/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(senderObject),
      ...options,
      signal: controller.signal
    });

    const data = await response.json();
    console.log('Success:', data);
    clearTimeout(id);
    return data;

  } catch (e: any) {
    clearTimeout(id);
    console.log("Error in postMessageObject:", e);
    return e
  }
}

export const sendObject = async (senderObject: any, messageIndex: number | string, user: firebase.User | null) => {
  try {
    const res = await postMessageObject(
      senderObject,
      {
        timeout: 20000
      }
    );

    console.log("res", res);

    let response;
    if (res instanceof Error || res.name ) {
      console.log("sendObject res === error")
      response = {
        message: "Ups that request is taking too much time." +
          "\nIf that issue is coming up again feel free to contact the support to fix it.",
        status: 200,
      }
    } else {
      response = await res;
      console.log("sendObject res ===", response)
    }

    console.log("Response", response);

    return createMessageObject(
      response.message,
      "text",
      messageIndex,
      user,
      "AI",
      "aiMessageContainer",
    )

  } catch(e) {
    console.log('Error in "sendObject":', e)
    return 1;
  }
}

export default function getDurationFormatted(milliseconds: any) {
  const minutes = milliseconds / 1000 / 60;
  const sec = Math.round((minutes - Math.floor(minutes)) * 60);
  return sec < 10 ? `${Math.floor(minutes)}:0${sec}` : `${Math.floor(minutes)}:${sec}`
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
  input: any,
  type: string,
  messageIndex: any,
  user: any,
  publisher: string,
  className: string
) => {
  return(
    {
      "id": messageIndex.current,
      "message": input,
      "timeToken": getCurrentTime(),
      "publisher": publisher,
      "class": className,
      "user_id": user ? user.uid : "1",
      "type": type
    }
  );
}


/*
Fetch request props
const response = await fetch("http://192.168.178.51:8080/open/chat-request/", //192.168.178.51:8000/open/chat-request/"
  {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin,
    // same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(senderObject), // body data type must match "Content-Type" header

  });
 */