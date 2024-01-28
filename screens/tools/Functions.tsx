import {Dispatch, SetStateAction} from "react";
import LottieView, {AnimationObject} from "lottie-react-native";
import {toolStyles as ts} from "./toolStyles";


export const defaultLottie =
    (
      source: string | AnimationObject | { uri: string; },
      setSuccessAnimationFinish: Dispatch<SetStateAction<boolean>>
    ) => {
    return <LottieView speed={1} style={ts.lottie} source={source} autoPlay loop={false} onAnimationFinish={
      () => {
        setSuccessAnimationFinish(true);
        console.log("Animation finished...");
      }
    }/>
  }