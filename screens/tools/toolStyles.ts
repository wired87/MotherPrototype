import {Dimensions, StyleSheet} from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const toolStyles = StyleSheet.create(
  {
    redordButton: {

    },
    input: {
      minHeight: 200,
      paddingVertical: 10,
      paddingHorizontal: 5,
      justifyContent: "flex-start",
      textAlign: "justify",
      textAlignVertical: "top",
      paddingRight: 20,
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
      padding: 0,
      position: "relative",
    },
    copyButton: {
      position: "absolute",
      right: 2,
      top: 2,
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
      alignItems: "center"
    },
    resumeInput: {
      borderWidth: 1
    }
  }
)