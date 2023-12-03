import {StyleSheet} from "react-native";
import {themeColors} from "../../colors/theme";

export const styles = StyleSheet.create({
    buttonSelected: {
        backgroundColor: "rgb(4,24,44)",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        borderColor: '#0e3c6c',
        borderWidth: 2,
        flexDirection: 'row',
        width: 350,
        marginHorizontal: 0,
    },
    button: {
        backgroundColor: "#1b1d1f",
        //backgroundColor: "rgb(66,77,87)",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        flexDirection: 'row',
        width: 350,
    },
    buttonText1: {
        fontFamily: "Roboto",
        fontSize: 17,
        fontWeight: "700",
        color: 'white',
    },

    TouchableView: {
        flexDirection: "row",
        flex: 1,
        gap: 15
    },
    box2Icon: {
        backgroundColor: "#2b2a27",
        borderRadius: 10,
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: "Roboto",
        fontSize: 20,
        color: "rgb(255,255,255)",
    },
    settingsButton: {
        padding: 15,
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 5,
    },
    roundBtn: {
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    btnTxtProfile :{
        fontFamily: "Roboto",
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
})
