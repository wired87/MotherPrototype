import {getHeaderTitle} from "@react-navigation/elements";
import {Platform, SafeAreaView} from "react-native";
import {Appbar, Menu} from "react-native-paper";
import {useContext, useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {PrimaryContext} from "../Context";
import {useNavigation, useRoute} from "@react-navigation/native";

export const ToolsNavigation = (
  // @ts-ignore
  { options, back }
) => {

    const route = useRoute();
    const navigation = useNavigation();

    const {user} = useContext(PrimaryContext);

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