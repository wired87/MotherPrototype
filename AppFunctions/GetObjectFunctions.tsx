import {getLanguage} from "./AppFunctions";
import {LovoObjectTypes} from "../AppInterfaces/MotherInterfaces";

export const getMotherRequestData = (newTranscript: string, userID?: string, ):object => {
  return {
    "user_id": userID,
    "type": "talk",
    "language": getLanguage(),
    "message": newTranscript,
  }
}

export const getLovoObject = (text:string): LovoObjectTypes => {
  return{
    speed: 1,
    text: text,
    speaker: "63b417fb241a82001d51df6a"
  }
};