import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HeadingText} from "../text/HeadingText";
import {DefaultText} from "../text/DefaultText";
import {ModalContentNoLog} from "../container/ChatMenuModalContainer/ModalContentNoLog";
import React, {useCallback} from "react";
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActivityIndicator, IconButton } from "react-native-paper";

// Strings
const modalIcon = "menu-down-outline";



export const SwipeModal = (
    // @ts-ignore
    { bgBottom, animation, modalVisible, closeModal, Content, setAnimation }
) => {

    const action = useCallback(() => setAnimation(true), []);

    return(
        <SwipeUpDownModal
            modalVisible={modalVisible}
            PressToanimate={animation}
            onClose={closeModal}
            ImageBackgroundModal={bgBottom}
            ImageBackgroundModalStyle={styles.bgImage}
            HeaderStyle={styles.headerContent}
            ContentModalStyle={styles.Modal}
            ContentModal={
                Content
            }
            HeaderContent={
                <View style={styles.containerHeader}>
                    <IconButton style={{color: 'rgba(255, 255, 255, 0.98)'}}
                                onPress={action}
                                icon={modalIcon}
                                size={28}
                                color={'rgba(255, 255, 255, 0.98)'}/>
                </View>
            }/>
    );
}