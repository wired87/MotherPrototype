import {useCallback, useContext} from "react";
import {AppTypes} from "../../screens/tools/ToolsMain";
import {PrimaryContext} from "../../screens/Context";
import {useGoogleAuthObject} from "../AuthHooks";
import {SwitchChangeEvent} from "react-native";
import {youTubeScopes} from "../../GoogleScopes";
import {GoogleServices} from "../../AppInterfaces/AuthInterfaces";

// KEY's
const yt: keyof GoogleServices = "youtube"
const drive: keyof GoogleServices = "drive"
const gmail: keyof GoogleServices = "gmail"
const calendar: keyof GoogleServices = "calendar"
const photos: keyof GoogleServices = "photos"

import gmailImage from "../../assets/images/toolImages/gmailImage.png";
import googlePhotos from "../../assets/images/toolImages/googlePhotos.png";
// @ts-ignore
import calendarGoogle from "../../assets/images/toolImages/calendarGoogle.webp";

export function useGoogleServices() {

  const { user } = useContext(PrimaryContext);
  const { onSwitchGoogle } = useGoogleAuthObject();

  const googleServicesArray = useCallback((): AppTypes[] => {
    return [
      {
        name: "YouTube",
        icon: "youtube",
        color: "red",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.services?.googleServices?.youtube,
        onSwitch: (event: SwitchChangeEvent) => {
          return onSwitchGoogle(
            yt,
            youTubeScopes
          );
        }
      },
      {
        name: "Drive",
        icon: "google-drive",
        color: "black",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.services?.googleServices?.drive,
        onSwitch: (event: SwitchChangeEvent) => {
          return onSwitchGoogle(
            drive,
            [
              "https://mail.google.com/"
            ]
          );
        }
      },
      {
        name: "Gmail",
        image: gmailImage,
        color: "blue",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.services?.googleServices?.gmail,
        onSwitch: (event: SwitchChangeEvent) => {
          return onSwitchGoogle(
            gmail,
            [
              "https://mail.google.com/"
            ]
          );
        }
      },
      {
        name: "Calendar",
        image: calendarGoogle,
        color: "blue",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.services?.googleServices?.calendar,
        onSwitch: (event: SwitchChangeEvent) => {
          return onSwitchGoogle(
            calendar,
            [
              "https://mail.google.com/"
            ]
          );
        }
      },
      {
        name: "Google Photos",
        image: googlePhotos,
        color: "blue",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.services?.googleServices?.photos,
        onSwitch: (event: SwitchChangeEvent) => {
          return onSwitchGoogle(
            photos,
            [
              "https://mail.google.com/"
            ]
          );
        }
      },
    ]
  }, [user])

  return { googleServicesArray };
}