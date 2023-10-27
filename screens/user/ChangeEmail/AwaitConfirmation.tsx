import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useEffect} from "react";
import {getAuth, sendEmailVerification, updateEmail } from "firebase/auth";
import {userStyles} from "../userStyles";
import {textStyles} from "../../../components/text/textStyles";

// @ts-ignore
export const WatchYourEmails = ({navigation}) => {
    const sendMail = async () => {
        const auth = getAuth();
        // @ts-ignore
        updateEmail(auth.currentUser, "").then(() => {

        }).catch((error) => {

        });
        // @ts-ignore
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("send E-Mail successfully...")
            });
    }

    useEffect(() => {
        sendMail().then(r => console.log("E-Mail sent..."))
    }, [])

    return (
        <SafeAreaView style={userStyles.main_container}>
            <View style={userStyles.infoContainer}>
                <Text style={textStyles.loginContainerHeaderText}>
                    We have send you a confirmation to your given E-Mail Address. {"\n"}
                    Please check your E-Mails and confirm.
                </Text>
                <TouchableOpacity onPress={() => {navigation.navigate("ToolsMain")}} style={userStyles.btn} >
                    <Text style={userStyles.btnTxt}>
                        Go Home
                    </Text>
                </TouchableOpacity>
                <Text style={userStyles.btnTxt}>
                    No E-Mail received? You can click <Text onPress={sendMail}>here</Text> to resend a E-Mail
                    or to report a Bug click<Text onPress={sendMail}>here</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

/*
user type in new mail -> check if input is valid -> if: change mail and sent confirmation the new one.
-> await emailVerified=true -> redirect to home
 */