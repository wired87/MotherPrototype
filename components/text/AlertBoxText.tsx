import { styles } from "../modals/styles";
import { Text, Pressable } from 'react-native';
import React from 'react';

interface AlertBoxProps {
    inputError: string;
    navigation: any;
}

export const AlertBoxText: React.FC<AlertBoxProps> = ({ inputError, navigation }) => {
    if (inputError.includes("auth/invalid-email")) {
        return <Text style={styles.errorText}>Invalid E-Mail format. Please try again.</Text>;
    } else if (inputError.includes("auth/email-already-in-use")) {
        return (
            <>
                <Text style={styles.errorText}>
                    This E-Mail is already registered. {'\n'}You can sign in
                </Text>
                <Pressable style={styles.redirectLogin} onPress={() => navigation.navigate("Login")}>
                    <Text style={{color: "rgb(255,255,255)"}}>Here</Text>
                </Pressable>
                <Text style={{marginBottom: 10}}>
                    Or
                </Text>
            </>
        );
    } else if (inputError.includes("auth/too-many-requests")) {
        return <Text style={styles.errorText}>Too many requests. Take a break and try again later.</Text>;
    } else if (inputError.includes("auth/weak-password")) {
        return <Text style={styles.errorText}>Your Password is not strong enough. Give him some Tren!</Text>;
    } else if (inputError.includes("success")) {
        return (
            <Text>
                Your Account jas been successfully created. {"\n"}
                You are allready logged in!
            </Text>
        );
    } else if (inputError.includes("invalid-login-credentials")) {
        return(
            <>
                <Text style={styles.errorText}>
                    Invalid Login credentials. Please try again.
                </Text>
            </>
        );
    }
    return null;
};
