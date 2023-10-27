import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    errorText: {
        textAlign: 'center',
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
    lottieAnimationView: {
        width: 200,

    },

})