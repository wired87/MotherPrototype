// FLAT LIST ARRAYS
import {useCallback, useContext} from "react";
import {PrimaryContext} from "../../screens/Context";
import {AppTypes} from "../../screens/tools/ToolsMain";
import {useMessage} from "./useMessaging";
import {useSocialMedia} from "./useSocialMedia";
import {useShopping} from "./useShopping";
import {useGoogleServices} from "./useGoogleServices";
import {useFeedSpot} from "./useFeedSpot";
import {usePayment} from "./usePayment";
import {useTravel} from "./useTravel";
import {useEmailServices} from "./useEmail";



export interface AllServices {
  data: AppTypes[]
  label: string;
}


export const useAllServices = (): {allServices: () => AllServices[]} => {

  const { user } = useContext(PrimaryContext);

  const { googleServicesArray } = useGoogleServices();
  const { feedSpotArray } = useFeedSpot();
  const { paymentArray } = usePayment();
  const { travelArray } = useTravel();
  const { shoppingArray } = useShopping();
  const { socialMediaArray } = useSocialMedia();
  const { emailArray } = useEmailServices();
  const { messageArray } = useMessage();

  const allServices = useCallback((): AllServices[] => {
    return [
      {
        data: feedSpotArray(),
        label: "Feed Spot"
      },
      {
        data: googleServicesArray(),
        label: "Google Services"
      },
      {
        data: paymentArray(),
        label: "Payment"
      },
      {
        data: travelArray(),
        label: "Travel"
      },
      {
        data: shoppingArray(),
        label: "Shopping"
      },
      {
        data: socialMediaArray(),
        label: "Social Media"
      },
      {
        data: emailArray(),
        label: "Email"
      },
      {
        data: messageArray(),
        label: "Messaging"
      },
    ]
  }, [user])


  return { allServices };
}