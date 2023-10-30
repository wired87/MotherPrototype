import {themeColors} from "../../colors/theme";
import {StyleSheet} from "react-native";
export const userStyles = StyleSheet.create({
    loginContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 45,
        paddingHorizontal: 30,
        marginVertical: 50,
        borderBottomColor: themeColors.borderThin,
        borderBottomWidth: 1,
    },
    authTextInfo: {
        marginTop: 20,
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
        marginVertical: 30,
    },
    profileSection: {
        borderWidth: 1,
        borderColor: themeColors.borderThin,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, .1)"
    },
    inputSection: {
        gap: 10,
        marginVertical: 60,
        fontSize:20,
        justifyContent: 'center',
        alignItems: "center",
    },
    mainContainerProfile: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonIcon: {
        marginHorizontal: 5,
        color:"white",

    },
    changeInfoBtn: {
        borderRadius: 9,
        flexDirection: "row",
        backgroundColor: '#01152a',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 0,
        width: 350,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    authNavHeaderContainerText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        paddingVertical: 10,
    },
})
