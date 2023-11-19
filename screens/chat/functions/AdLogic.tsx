import * as SecureStore from "expo-secure-store";
import {useCallback} from "react";


export async function postMessageInfoData(value: string) {
  try {
    await SecureStore.setItemAsync("totalMessages", value);
    console.log('Saved Data successfull');
  } catch (e) {
    console.error('Error at save the Data:', e);
  }
}

export async function getMessageInfoData() {
  try {
    console.log("Data request successful")
    return await SecureStore.getItemAsync("totalMessages")
  } catch (e) {
    console.error('Error at requesting the Data: ', e);
    return false;
  }
}

export const checkUserMessageValue = async (value: string | boolean | null, setMessagesLeft: any) => {
  if (value !== "0" || value !== null) {
    console.log("User has", value, "Messages left.")
    if (value === "1") {
      await postMessageInfoData("0").then(() => setMessagesLeft("0"))
    }else if (value === "2"){
      await postMessageInfoData("1").then(() => setMessagesLeft("1"))
    }else if (value === "3"){
      await postMessageInfoData("2").then(() => setMessagesLeft("2"))
    }else if (value === "4"){
      await postMessageInfoData("3").then(() => setMessagesLeft("3"))
    }else if (value === "5") {
      await postMessageInfoData("4").then(() => setMessagesLeft("4"))
    }
    return true;
  }else {
    return false;
  }
}

export const set = async (setMessagesLeft: any) => {
  await postMessageInfoData("5")
    .then(() => {
      setMessagesLeft("5")
      console.log("UPDATED999999999")
      }
    )
  }




