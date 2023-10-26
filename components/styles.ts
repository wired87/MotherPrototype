import {StyleSheet} from "react-native";
import {themeColors} from "../../theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    topBtn: {
        marginTop: 20,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        borderRadius: 20,
        gap: 14,
        justifyContent: 'center',
        alignItems: 'center',

    },

    topBtnTxt: {
        marginLeft: 10,
        marginRight: 30,
        textAlign: 'left',
        fontSize: 18,
        color:"rgba(255,255,255,1)"


    },
    box1: {
        marginTop: 20,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    subBox1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
        paddingBottom: 15
    },
    boxText1: {
        backgroundColor: "#2b2a27",
        borderRadius: 10,
        padding: 4,
    },
    box2: {
        marginHorizontal: 10,

    },
    settingsButton: {
        padding: 15,
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: themeColors.sexyBlue,
        marginBottom: 5,

    },

    TouchableView: {
        flexDirection: "row",
        flex: 1,
        gap: 15
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
    subBox2: {
        textDecorationLine: "underline",
        display: "flex",
        flexDirection: "row",

        alignItems: "center",
        backgroundColor: "red",
        borderBottomWidth: 0.5,  // Add this to create a bottom border
        borderBottomColor: "grey",
        paddingBottom: 15

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

        fontSize: 20,
        color: "rgb(255,255,255)",
    },

    poweredBy: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
    },
    poweredTxt: {
        fontSize: 20,
        color: "black",
        fontWeight: 'bold'
    },
    adsCont: {
        borderColor :"white",
        marginTop: 50,
        borderRadius:28,
        paddingVertical: 30,
        border:'1px solid white'
    },
    singleProtextContainer: {
        flexDirection: "row",

    },
    logoBottom: {
        width: 70,
        height: 40,
        resizeMode: 'cover',
        marginVertical: 10,
    }
})