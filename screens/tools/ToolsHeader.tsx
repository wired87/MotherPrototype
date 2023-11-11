import {getHeaderTitle} from "@react-navigation/elements";
import {Platform, SafeAreaView} from "react-native";
import {Appbar, Menu} from "react-native-paper";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";

export const ToolHeader = (
  // @ts-ignore
  {navigation, route, options, back,}
) => {
    const user = getAuth().currentUser
    const [visible, setVisible] = useState(true);
    const closeMenu = () => setVisible(false);

    const title = getHeaderTitle(options, route.name);
    useEffect(() => {
        console.log("routeName: ", route.name)
    }, []);

    return (
      // @ts-ignore
      <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "space-between"}}>
          <Appbar.Header
            visible={!(route.name === "Login" || route.name === "Signup" || route.name === "AccountMain")}
            // @ts-ignore
            style={[[styles.headerContainer], Platform.OS === "ios" ? "padding" : undefined]}>
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