import LottieView from "lottie-react-native";
import {DefaultContainer} from "../DefaultContainer";
import {DefaultText} from "../../text/DefaultText";
import successLottie from "../../../assets/animations/successLottie.json";
export const SuccessfullyLoggedOut = () => {
  return(
    <DefaultContainer
      extraStyles={undefined}>
      <LottieView
        source={successLottie}/>
      <DefaultText
        text={"You are successfully logged out!"}
        moreStyles={undefined} />
    </DefaultContainer>
  );
}