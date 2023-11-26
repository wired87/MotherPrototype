import axios from "axios";


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
) => {

  const { timeout = 8000 } = options
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch("http://127.0.0.1:8080/open/chat-request/", //192.168.178.51:8000/open/chat-request/"
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
        ...options,
        signal: controller.signal
      });
    clearTimeout(id);
    return response
  } catch(e) {
    return e
    // @ts-ignore
    //console.log("Timeout limit reached or error occurred ", e)
    //return {
    //  data: {
    //   message: "Ups that request is taking too much time." +
    //     "\nIf that issue is coming up again feel free to contact the support to fix it."
    // },
    //  status: 200,
    //  }
  }
}

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