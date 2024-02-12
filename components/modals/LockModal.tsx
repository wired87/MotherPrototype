import React, {memo, useContext} from "react";
import {Modal, Pressable, View} from "react-native";
import {DefaultText} from "../text/DefaultText";
import {textStyles as ts, textStyles} from "../text/textStyles";
import {styles} from "../buttons/styles";
import {ThemeContext} from "../../screens/Context";
import {uniStyles as us} from "../../screens/universalStyles";
import {motherMainStyles as mms} from "../../screens/mother/styles";
import { styles as mss} from "../modals/styles";
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


  const { customTheme } = useContext(ThemeContext);

  const customButtonText = buttonText || "Confirm";

  const buttonStyles = [styles.confirmButton];
  const modalMainStyles = [mms.flex, mss.justifyAlignStart];
  const buttonContainerStyles = [us.justifyAlignCenter, us.row];

  return(
    <Modal
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