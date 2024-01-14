import {themeColors} from "../../colors/theme";
import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;

export const userStyles = StyleSheet.create({
    loginContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 45,
        paddingHorizontal: 30,
        marginVertical: 50,
        borderBottomWidth: 1,

    },
    errormessageStyles: {
        marginBottom: 30,
        color: themeColors.deleteRed,
        fontSize: 17
    },
    authTextInfo: {
        marginTop: 20,
        marginBottom: 10
    },
    alternativeAuthMethodContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    changeBtn: {
        borderRadius: 9,
        flexDirection: "row",
        backgroundColor: '#01152a',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    main_container: {
        flex: 1,
        paddingVertical: 70,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 0,
        borderRadius: 14,
        width: 400,
        height: 500,
    },
    btnTxt: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: "normal"
    },
    btn: {
        borderRadius: 20,
        backgroundColor:"#030824",
        alignSelf: 'center',
        marginBottom: 50,
        paddingHorizontal: 9,
        paddingVertical: 8,

    },
    adContainer: {
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 30,
    },
    profileSection: {
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: themeColors.borderThin,
        borderRadius: 20,
        backgroundColor: "transparent",
        borderBottomWidth: 1,
        marginVertical: 10
    },
    inputSection: {
        gap: 10,
        marginVertical: 30,
        fontSize:20,
        justifyContent: 'center',
        alignItems: "center",
    },
    mainContainerProfile: {
        flex: 1,
        paddingTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonIcon: {
        marginHorizontal: 5,
        color:"white",
        marginVertical: 5,
    },

    authNavHeaderContainerText: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10,
    },
    extraMargin: {
        marginVertical: 20,
    },
    forgotPasswordButton: {
        borderWidth: 1,
        borderRadius: 14,
        elevation: 20,
        paddingVertical: 4,
        paddingHorizontal: 7,
        addingHorizontal: 7,
        marginVertical: 10
    },
    extraMarginRight: {
        marginRight: 5
    },
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

})
