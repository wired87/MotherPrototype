import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {HeadingText} from "../../text/HeadingText";
import {DefaultText} from "../../text/DefaultText";
import {ModalContentNoLog} from "./ModalContentNoLog";
import {getAuth} from "firebase/auth";
// @ts-ignore
import React, {useCallback, useNavigation} from "react";
import { ActivityIndicator } from "react-native-paper";
import {themeColors} from "../../../colors/theme";
import {uniStyles} from "../../../screens/universalStyles"

// Strings
const indicatorSize = "medium";
const historyText = "History";
const noHistoryText = "Could not find any history . . .";
const historyReminder = "To see your Chat History, you must be {\"\\n\"} logged in.";
const loginText = "Login";
const registerText = "Register";

export const ChatMenuModalContent = (
    // @ts-ignore
    {  history, setText, loading, action }
) => {
    const user = getAuth().currentUser;

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

            <View style={{
                justifyContent: "flex-start",
                flex: 1,
                ...StyleSheet.absoluteFillObject,
                alignItems: "center",
                paddingBottom: 5,
                borderBottomWidth: 1,
                borderBottomColor: themeColors.borderThin,
                marginTop: 40,}}>
                <HeadingText text={historyText} extraStyles={undefined}/>
            </View>
            <View>
                {user ? (
                    loading ? (
                        <>
                            <ActivityIndicator
                                color={themeColors.sexyBlue}
                                // @ts-ignore
                                size={indicatorSize}/>
                        </>
                    ) : (
                        history ? (
                            <View style={uniStyles.reminderModalContainer}>
                                <FlatList
                                    // @ts-ignore
                                    data={history}
                                    style={uniStyles.historyList}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={uniStyles.historyItem} onPress={() => {
                                            action()
                                            setText(item)
                                        }}>
                                           <DefaultText text={item} moreStyles={undefined} />
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(_item, index) => index.toString()}
                                />
                            </View>
                        ) : (
                            <DefaultText text={noHistoryText} moreStyles={undefined}/>
                        )
                    )
                ):(
                    <ModalContentNoLog />
                )}
            </View>
        </View>
    );
}