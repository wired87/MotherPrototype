import {AppTypes} from "../../screens/tools/ToolsMain";
import {useCallback, useContext} from "react";
import {PrimaryContext} from "../../screens/Context";
import {SwitchChangeEvent} from "react-native";
import {GoogleServices} from "../../AppInterfaces/AuthInterfaces";

const data: keyof GoogleServices = "data";

export function useMessage() {

  const { user } = useContext(PrimaryContext);

  const messageArray = useCallback((): AppTypes[] => {
    return [
      {
        name: "Whats App",
        icon: "whatsapp",
        color: "green",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Facebook Messager",
        icon: "facebook-messenger",
        color: "blue",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Telegram",
        icon: "telegram",
        color: "rgb(129,129,234)",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Signal",
        icon: "message1",
        color: "blue",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
    ]
  }, [user])


  return { messageArray };
}