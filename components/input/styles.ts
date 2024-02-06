import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;
export const inputStyles = StyleSheet.create({
    defaultInput: {
        width: windowWidth * .9,
        justifyContent: "flex-start",
        textAlign: "justify",
        borderRadius: 9,
        paddingVertical: 4,
        paddingLeft: 5,
        paddingRight: 15,
        color: '#000000',
        minHeight: 50,
        minWidth: 250,
        textAlignVertical: "center",

    },

    streamHeadingInput: {
        textAlign: "center",
        fontSize: 21,
        marginVertical: 30,
        fontFamily: "JetBrainsMono",
    },
})