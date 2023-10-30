import {FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {HeadingText} from "../text/HeadingText";
import {DefaultText} from "../text/DefaultText";
import {ModalContentNoLog} from "../container/ChatMenuModalContainer/ModalContentNoLog";
import React, {useCallback} from "react";

import { IconButton } from "react-native-paper";
import {uniStyles} from "../../screens/universalStyles"
import {DefaultModal} from "./DefaultModal";

// Strings
const modalIcon = "transit-connection-horizontal";



export const SwipeModal = (
    // @ts-ignore
    { animation, modalVisible, closeModal, Content, setAnimation }
) => {

    return(
        <DefaultModal
            modalVisible={modalVisible}
            PressToanimate={animation}
            onClose={closeModal}
            ImageBackgroundModal={null}
            ImageBackgroundModalStyle={null}
            HeaderStyle={uniStyles.headerContent}
            ContentModalStyle={uniStyles.Modal}
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
                    {/*@ts-ignore*/}
                    <IconButton
                        icon={modalIcon}
                        size={28}
                        onPress={closeModal}
                    />
                </TouchableOpacity>
                {Content}
            </>
            }
            HeaderContent={null

            } />
    );
}