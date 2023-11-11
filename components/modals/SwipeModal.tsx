import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

import React, {useCallback} from "react";

import { IconButton } from "react-native-paper";
import {uniStyles} from "../../screens/universalStyles"
import {DefaultModal} from "./DefaultModal";
import {useSelector, useDispatch} from "react-redux";
import {themeColors} from "../../colors/theme";
// Strings
const modalIcon = "transit-connection-horizontal";



export const SwipeModal = (
    // @ts-ignore
    { animation, modalVisible, closeModal, Content }
) => {
  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)
  return(
    <DefaultModal
      modalVisible={modalVisible}
      PressToanimate={animation}
      onClose={closeModal}
      ImageBackgroundModal={null}
      ImageBackgroundModalStyle={null}
      HeaderStyle={uniStyles.headerContent}
      ContentModalStyle={[uniStyles.Modal, {backgroundColor: darkmode.secondaryContainerBackground}]}
      DisableHandAnimation={false}
      MainContainerModal={undefined}
      OpenModalDirection={"down"}
      PressToanimateDirection={"down"}
      duration={300}
      fade={true}
      onRequestClose={closeModal}
      ContentModal={
      <>
        <TouchableOpacity style={uniStyles.containerHeader} onPress={closeModal}>
          <IconButton
            icon={modalIcon}
            size={28}
            iconColor={darkmode.headerIconColors}
            onPress={closeModal}
          />
        </TouchableOpacity>
        {Content}
      </>
      }
      HeaderContent={null}
    />
  );
}