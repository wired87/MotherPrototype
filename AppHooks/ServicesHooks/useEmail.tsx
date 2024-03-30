import {AppTypes} from "../../screens/tools/ToolsMain";
import {useCallback, useContext} from "react";
import {PrimaryContext} from "../../screens/Context";
import {SwitchChangeEvent} from "react-native";
import {GoogleServices} from "../../AppInterfaces/AuthInterfaces";

const data: keyof GoogleServices = "data";

export function useEmailServices() {

  const { user } = useContext(PrimaryContext);

  const emailArray = useCallback((): AppTypes[] => {
    return [
      {
        name: "Outlook",
        icon: "microsoft-outlook",
        color: "blue",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Yahoo",
        icon: "yahoo",
        color: "black",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
    ]
  }, [user])


  return { emailArray };
}