import {Dimensions, StyleSheet} from "react-native";
import {themeColors} from "../../colors/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
    maintextInput: {
        width: windowWidth * .8,
        borderColor: "#01152a",
        borderRightWidth: 1,
        marginLeft: 20,
        fontWeight: "bold",
        color: themeColors.white,
        fontSize: 17,
    },
    aiMessageContainer: {
        width: "auto",
        position: "relative",
        height: "auto",
        minHeight: 30,
        marginLeft: 20,
        marginRight: 20,
        borderTopWidth: .5,
        borderBottomWidth: .5,
        borderColor: "rgba(0, 0, 0, .1)",
        paddingTop: 13,
        paddingBottom: 13,
    },
    userMessageContainer: {
        minHeight: 30,
        position: "relative",
        width: "auto",
        height: "auto",
        marginLeft: 20,
        borderTopWidth: .5,
        borderBottomWidth: .5,
        borderColor: "rgba(0, 0, 0, .1)",
        marginRight: 20,
        paddingVertical: 13
    },

    voiceMessage: {
        height: 44,
        borderRadius: 14,
        width: "auto",
        marginHorizontal: 20,
        paddingVertical: 13,
        position: "relative",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    audioInfoBox: {
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
        width: windowWidth * .9,
        height: "80%",
        marginVertical: "50%",
        borderRadius: 14
    }
})