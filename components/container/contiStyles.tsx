import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    modalH4: {
        textAlign: "center",
        fontSize: 24,
        gap: 40,
        lineHeight: 40,
    },

    messageContainer: {
      borderWidth: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
      borderRadius: 15,
      overflow: "visible",
      height: "auto",
    },
    singleImageMessageContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-end",
        padding: 0,
        backgroundColor: "transparent"
    },
    singleImageClearIcon: {
        position: "absolute",
        right: -5,
        top: -5,
        borderRadius: 20,
        borderWidth: 1
    },
    messageContainerImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginVertical: 7,
        marginHorizontal: 7
    },
    featuresContainer: {
        width: windowWidth * .85,
        borderWidth: 1,
        marginVertical: 5,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    chatMessageInput: {
        width: windowWidth * .8,
        fontFamily: "JetBrainsMono",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: "transparent",
        minHeight: 60,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 40
    },
    fill: {
        flex: 1,
        margin: 15
    },
    main: {
        backgroundColor: "transparent",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bottom: -5,
        padding: 0,


    },
    secondContainer: {
        flexDirection: "row",
        width: windowWidth,
        justifyContent: "space-between",
        marginBottom: 7,
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        width: "100%",
    },
    indicatorContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: windowWidth * .5,
        paddingLeft: 20,
        flexDirection: "row",
        gap: 10,
    },
    clearInputFiledBtn: {
        position: "absolute",
        top: 6,
        zIndex: 90,
        right: 45,
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    sendIcon: {
        transform: [{rotate: '90deg'}],
        bottom: 15
    },
    container: {
        maxHeight: 40,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
  sendIconContainer: {
      position: "absolute"
  }
})

