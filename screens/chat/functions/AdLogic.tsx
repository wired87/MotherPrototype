import * as SecureStore from "expo-secure-store";
import {RewardedAdEventType} from "react-native-google-mobile-ads";

// Ads
import {RewardedInterstitialAd, TestIds,} from 'react-native-google-mobile-ads';
import {Platform} from "react-native";
const adUnitIdFullScreenAd = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : Platform.OS === "ios"
    ? "ca-app-pub-2225753085204049/3142510997"
    : "ca-app-pub-2225753085204049/7842257619";
const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitIdFullScreenAd, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export async function postMessageInfoData(value: string) {
  try {
    await SecureStore.setItemAsync("totalMessages", value);
    console.log('Saved Secure Store Data..');
  } catch (e) {

    console.error('Error while save the Data', e);
  }
}

export async function getMessageInfoData() {
  try {
    console.log("Getting messages from SecureStore")
    return await SecureStore.getItemAsync("totalMessages")
  } catch (e) {
    console.error('Error at requesting the Data: ', e);
    return false;
  }
}

export const checkUserMessageValue = async (value: string | boolean | null, setMessagesLeft: any) => {
  if (value !== "0" || value !== null) {
    console.log("User has", value, "Messages left.")
    if (value === "1") {
      await postMessageInfoData("0").then(() => setMessagesLeft("0"));
    } else if (value === "2") {
      await postMessageInfoData("1").then(() => setMessagesLeft("1"));
    } else if (value === "3") {
      await postMessageInfoData("2").then(() => setMessagesLeft("2"));
    } else {
      await postMessageInfoData("0").then(() => setMessagesLeft("0"));
    }
    return true;
  } else {
    return false;
  }
}


export const showAds = async (dispatch: any, messagesLeft: string, setMessagesLeft: any) => {
  if (messagesLeft === "0") {
    console.log("Ads initialized..")
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        dispatch({
          type: "FULL_SCREEN_AD",
          payload: true
        });
        rewardedInterstitial.show()
      },
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
       (reward: any) => {
        console.log("Full screen ad is showing right now..")
        postMessageInfoData("3")
          .then(() => setMessagesLeft("3"))
          .catch(() => setMessagesLeft("3"))
      console.log('User finished the Ad and earned reward of ', reward);
      },
    );
    // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }
}



/*
        rewardedInterstitial.show()
          .then(
            async () => {
              console.log("Full screen ad is showing right now..")
              await postMessageInfoData("5")
                .then(() => setMessagesLeft("5"))
                .catch(() => setMessagesLeft("5"))
            }
          )
      },
    );
 */








/*
export const set = async (setMessagesLeft: any) => {
  await postMessageInfoData("5")
    .then(() => {
      setMessagesLeft("5")
      console.log("UPDATED999999999")
      }
    )
  }

  useEffect(() => {
    set(setMessagesLeft).then(() =>  console.log("HelloAds"))
  }, []);

*/