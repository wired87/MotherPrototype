import {StyleSheet} from "react-native";
import {themeColors} from "../../colors/theme";

export const settingStyles = StyleSheet.create({
    box2: {
        marginHorizontal: 10,
    },
    accountLoop: {
        paddingHorizontal: 10,

    },
    btnHeading: {
        // backgroundColor: "#2b2a27",
        paddingVertical: 10,
        fontWeight: 'bold',
        fontFamily: "JetBrainsMono",
        fontSize: 16,
        letterSpacing: 2,
        marginHorizontal: 20,
        marginVertical: 10
    },

    backBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10
    },
    backBtnTxt: {
        fontSize: 16,
        fontFamily: "Roboto",
        color: 'white',
        fontWeight: '700'
    },
    Heading: {
        fontSize: 29,
        fontFamily: "Roboto",
        color: 'rgba(0, 0, 0, .85)',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    SubHeading: {
        fontFamily: "Roboto",
        fontSize: 17,
        color: 'grey',
        fontWeight: '900',
        paddingLeft: 10,
        marginTop: 25,
        letterSpacing: 1.5
    },
    topBtn: {
        marginTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        gap: 14,
        justifyContent: "center",
        alignItems: 'flex-start',
        flexDirection: "column"

    },
    Box: {
        fontFamily: "Roboto",
        backgroundColor: '#1b1d1f',
        paddingHorizontal: 25,
        paddingVertical: 15,
        margin: 0,
        elevation: 10,
        position: "relative",
        width: "90%",
        borderRadius: 20,
        marginTop: 20,
        gap: 15,
    },
    BoxHead1: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    BoxHeadText1: {
        fontFamily: "Roboto",

        fontSize: 18,
        color: "rgba(255,255,255, .9)"
    },
    ButtonSection: {
        gap: 10,
        marginTop: 30,
        flex: 1,
        paddingHorizontal: 0,
        alignItems: "center",
    },

    BottomText: {
        fontFamily: "Roboto",

        fontSize: 14,
        fontWeight: "700",
        color: 'black',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    BottomTextCont: {
        flexDirection: "row",
        paddingHorizontal: 10,

        gap: 20,
    },
    BottomLastBtn: {
        opacity: .6,
        backgroundColor: themeColors.sexyBlue,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#3d453c',
        borderWidth: 1,
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        color: themeColors.headerText,
        marginBottom: 100,
    },
    BottomLastBtnText: {
        fontFamily: "Roboto",
        fontSize: 22,
        fontWeight: "700",
        color: 'white',
        textAlign: 'center'
    },
    imprintView: {
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        marginTop: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    }
});

