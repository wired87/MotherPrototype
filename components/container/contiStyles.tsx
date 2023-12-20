import {Dimensions, StyleSheet} from "react-native";
import {themeColors} from "../../colors/theme";

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    modalH4: {
        textAlign: "center",
        fontSize: 24,
        gap: 40,
        lineHeight: 40,
    },
    featuresContainer: {
        width: windowWidth * .85,
        borderTopWidth: 1,
        borderWidth: 1,
        borderColor: themeColors.borderThin,
        marginVertical: 5,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,.2)",
    },
    chatMessageInput: {
        width: windowWidth * .8,
        fontFamily: "JetBrainsMono",
        borderColor: themeColors.borderThin,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    container: {
        right: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 40
    },
    fill: {
        flex: 1,
        margin: 15
    },
    main: {
        marginTop: 20,
        backgroundColor: "transparent",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bottom: -5,
        padding: 0
    },
    secondContainer: {
        flexDirection: "row",
        width: windowWidth,
        justifyContent: "space-between",
        marginBottom: 7,
        alignItems: "center"
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 12,
    },
    indicatorContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: windowWidth * .5,
        paddingLeft: 20
    },
    clearInputFiledBtn: {
        position: "absolute",
        top: 6,
        zIndex: 90,
        right: 45,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: themeColors.borderThin,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    sendIcon: {
        margin: 10,
        transform: [{rotate: '90deg'}]
    }
})

