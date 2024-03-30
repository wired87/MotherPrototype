import {AppTypes} from "../../screens/tools/ToolsMain";
import {useCallback, useContext} from "react";
import {PrimaryContext} from "../../screens/Context";
import {portabilityScopes} from "../../GoogleScopes";
import {SwitchChangeEvent} from "react-native";
import {useGoogleAuthObject} from "../AuthHooks";
import {GoogleServices} from "../../AppInterfaces/AuthInterfaces";

const data: keyof GoogleServices = "data";
import klarna from "../../assets/images/toolImages/klarna.png";
import wise from "../../assets/images/toolImages/wise.png";
import coinbase from "../../assets/images/toolImages/coinbase.png";
import adyen from "../../assets/images/toolImages/adyen.png";

export const usePayment = () => {

  const { user } = useContext(PrimaryContext);
  const { onSwitchGoogle } = useGoogleAuthObject();

  const paymentArray = useCallback((): AppTypes[] => {
    return [
      {
        name: "PayPal",
        icon: "paypal",
        color: "blue",
        bgColor: "white",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Klarna",
        image: klarna,
        color: "blue",
        bgColor: "pink",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.microsoft,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Stripe",
        icon: "stripe",
        color: "white",
        bgColor: "black",
        screen: "EmailAuthScreen",
        unlocked: user?.feedSpot?.apple,
        onSwitch: (event: SwitchChangeEvent) => {},
      },
      {
        name: "Transfer Wise",
        image: wise,
        color: "white",
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
        name: "Venmo",
        icon: "logo-venmo",
        color: "black",
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
        name: "Coinbase Commerce",
        image: coinbase,
        color: "yellow",
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
        name: "Adyen",
        image: adyen,
        color: "white",
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


  return { paymentArray };
}