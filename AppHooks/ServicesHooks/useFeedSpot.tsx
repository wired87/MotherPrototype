import {AppTypes} from "../../screens/tools/ToolsMain";
import {useCallback, useContext} from "react";
import {PrimaryContext} from "../../screens/Context";
import {portabilityScopes} from "../../GoogleScopes";
import {SwitchChangeEvent} from "react-native";
import {useGoogleAuthObject} from "../AuthHooks";
import {GoogleServices} from "../../AppInterfaces/AuthInterfaces";

const data: keyof GoogleServices = "data";

export function useFeedSpot() {

  const { user } = useContext(PrimaryContext);
  const { onSwitchGoogle } = useGoogleAuthObject();

  const feedSpotArray = useCallback((): AppTypes[] => {
    return [
      {
        name: "Microsoft",
        icon: "microsoft",
        color: "green",
        bgColor: "blue",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Apple",
        icon: "apple",
        color: "darkblue",
        bgColor: "blue",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.apple,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Google",
        icon: "google",
        color: "orange",
        bgColor: "blue",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.google,
        onSwitch: (event: SwitchChangeEvent) => {
          return onSwitchGoogle(
            data,
            portabilityScopes
          );
        },
      },
      {
        name: "Meta",
        icon: "meta",
        color: "blue",
        bgColor: "blue",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.meta,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
    ]
  }, [user])


  return { feedSpotArray };
}