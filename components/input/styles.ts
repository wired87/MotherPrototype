import {Dimensions, StyleSheet} from "react-native";
import {themeColors} from "../../colors/theme";

const windowWidth = Dimensions.get('window').width;
export const inputStyles = StyleSheet.create({
    defaultInput: {
        width: windowWidth * .9,
        justifyContent: "flex-start",
        textAlign: "justify",
        borderRadius: 9,
        paddingVertical: 4,
        paddingHorizontal: 10,
        color: '#000000',
        height: 50,
        minWidth: 250,
        marginHorizontal: 5,
        marginTop: 15,
    },
    inputPicker: {
        fontFamily: "JetBrainsMono",
        width: windowWidth * .8,
        height: 300,
        backgroundColor: themeColors.dotNineWhite
    },
    streamHeadingInput: {
        textAlign: "center",
        fontSize: 21,
        marginVertical: 30,
        fontFamily: "JetBrainsMono",
    },
})