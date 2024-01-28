

const windowWidth = Dimensions.get('window').width;

import {Dimensions, StyleSheet} from "react-native";

export const uniStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        zIndex: 100,
        top:0,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        position: "absolute",
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
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        overflow: 'hidden',
        width: windowWidth * .9,
        marginBottom: 15,
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
    secondMain: {
        justifyContent: "flex-start",
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        paddingBottom: 5,
        borderBottomWidth: 1,
        marginTop: 40
    },

    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});