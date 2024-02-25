import React, {memo} from "react";
import {Modal, Pressable, View} from "react-native";
import {DefaultText} from "../text/DefaultText";
import {styles} from "../buttons/styles";
import {uniStyles as us} from "../../screens/universalStyles";
import {motherMainStyles as mms} from "../../screens/mother/styles";
import { styles as mss} from "../modals/styles";
import {windowWidth} from "../../screens/chat/chatStyles";
interface LockModalTypes {
  changeModalVisibility: (() => void);
  modalVisible: boolean;
  headingText: string;
  icon: string;
  handleConfirmationClick: (() => void);
  buttonText: string;
}


const closeButtonText:string = "close";


const LockModal: React.FC<LockModalTypes> = (
  {
    changeModalVisibility,
    modalVisible,
    headingText,
    handleConfirmationClick,
    buttonText
  }
) => {

  const customButtonText = buttonText || "Confirm";

  const buttonStyles = [styles.confirmButton];
  const modalMainStyles = [mms.flex, mss.justifyAlignStart];
  const buttonContainerStyles = [us.justifyAlignCenter, us.row];
  const mainStyles:object[] = [
    us.justifyAlignCenter,
    {width: windowWidth,
      height: "100%", backgroundColor: "red", position: "absolute"}];

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
        visible={modalVisible}
      >
        <View style={modalMainStyles}>
          <View style={mss.modalView}>
            <DefaultText

              text={`Are you sure to ${headingText}?`}
            />
            <View style={buttonContainerStyles}>
              <Pressable
                style={buttonStyles}
                onPress={changeModalVisibility}>
                <DefaultText text={closeButtonText}/>
              </Pressable>
              <Pressable
                style={buttonStyles}
                onPress={handleConfirmationClick}>
                <DefaultText text={customButtonText}/>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>
  );


}



export default memo(LockModal);