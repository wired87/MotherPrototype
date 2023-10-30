import { Platform, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import React from "react";
import {uniStyles} from "../../screens/universalStyles";
import {HeaderView} from "../container/headerContainer";

export const DefaultHeader = (
    // @ts-ignore
    { visible, children, extraStyles, statement, back, route }

) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={[extraStyles? extraStyles : null, {flex: 1, justifyContent: "flex-start", alignItems: "flex-end"}]}>
            <Appbar.Header
                style={[[uniStyles.headerContainer], {paddingVertical: Platform.OS === "ios" ? 20 : 0}]}>
                {back ? (
                    <>
                        <HeaderView
                            extraStyles={undefined}
                            children={
                                <Appbar.Action
                                    icon="less-than"
                                    color={"rgba(0, 0, 0, .8)"}
                                    size={27}
                                    onPress={() => navigation.goBack()}
                                />
                            }
                        />
                        <HeaderView children={undefined} extraStyles={undefined} />
                        <HeaderView children={undefined} extraStyles={undefined} />


                    </>
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
