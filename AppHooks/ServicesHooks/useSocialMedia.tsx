import {AppTypes} from "../../screens/tools/ToolsMain";
import {useCallback, useContext} from "react";
import {PrimaryContext} from "../../screens/Context";
import {SwitchChangeEvent} from "react-native";
import {GoogleServices} from "../../AppInterfaces/AuthInterfaces";

const data: keyof GoogleServices = "data";

export function useSocialMedia() {

  const { user } = useContext(PrimaryContext);

  const socialMediaArray = useCallback((): AppTypes[] => {
    return [
      {
        name: "Instagram",
        icon: "instagram",
        color: "rgb(246,118,118)",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "TikTok",
        icon: "tiktok",
        color: "black",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.apple,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Facebook",
        icon: "facebook",
        color: "blue",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.apple,
        onSwitch: (event: SwitchChangeEvent) => {},
      },

    ]
  }, [user])


  return { socialMediaArray };
}