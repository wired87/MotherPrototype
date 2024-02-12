import {StyleSheet} from "react-native";

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
    main: {
        flex: 1,
    },
    justifyAlignStart: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },


    justifyAlignCenter: {
        justifyContent: "center",
        alignItems: "center",
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },



})