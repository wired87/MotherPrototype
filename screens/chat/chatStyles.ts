import {Dimensions, StyleSheet} from "react-native";
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const chatStyles = StyleSheet.create({
    inputContainer: {
        width: windowWidth,
        borderColor: "#01152a",
        borderTopWidth: 1,
        height: 54,
        backgroundColor: "rgb(255, 0, 0)",
    },
    safeFullViewContainer: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        backgroundColor: '#282525',
        paddingVertical: 70,
        paddingHorizontal: windowWidth * .05,
        borderWidth: 1,
        borderColor: '#01152a',
    },

    aiMessageContainer: {
        width: "auto",
        height: "auto",
        minHeight: 30,
        marginLeft: windowWidth *.1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        position: "relative",
    },

    userMessageContainer: {
        minHeight: 30,
        position: "relative",
        paddingVertical: 5,
        paddingHorizontal: 5,
        height: "auto",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        marginLeft: windowWidth * .19
    },
    voiceMessage: {
        height: 44,
        borderRadius: 14,
        width: "auto",
        marginLeft: windowWidth * .14,
        position: "relative",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 12,
        bottom: 0,
        elevation: 15,
    },

    audioInfoBox: {
        position: "absolute",
        flexDirection: "row",
        paddingVertical: 0,
        backgroundColor: "transparent",
        justifyContent: "space-between",
        alignItems: "center"
    },
    chatBackground: {
        zIndex: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth * .85,
        height: "77%",
        marginVertical: "50%",
        borderRadius: 14
    }
})