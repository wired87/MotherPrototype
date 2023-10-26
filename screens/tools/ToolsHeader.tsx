import {getHeaderTitle} from "@react-navigation/elements";
import {Platform, SafeAreaView} from "react-native";
import {Appbar, Menu} from "react-native-paper";
import {styles} from "../../universalStyles";
import {useEffect, useState} from "react";

export default function ToolHeader({
                                       navigation,
                                       route,
                                       options,
                                       back,
                                   }) {

    const [visible, setVisible] = useState(true);
    const closeMenu = () => setVisible(false);
    const user = false;
    const title = getHeaderTitle(options, route.name);
// got an invalid value for 'children' prop for the screen 'chat'. It must be a function returning a React Element.
    useEffect(() => {
        console.log("routeName: ", route.name)
    }, []);

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "space-between"}}>
            <Appbar.Header
                visible={!(route.name === "Login" || route.name === "Signup" || route.name === "AccountMain")}
                style={[
                    [styles.headerContainer],
                    Platform.OS === "ios" ? "padding" : undefined
                ]}>
                {!(route.name === "AuthNavigator") ?(
                    <Appbar.Action  // set here the icon for to action
                        icon="account-circle"
                        color={"rgba(255, 255, 255, .8)"}
                        size={27}
                        onPress={() => navigation.navigate('AuthNavigator', {screen: user ? "AccountMain" : "Login"})}// change later to modal opener
                    />
                ):null}
            </Appbar.Header>
        </SafeAreaView>
    );
}