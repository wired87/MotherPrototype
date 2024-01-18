import {Dimensions, StyleSheet} from "react-native";
const windowWidth = Dimensions.get('window').width;
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
        position: "relative",
        height: "auto",
        minHeight: 30,
        marginRight: windowWidth * .11,
        paddingVertical: 14,
        paddingHorizontal: 15,

    },
    userMessageContainer: {
        minHeight: 30,
        position: "relative",
        paddingVertical: 14,
        paddingHorizontal: 15,
        height: "auto",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        marginLeft: windowWidth * .11
    },
    voiceMessage: {
        height: 44,
        borderRadius: 14,
        width: "auto",
        marginLeft: windowWidth * .11,
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
        height: "80%",
        marginVertical: "50%",
        borderRadius: 14
    }
})