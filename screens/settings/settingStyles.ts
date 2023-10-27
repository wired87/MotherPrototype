import {StyleSheet} from "react-native";
import {themeColors} from "../../colors/theme";

export const settingStyles = StyleSheet.create({
    box2: {
        marginHorizontal: 10,

    },
    btnHeading: {
        // backgroundColor: "#2b2a27",
        paddingVertical: 10,
        fontWeight: 'bold',
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
        color: 'white',
        fontWeight: '700'
    },
    Heading: {
        fontSize: 29,
        color: 'rgba(0, 0, 0, .85)',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    SubHeading: {
        fontSize: 17,
        color: 'grey',
        fontWeight: '900',
        paddingLeft: 10,
        marginTop: 25,
        letterSpacing: 1.5
    },
    Box: {
        justifyContent: 'center',
        alignItems: "flex-start",
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
        fontSize: 18,
        color: "rgba(255,255,255, .9)"
    },
    ButtonSection: {
        gap: 10,
        marginTop: 30,
        flex: 1,
        paddingHorizontal: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    BottomText: {
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
        alignItems: "center",
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
        fontSize: 22,
        fontWeight: "700",
        color: 'white',
        textAlign: 'center'
    },
});

