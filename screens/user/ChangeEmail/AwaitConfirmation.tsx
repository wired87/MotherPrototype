import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useEffect} from "react";
import {getAuth, sendEmailVerification, updateEmail } from "firebase/auth";


export const WatchYourEmails = ({navigation}) => {
    const sendMail = async () => {
        const auth = getAuth();
        updateEmail(auth.currentUser, "").then(() => {

        }).catch((error) => {

        });
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("send E-Mail successfully...")
            });
    }

    useEffect(() => {
        sendMail().then(r => console.log("E-Mail sent..."))
    }, [])

    return (
        <SafeAreaView style={styles.main_container}>
            <View style={styles.infoContainer}>
                <Text style={styles.loginContainerHeaderText}>
                    We have send you a confirmation to your given E-Mail Address. {"\n"}
                    Please check your E-Mails and confirm.
                </Text>
                <TouchableOpacity onPress={() => {navigation.navigate("ToolsMain")}} style={styles.btn} >
                    <Text style={styles.btnTxt}>
                        Go Home
                    </Text>
                </TouchableOpacity>
                <Text style={styles.btnTxt}>
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