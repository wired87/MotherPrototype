import {createNativeStackNavigator} from "@react-navigation/native-stack";

import React, {useCallback, useEffect, useState} from "react";
import {DefaultHeader} from "../../components/navigation/DefaultHeader";
import {Appbar, Menu} from "react-native-paper";
import {ChatMenuModalContent} from "../../components/container/ChatMenuModalContainer/ChatMenuModalContent";
import {SwipeModal} from "../../components/modals/ChatMenuSwipeUpDownModal";
import {getAuth} from "firebase/auth";
import axios from "axios/index";
// @ts-ignore
import {bgModalChat} from "../../assets/images/bgModalChat.jpg";
import {ChatMain} from "./ChatMain";
import {FIREBASE_AUTH} from "../../firebase.config";

export const ChatNavigation = () => {
    // State variables
    const [text, setText] = useState("");
    const [send, setSend] = useState(false);
    const[loading, setLoading] = React.useState(true);
    const [visible, setVisible] = React.useState(false);
    const[modalVisible, setModalVisible] = React.useState(false);
    const[animation, setAnimation] = React.useState(false);
    const[history, setHistory] = React.useState([]);

    // other Variables
    const ChatStack = createNativeStackNavigator();
    const user = FIREBASE_AUTH

    // @ts-ignore
    const openModal = useCallback(() => {
        setModalVisible(true);
        setAnimation(true);
    });

    // @ts-ignore
    const closeModal = useCallback(() => {
        setModalVisible(false);
        setAnimation(false);
    });

    const onPressHistory = useCallback(() => {
        setAnimation(true);
        setSend(true);
    }, []);

    const dispatchUserData = useCallback(async () => {
        setLoading(true);
        try {
            const response = // @ts-ignore
                await axios.post("http://192.168.178.51:8000/open/chat-history/", {"user_id": user.uid,})
            console.log("data raw: ", response);
            setHistory(response.data.chat_history);
            console.log("data list: ", history);
        } catch(error) {
            console.log("There was an error get the User ID: ", error);
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        if (user) {
            dispatchUserData().catch(error => console.log("Error in useEffect ChatHeader:", error));
        }
    }, [user])

    return(
        <ChatStack.Navigator
            initialRouteName="ChatMain"
            screenOptions={{
                header:
                    (props: any) =>
                        <DefaultHeader
                            {...props}
                            visible={true}
                            extraStyles={undefined}
                            statement={undefined}
                            children={
                                <>
                                    <Menu
                                        visible={visible}
                                        onDismiss={closeModal} // if click anywhere outside then close
                                        anchor={<Appbar.Action icon="menu" onPress={openModal}/>} children={undefined}/>
                                    <SwipeModal
                                        bgImage={bgModalChat}
                                        animation={animation}
                                        modalVisible={modalVisible}
                                        closeModal={closeModal}
                                        setAnimation={setAnimation}
                                        Content={<ChatMenuModalContent
                                            history={history}
                                            setText={setText}
                                            loading={loading}
                                            action={onPressHistory}/>}/>
                                </>
                            }/>
                        }}>
            <ChatStack.Screen name="ChatMain">
                {(props) =>
                    <ChatMain setSend={undefined} {...props} send={send}
                              setSendHistoryMessage={setSend}
                              text={text} setText={setText} />
                }
            </ChatStack.Screen>
        </ChatStack.Navigator>
    );
}


/*
how handle history-Text click?
- define const text and send in ChatScreens
- if user clicks on a text we setText to the text the user has clicked on and setSend to true
- also set up in useEffect in "ChatMain" a if statement "if send: run the function to send text.
- after that set terxt to "" and send to false
 */


