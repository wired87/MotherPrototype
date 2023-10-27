import { Platform, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import React from "react";

export const DefaultHeader = (
    // @ts-ignore
    { visible, children, extraStyles, statement, back }

) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={[extraStyles? extraStyles : null, {flex: 1, justifyContent: "center", alignItems: "space-between"}]}>
            <Appbar.Header
                visible={visible}
                // @ts-ignore
                style={[[styles.headerContainer], Platform.OS === "ios" ? "padding" : undefined]}>
                {back ? (
                    <Appbar.Action
                        icon="less-than"
                        color={"rgba(0, 0, 0, .8)"}
                        size={27}
                        onPress={() => navigation.goBack()}
                    />
                ):null}
                {children ? (
                    children
                ):null}
            </Appbar.Header>
        </SafeAreaView>
    );
}


/*
{!(route.name === "AuthNavigator") ?(
<Appbar.Action  // set here the icon for to action
    icon="account-circle"
    color={"rgba(255, 255, 255, .8)"}
    size={27}
    onPress={() => navigation.navigate('AuthNavigator', {screen: user ? "AccountMain" : "Login"})}// change later to modal opener
/>
 */
