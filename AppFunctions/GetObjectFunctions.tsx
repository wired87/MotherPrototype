import {getLanguage} from "./JwtFunctions";
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
    speaker: "64191022c25c1f00222c0ab1"
  }
};