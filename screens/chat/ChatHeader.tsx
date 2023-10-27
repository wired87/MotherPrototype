/*import React, {useCallback, useEffect} from "react";
import {getHeaderTitle} from "@react-navigation/elements";
import {ActivityIndicator, Appbar, Menu} from "react-native-paper";
import { Platform, SafeAreaView } from "react-native";
import {styles} from "../../universalStyles";
import {themeColors} from "../../../theme/theme";
import axios from "axios";
import {useSelector} from "react-redux";
import bgBottom from "../../../assets/bgModalChat.jpg";
import {StyleSheet} from "react-native";
import {getAuth} from "firebase/auth";
import {LinearGradient} from "expo-linear-gradient";
import {SwipeModal} from "../../components/modals/ChatMenuSwipeUpDownModal";
import {ChatMenuModalContent} from "../../components/container/ChatMenuModalContainer/ChatMenuModalContent";

// @ts-ignore
export default function ChatHeader({ navigation, route, options, back, setText }) {
    const [visible, setVisible] = React.useState(false);
    const[modalVisible, setModalVisible] = React.useState(false);
    const[animation, setAnimation] = React.useState(false);
    const[history, setHistory] = React.useState([]);
    const[loading, setLoading] = React.useState(true);
    const user = getAuth.currentUser
    const closeMenu = () => setVisible(false);
    const title = getHeaderTitle(options, route.name);

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

    const dispatchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://192.168.178.51:8000/open/chat-history/", {
                "user_id": user.uid,
            })
            console.log("data raw: ", response);
            setHistory(response.data.chat_history);
            console.log("data list: ", history);
        } catch(error) {
            console.log("There was an error get the User ID: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            dispatchUserData().catch(error => console.log("Error in useEffect ChatHeader:", error));
        }
    }, [user])

    return (
        <>
            <SafeAreaView style={{flex: 1, justifyContent: "space-between", alignItems: "center"}}>
                <Appbar.Header
                    style={[
                        [styles.headerContainer],
                        Platform.OS === "ios" ? "padding" : undefined
                    ]}>

                </Appbar.Header>
            </SafeAreaView>
            <SwipeModal
                bgBottom={bgBottom}
                animation={animation}
                modalVisible={modalVisible}
                closeModal={closeModal}
                setAnimation={setAnimation}
                Content={
                    <ChatMenuModalContent
                        history={history}
                        setText={setText}
                        loading={loading}/>
                }/>
        </>
    );
}
*/
