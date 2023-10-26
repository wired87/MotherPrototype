import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChatMain from "../../components/Chat/ChatMain";
import ChatHeader from "./components/chatHeader";
import Menu from "./singleScreens/menu";
import {useEffect, useState} from "react";

export const ChatScreens = () => {
    const [text, setText] = useState("");
    const [send, setSend] = useState(false);

    const ChatStack = createNativeStackNavigator();

    return(
        <ChatStack.Navigator initialRouteName="ChatMain"
                             screenOptions={{
                                 header: (props) => <ChatHeader {...props} setText={setText} setSend={setSend}/>,
                             }}>
            <ChatStack.Screen name="ChatMain">
                {(props) => <ChatMain {...props} send={send} setSendHistoryMessage={setSend}
                                      text={text} setText={setText} />
                }
            </ChatStack.Screen>
            <ChatStack.Screen name="Menu" component={Menu} />
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


