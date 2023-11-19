import {Dimensions, StyleSheet} from "react-native";
import {themeColors} from "../../colors/theme";

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    modalH4: {
        textAlign: "center",
        fontSize: 24,
        gap: 40,
        lineHeight: 40,
    },
    featuresContainer: {
        width: windowWidth * .85,
        borderTopWidth: 1,
        borderWidth: 1,
        borderColor: themeColors.borderThin,
        marginVertical: 5,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "rgba(191,0,0,.2)"
    },
    chatMessageInput: {
        width: windowWidth * .8,

        borderColor: themeColors.borderThin,
        paddingVertical: 10,
        paddingHorizontal: 15,


    }
})

