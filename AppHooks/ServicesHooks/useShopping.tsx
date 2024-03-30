import {AppTypes} from "../../screens/tools/ToolsMain";
import {useCallback, useContext} from "react";
import {PrimaryContext} from "../../screens/Context";
import {SwitchChangeEvent} from "react-native";
import {GoogleServices} from "../../AppInterfaces/AuthInterfaces";

const data: keyof GoogleServices = "data";

export function useShopping() {

  const { user } = useContext(PrimaryContext);

  const shoppingArray = useCallback((): AppTypes[] => {
    return [
      {
        name: "Amazon",
        icon: "amazon",
        color: "black",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "eBay",
        icon: "ebay",
        color: "green",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.apple,
        onSwitch: (event: SwitchChangeEvent) => {},
      },

    ]
  }, [user])


  return { shoppingArray };
}