import React, {memo, useContext} from "react";
import {View} from "react-native";
import {DefaultText} from "../text/DefaultText";
import {styles} from "../buttons/styles";
import {uniStyles as us} from "../../screens/universalStyles";
import {motherMainStyles as mms} from "../../screens/mother/styles";
import { styles as mss} from "../modals/styles";
import {LockModalTypes} from "../../AppInterfaces/components/ModalInterfaces";
import DefaultPageNavigationBtn from "../buttons/DefaultPageNavigationBtn";
import {ThemeContext} from "../../screens/Context";

const closeButtonText:string = "close";

const LockContent: React.FC<LockModalTypes> = (
  {
    changeModalVisibility,
    headingText,
    handleConfirmationClick,
    buttonText
  }
) => {

  const customButtonText:string = buttonText || "confirm";

  const buttonStyles:object[] = [styles.confirmButton];
  const modalMainStyles:object[] = [mms.flex, mss.justifyAlignStartCenter, mss.marginTop5];
  const buttonContainerStyles:object[] = [us.justifyAlignCenter, us.row];
  const textStyles = [mss.modalHeadingText, {marginBottom: 30}];
  const {customTheme} = useContext(ThemeContext);


  return(
    <View style={modalMainStyles}>
      <DefaultText
        text={`Are you sure to ${headingText}`}
        moreStyles={textStyles}
      />
      <View style={buttonContainerStyles}>
        <DefaultPageNavigationBtn
          text={closeButtonText}
          onPressAction={() => changeModalVisibility()}
          extraTextStyles={{
            color: "white",
            fontSize: 16,
            textAlign: "center"
          }}
          extraBtnStyles={{
            backgroundColor: customTheme.primaryButton
          }}
        />
        <DefaultPageNavigationBtn
          text={customButtonText}
          onPressAction={() => handleConfirmationClick()}
          extraTextStyles={{
            color: "white",
            fontSize: 16,
            textAlign: "center"
          }}
          extraBtnStyles={{
            backgroundColor: customTheme.primaryButton
          }}
        />

      </View>
    </View>
  );
}



export default memo(LockContent);