import {Dimensions, StyleSheet} from "react-native";
const windowWidth = Dimensions.get('window').width;
export const toolStyles = StyleSheet.create(
  {
    redordButton: {},
    input: {
      paddingVertical: 12,
      justifyContent: "flex-start",
      textAlign: "justify",
      textAlignVertical: "top",
      paddingRight: 15,
    },
    postBUttoneMovie: {
      paddingVertical: 17,
    },
    speechToTextMainContainer: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 30,
    },
    heading: {
      fontSize: 20,
      fontFamily: "JetBrainsMono",
      textAlign: "center",
      marginHorizontal: 20,
      marginVertical: 30
    },
    transcriptContainer: {
      marginTop: 20,
      padding: 0,
      position: "relative",
    },
    copyButton: {
      position: "absolute",
      right: 2,
      bottom: -2,
      padding:0,
    },
    clearButton: {
      position: "absolute",
      right: 2,
      top: 5,
    },
    shareButton: {
      position: "absolute",
      right: 2,
      bottom: 0,
    },
    loadingStyle: {
      backgroundColor: "transparent",
      width: windowWidth * .9,
      height: 10,
      borderRadius: 15,
    },
    downloadPDFButton: {
      width: 250,
      paddingVertical: 5,
      marginVertical: 20,
    },
    pageScrollView: {
      height: 300,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 30,
      width: windowWidth
    },
    flex: {
      flex: 1,
      padding: 0,
      margin: 0,
    },
    justifyAlign: {
      justifyContent: "center",
      alignItems: "center",
    },
    marginV: {
      marginVertical: 30,
    },
    resumeInput: {
      borderWidth: 1
    },
    errorTextHeading: {
      textAlign: "center",
      fontFamily: "JetBrainsMono",
      fontSize: 22,
      marginBottom: 15,
    },
    errorTextMessage: {
      lineHeight: 60,
      textAlign: "center",
      fontFamily: "JetBrainsMono",
      fontSize: 15,
      zIndex: 50,
    },
    errorLinkingButton: {
      bottom: 0,
    },
    contactLinkingButton: {
      bottom: 20,
    },
    modalToolErrorContainer: {
      marginTop: 30,
      height: 350,
      flexDirection: "column",
      alignItems: "center",
    },
    errorLottieView: {
      height: 100,
      width: 100,
    },

    mV: {
      marginVertical: 10
    },
    main: {
      flex: 1,
      paddingTop: 30,
    },
  contentContainerMovie: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

    flatListContainer: {
      marginTop: 20,
    },

    item: {
      width: 200,
      height: 120,
      borderRadius: 14,
      marginHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
    },

    categoryButton: {
      width: 110,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 22,

    },

    categoryButtonText: {
      fontSize: 15,
      marginVertical: 5,
    },
    text: {
      textAlign: "center",
    },

    categoryListContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      marginBottom: 10,
    },

    categoryText: {
      fontSize: 20,
      fontWeight: 'bold',
    },

    categoryList: {
      marginVertical: 20,
      paddingHorizontal: 18,
    },

    pressableView: {
      backgroundColor: "black",
      borderRadius: 15,
    },

    masonryList: {
      flex: 1,
      paddingBottom: 50,
    },

    affiliateImage: {
      position: "absolute",
      width: "80%",
      height: "20%",
      bottom: 30,
    },
    affiliateText: {
      textAlign: "center",
      position: "absolute",
      top: 10,
      fontSize: 16,
      marginHorizontal: 5,
      fontFamily: "JetBrainsMono",
      color: "white"
    },
    affiliateLineargradient: {
      width: "100%",
      height: "100%",
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center"
    },
    resultContainer: {
      flexDirection: "column",
      paddingVertical: 20,
      paddingHorizontal: 10,
      width: windowWidth,
      justifyContent: "center",
      alignItems: "center",
      minHeight: 300,
    },
    defaultLottieContainer: {
      marginTop: 0,
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 100,
    },
    lottie: {
      position: "relative",
      width: 200
    },

  }
)
