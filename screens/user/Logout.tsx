import {SafeAreaView, Text, View} from "react-native";
import {Text as T} from "galio-framework";
import {useEffect, useState} from "react";
import {DefaultText} from "../../components/text/DefaultText";

const logoutText = "You are now logged out . . ."
// @ts-ignore
export const Logout = ({navigation}) => {
    const [seconds, setSeconds] = useState(2);



    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(seconds => {
                if (seconds === 0) {
                    navigation.navigate("Login");
                    return 0;
                }
                return seconds - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, );

    return(
        <SafeAreaView>
            <View>
                <DefaultText text={logoutText} moreStyles={undefined}></DefaultText>
                <T>You will get redirected in a few minutes . . . ({seconds})</T>
            </View>
        </SafeAreaView>
    );
};