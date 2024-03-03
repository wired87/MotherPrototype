import {StyleSheet} from "react-native";
import {windowHeight, windowWidth} from "../../screens/chat/chatStyles";

export const styles = StyleSheet.create({
    errorText: {
        textAlign: 'center',
        fontFamily: "JetBrainsMono",
        marginVertical: 40,
        lineHeight: 25,
        fontSize: 18,
    },
    redirectLogin: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#01152a',
        paddingVertical: 7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        textAlign: 'center',
        backgroundColor:  '#01152a',
        color: '#fff',
        marginBottom: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },


    lottieAnimationViewContainer: {
        width: 200,

    },
    lottie: {
        width: 100,
    },
    main: {
        flex: 1,
    },
    justifyAlignStart: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    fullWidthHeight: {
      width: windowWidth,
      height: windowHeight
    },

    justifyAlignCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
    justifyAlignStartCenter: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    marginTop5: {
        marginTop: 50
    },
    modalHeadingText: {
        fontFamily: "JetBrainsMono",
        fontSize: 22,
        textAlign: "center"
    }



})