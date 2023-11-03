import {createNativeStackNavigator} from "@react-navigation/native-stack";

import React, {useCallback, useEffect, useState} from "react";
import {DefaultHeader} from "../../components/navigation/DefaultHeader";
import {Appbar, Menu} from "react-native-paper";
import {ChatMenuModalContent} from "../../components/container/ChatMenuModalContainer/ChatMenuModalContent";
import {SwipeModal} from "../../components/modals/SwipeModal";
import {getAuth} from "firebase/auth";
import axios from "axios/index";
// @ts-ignore
import {ChatMain} from "./ChatMain";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {Dimensions, View} from "react-native";
import {HeaderView} from "../../components/container/headerContainer";
import {AccountMain} from "../user/Account";
import {AuthNavigator} from "../user/AuthNavigator";
import {themeColors} from "../../colors/theme";
import {colors} from "../../Redux/cases";
const windowWidth = Dimensions.get('window').width;
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
    const user = getAuth().currentUser;

    // @ts-ignore
    const screen = useSelector(state => state.screens.value)
  // @ts-ignore
    const icon = useSelector(state => state.icon.value)
  // @ts-ignore
    const darkmode = useSelector(state => state.darkmode.value)


    const navigation = useNavigation();

    // @ts-ignore
    const openModal = useCallback(() => {
        setModalVisible(true);
        setAnimation(true);
        setVisible(true);
    });

    // @ts-ignore
    const closeModal = useCallback(() => {
        setModalVisible(false);
        setAnimation(false);
        setVisible(false);

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
        console.log("user: " + user)
        if (user) {
            console.log("there is a user:" + user)
            dispatchUserData().catch(error => console.log("Error in useEffect ChatHeader:", error));
        }
    }, [user])


  return(
        <ChatStack.Navigator
            initialRouteName="ChatMain"
            screenOptions={{
              // @ts-ignore
                header:
                    (props: any) =>
                        <DefaultHeader
                            {...props}
                            visible={true}
                            extraStyles={undefined}
                            statement={undefined}
                            children={
                                <>
                                  <HeaderView children={undefined} extraStyles={undefined} />

                                  <HeaderView
                                    extraStyles={{justifyContent: "center", alignItems: "center", left: 3}}
                                    children={
                                      <Menu
                                        anchor={
                                          <Appbar.Action
                                            icon="menu"
                                            color={darkmode.headerIconColors}
                                            onPress={openModal}
                                            size={30}
                                          />
                                        }
                                        children={undefined}
                                        visible={visible}
                                      />
                                    }
                                  />
                                  <HeaderView
                                    extraStyles={{justifyContent: "flex-end", alignItems: "flex-end"}}
                                    children={
                                      <Menu
                                        anchor={
                                          <Appbar.Action
                                            icon="account-circle-outline"
                                            color={darkmode.headerIconColors}

                                          // @ts-ignore
                                            onPress={() => navigation.navigate( "AuthNavigator", {screen: user? screen.account : screen.login})}
                                            size={30}
                                          />
                                        }
                                        children={undefined}
                                        visible={visible}
                                      />
                                    }
                                  />
                                  <SwipeModal
                                    animation={true}
                                    modalVisible={modalVisible}
                                    closeModal={closeModal}
                                    Content={
                                    <ChatMenuModalContent
                                      history={history}
                                      setText={setText}
                                      loading={loading}
                                      action={onPressHistory}/>}/>
                                </>
                            }/>
                        }}>
            <ChatStack.Screen  name="ChatMain">
                {(props) =>
                    <ChatMain
                      setSend={undefined}
                      {...props}
                      send={send}
                      setSendHistoryMessage={setSend}
                      text={text} setText={setText} />
                }
            </ChatStack.Screen>

            <ChatStack.Screen
                name={"AuthNavigator"}
                component={AuthNavigator}
                options={{
                    headerShown: false
                }}/>


        </ChatStack.Navigator>
    );
}


/*
how handle history-Text click?
- define const text and send in ChatScreens
- if user clicks on a text we setText to the text the user has clicked on and setSend to true
- also set up in useEffect in "ChatMain" a if statement "if send: run the function to send text.
- after thaA    t set terxt to "" and send to false


 */


