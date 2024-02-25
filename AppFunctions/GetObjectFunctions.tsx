import {getLanguage} from "./JwtFunctions";
import {LockObjectTypes, LovoObjectTypes, UnlockObjectTypes} from "../AppInterfaces/MotherInterfaces";
import {getAuth} from "firebase/auth";

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


export const mooviePostObject = (movies: string) => {
  return {
    "user_id": getAuth().currentUser?.uid,
    "movies": movies,
    "language": getLanguage() || "en-US"
  }
}


export const emailContactPostObject = (email: string, synonym: string) => {
  return {
    "user_id": getAuth().currentUser?.uid,
    "email": email,
    "synonym": synonym,
    "language": getLanguage() || "en-US"
  }
}

export const userIdRequest = () => {
  return {
    "user_id": getAuth().currentUser?.uid,
  }
}

export const unlockServiceObject = (usn:string, pw: string, synonym: string): LockObjectTypes => {
  return {
    "type": "unlock",
    "userName": usn,
    "password": pw,
    "synonym": synonym,
    "uid": getAuth()?.currentUser?.uid
  }
}

export const lockServiceObject = ():UnlockObjectTypes => {
  return {
    "type": "lock",
    "uid": getAuth()?.currentUser?.uid
  }
}
