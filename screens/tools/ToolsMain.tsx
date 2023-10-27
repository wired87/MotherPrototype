import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";

import {getAuth} from "firebase/auth";

const windowWidth = Dimensions.get('window').width;
export default function ToolMain() {
    const user = getAuth().currentUser;

    return(
        <ScrollView style={styles.main_container}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView style={styles.safeFullViewContainer}
                // @ts-ignore
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>

                <View style={styles.headingContainer}>
                    <Text>{user ? user.email : "HelloWorld"}</Text>
                </View>
                <View style={styles.singleActionContainer}>
                    <Text>Translate</Text>
                </View>
                <View style={styles.singleActionContainer}>
                    <Text>Chat</Text>
                </View>
                <View style={styles.singleActionContainer}>
                    <Text>Speech to Text</Text>
                </View >
                <View style={styles.singleActionContainer}>
                    <Text>Translate</Text>
                </View>

                <View style={styles.headingContainer}>
                    <Text>Image Functionality!</Text>
                </View>
                <View style={styles.singleActionContainer}>
                    <Text>Create Images</Text>
                </View >
                <View style={styles.singleActionContainer}>
                    <Text></Text>
                </View>
                <View style={styles.headingContainer}>
                    <Text>BOTTOM ANYTHING</Text>
                </View>


            </SafeAreaView>
        </ScrollView>
    );
}

/*
<Button title={"logout"} onPress={() => {FIREBASE_AUTH.signOut().then(r => console.log("successfully logged out"))}}/>

MAYBE UPPER SCROLL SECTION WITH SOME PARTNER PROGRAMS (LINK OTHER APPS TO DOWNLOAD)-> like affiliate with app downloads
+ wenn ganz nnach unten gesprollt dann weiter scrollt zeiht man den boden raus-> iwie impkementieren
*/
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#282525',
        paddingVertical: 70,
        paddingHorizontal: 10,
        border: {borderWidth: 1, borderColor: '#01152a'},
    },
    safeFullViewContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    headingContainer: {
        width: windowWidth * .85,
        height: 100,
        marginBottom: 30,
        borderColor: "rgb(255,255,255)",
        borderWidth: 1,
        marginRight: "auto",
        marginLeft: "auto",
    },
    singleActionContainer: {
        width: windowWidth * .44,
        height: 140,
        borderRadius: 15,
        borderColor: "rgb(255,255,255)",
        borderWidth: 1,
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: 20,
    },
});

