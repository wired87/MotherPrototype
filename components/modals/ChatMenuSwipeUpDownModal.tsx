import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HeadingText} from "../text/HeadingText";
import {DefaultText} from "../text/DefaultText";
import {ModalContentNoLog} from "../container/ChatMenuModalContainer/ModalContentNoLog";
import React, {useCallback} from "react";
// @ts-ignore
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { IconButton } from "react-native-paper";
import {uniStyles} from "../../screens/universalStyles"

// Strings
const modalIcon = "menu-down-outline";



export const SwipeModal = (
    // @ts-ignore
    { bgImage, animation, modalVisible, closeModal, Content, setAnimation }
) => {
    const action = useCallback(() => setAnimation(true), []);



    return(
        <SwipeUpDownModal
            modalVisible={modalVisible}
            PressToanimate={animation}
            onClose={closeModal}
            ImageBackgroundModal={bgImage}
            ImageBackgroundModalStyle={uniStyles.bgImage}
            HeaderStyle={uniStyles.headerContent}
            ContentModalStyle={uniStyles.Modal}
            ContentModal={
                Content
            }
            HeaderContent={
                <View style={uniStyles.containerHeader}>
                    {/*@ts-ignore*/}
                    <IconButton style={{color: 'rgba(255, 255, 255, 0.98)'}}
                                onPress={action}
                                icon={modalIcon}
                                size={28}
                                color={'rgb(0, 0, 0)'}/>
                </View>
            }/>
    );
}