import {themeColors} from "../colors/theme";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {Dimensions, StyleSheet} from "react-native";

export const uniStyles = StyleSheet.create({
    headerContainer: {                                                       // Header
        flexDirection: "row",
        zIndex: 1000,

    },
    containerHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 29,
        borderTopRightRadius: 29,
        height: 40,
    },
    headerContent:{
        marginTop: 0,
        backgroundColor: "rgba(255, 255, 255, 0.78)",
        borderTopLeftRadius: 29,
        borderTopRightRadius: 29,
    },
    Modal: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    reminderModalContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 30,
        marginTop: 75,
        // borderWidth: 1,
        //borderColor: themeColors.bg,


    },
    reminderModalText: {
        fontSize: 16,
        marginTop: 30,
        textAlign: 'center',
        lineHeight: 30,
    },
    reminderModalBtn: {
        paddingHorizontal: 17,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: themeColors.sexyBlue,
        color: themeColors.headerText,
        marginHorizontal: 20,
        width: 100,
        marginTop: 100,
    },

    reminderModalBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 0,
        paddingHorizontal: 20,
        color: 'rgba(255, 255, 255, 0.78)',
    },
    reminderModalBtnText: {
        fontSize: 15,
        color: 'rgb(255, 255, 255)',
        textAlign: 'center',
    },
    reminderModalHeaderText: {
        fontSize: 29,
        color: "rgb(0,0,0)",
    },
    historyList: {
        flexDirection: 'column',
        paddingHorizontal: 5,
        paddingVertical: 10,

    },
    historyItem: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: 'rgb(255, 255, 255)',
        overflow: 'hidden',
        width: windowWidth * .9,
        marginBottom: 5,
        borderRadius: 9,
    },
    bgImage: {
        resizeMode: 'cover',
        opacity: .6,
    },
    headerNavbarContainer: {
        width: windowWidth * .3333,

        margin: 0,
        backgroundColor: "transparent"
    },
});