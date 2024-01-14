import {Share} from "react-native";
import {Dispatch, SetStateAction} from "react";

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
