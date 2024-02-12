import {Share} from "react-native";
import React from "react";
import {DefaultText} from "../components/text/DefaultText";
import {toolStyles as ts} from "./tools/toolStyles";
import {useNavigation} from "@react-navigation/native";

export const share = async(
  customTheme: any,
  content?: any,
  title? : string,
) => {
  try {
    const result = await Share.share({
        title: title || "Share AIX",
        message: content || "AIX the AI of you",
        url: "https://example.de",
      },
      {
        dialogTitle: "Look at this cool new App!",
        subject: "The cooles App ever!",
        tintColor: customTheme.text,
      }
    );
    if (result?.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("1")
      } else {
        console.log("2")
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("3")
    }
  } catch (error: any) {
    console.log(error.message);
  }
}



export const fieldErrorText = (fieldError: string) => {
  if (fieldError.length > 0) {
    return(
      <DefaultText text={fieldError} moreStyles={ts.text}/>
    );
  }
}