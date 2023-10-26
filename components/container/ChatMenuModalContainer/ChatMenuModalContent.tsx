import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HeadingText} from "../../text/HeadingText";
import {DefaultText} from "../../text/DefaultText";
import {ModalContentNoLog} from "./ModalContentNoLog";
import {getAuth} from "firebase/auth";
// @ts-ignore
import React, {useCallback, useNavigation} from "react";
import { ActivityIndicator, IconButton } from "react-native-paper";

// Strings
const indicatorSize = "medium";
const historyText = "History";
const noHistoryText = "Could not find any history . . .";
const historyReminder = "To see your Chat History, you must be {\"\\n\"} logged in.";
const loginText = "Login";
const registerText = "Register";

const user = getAuth.currentUser;


export const ChatMenuModalContent = (
    // @ts-ignore
    {  history, setText, loading }
) => {
    const onPressHistory = useCallback(() => {
        setAnimation(true);
        setSend(true);
    }, []);

    return(
        <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center"}}>
            <View style={{
                justifyContent: "flex-start",
                flex: 1,
                ...StyleSheet.absoluteFillObject,
                alignItems: "center",
                paddingBottom: 5,
                borderBottomWidth: .5,
                borderBottomColor: themeColors.borderThin,
                marginTop: 40,}}>
                <HeadingText text={historyText}/>
            </View>
            <View>
                {user ? (
                    loading ? (
                        <>
                            <ActivityIndicator
                                color={themeColors.sexyBlue}
                                size={indicatorSize}/>
                        </>
                    ) : (
                        history ? (
                            <View style={styles.reminderModalContainer}>
                                <FlatList
                                    // @ts-ignore
                                    data={history}
                                    style={styles.historyList}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.historyItem} onPress={() => {
                                            onPressHistory()
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