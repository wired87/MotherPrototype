import React, {memo} from "react";
import {Modal, View} from "react-native";
import {styles} from "../buttons/styles";
import {uniStyles as us} from "../../screens/universalStyles";
import {motherMainStyles as mms} from "../../screens/mother/styles";
import { styles as mss} from "../modals/styles";
import {windowWidth} from "../../screens/chat/chatStyles";
import {StatusModalInterface} from "../../AppInterfaces/components/ModalInterfaces";
import {DefaultButton} from "../buttons/DefaultButton";


const StatusModal: React.FC<StatusModalInterface> = (
  {
    changeModalVisibility,
    modalVisible,
    children
  }
) => {


  const buttonStyles = [styles.confirmButton];
  const modalMainStyles = [mms.flex, mss.justifyAlignStart];
  const buttonContainerStyles = [us.justifyAlignCenter, us.row];
  const mainStyles:object[] = [
    us.justifyAlignCenter,
    {width: windowWidth,
      height: "100%", backgroundColor: "red", position: "absolute"}
  ];

  return(
    <Modal
      transparent
      animationType={"slide"}
      onRequestClose={changeModalVisibility}
      supportedOrientations={
        [
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right'
        ]
      }
      visible={modalVisible}>

      <View style={modalMainStyles}>
        {
          children
        }
        <DefaultButton
          onPressAction={changeModalVisibility}
          text={"close"}
        />
      </View>

    </Modal>
  );
}

export default memo(StatusModal);