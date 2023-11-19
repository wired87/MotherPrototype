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

export const postMessageObject = async (senderObject: any, messageFinalBreak: boolean) => {
  if (!messageFinalBreak) {
    try {
      return await axios.post("http://192.168.178.51:8000/open/chat-request/", senderObject);
    } catch(e) {
      console.log("Error in postMessageObject-function:", e)
      return e
    }
  } else {
    return {
      data: {
        message: "Im sorry i could not answering this Question. Please try it with another!"
      },
      status: 200,
    }
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