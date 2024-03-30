import {AppTypes} from "../../screens/tools/ToolsMain";
import {useCallback, useContext} from "react";
import {PrimaryContext} from "../../screens/Context";
import {portabilityScopes} from "../../GoogleScopes";
import {SwitchChangeEvent} from "react-native";
import {useGoogleAuthObject} from "../AuthHooks";
import {GoogleServices} from "../../AppInterfaces/AuthInterfaces";

// IMAGES
import booking from "../../assets/images/toolImages/booking.png";
import flixbus from "../../assets/images/toolImages/flixbus.png";
import db from "../../assets/images/toolImages/db.png";
import kiwi from "../../assets/images/toolImages/kiwi.png";

const data: keyof GoogleServices = "data";

export function useTravel() {

  const { user } = useContext(PrimaryContext);
  const { onSwitchGoogle } = useGoogleAuthObject();

  const travelArray = useCallback((): AppTypes[] => {
    return [
      {
        name: "Booking.com",
        image: booking,
        color: "yellow",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "FlixBus",
        image: flixbus,
        color: "darkblue",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.apple,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Kiwi Flights",
        image: kiwi,
        color: "orange",
        bgColor: "white",
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
        name: "DB",
        image: db,
        color: "orange",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.google,
        onSwitch: (event: SwitchChangeEvent) => {
          return onSwitchGoogle(
            data,
            portabilityScopes
          );
        },
      },
    ]
  }, [user])


  return { travelArray };
}