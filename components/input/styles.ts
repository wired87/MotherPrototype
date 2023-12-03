import {Dimensions, StyleSheet} from "react-native";
import {themeColors} from "../../colors/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const inputStyles = StyleSheet.create({
    defaultInput: {
        width: windowWidth * .9,
        justifyContent: "flex-start",
        textAlign: "justify",
        borderWidth: .5,
        borderColor: '#01152a',
        borderRadius: 9,
        paddingVertical: 4,
        paddingHorizontal: 10,
        color: '#000000',
        backgroundColor: 'white',
        height: 50,
        marginBottom: 0,
        minWidth: 250,
        marginHorizontal: 5,
        marginTop: 10
    },
    inputPicker: {
        fontFamily: "JetBrainsMono",
        width: windowWidth * .8,
        height: 300,
        backgroundColor: themeColors.dotNineWhite
    }

})