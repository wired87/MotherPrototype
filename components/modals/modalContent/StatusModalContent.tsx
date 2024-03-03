import React, {memo} from "react";
import {View} from "react-native";
import LottieView from "lottie-react-native";
import {toolStyles} from "../../../screens/tools/toolStyles";
import {DefaultText} from "../../text/DefaultText";
import { styles as mss} from "../../modals/styles";
import {StatusModalContentInterface} from "../../../AppInterfaces/components/ModalInterfaces";

const StatusModalContent: React.FC<StatusModalContentInterface> = (
  {
    lottieSource,
    text,
    child
  }
) => {
  return(
    <View style={mss.modalView}>
      <LottieView style={mss.lottie} source={lottieSource} autoPlay loop={false} />
      <DefaultText moreStyles={[toolStyles.text, {marginHorizontal: 20}]} text={text} />
      {child}
    </View>
  )
}

export default memo(StatusModalContent);