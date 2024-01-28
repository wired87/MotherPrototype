import React, {memo, useCallback} from "react";
import {DocumentPickerResult} from "expo-document-picker";
import {View, Text, Image} from "react-native";
import {styles} from "./contiStyles";
import {toolStyles} from "../../screens/tools/toolStyles";

interface FilePreviewTypes {
  document: DocumentPickerResult | undefined;
}



const FilePreviewContainer: React.FC<FilePreviewTypes> = (
  {
    document
  }
) => {

  const docExists = document?.assets?.[0]

  const getFinalContainerStyles = useCallback((color: string) => {
    return [styles.messageContainerImage, toolStyles.justifyAlign, {backgroundColor: color}]
  }, []);
  const textStyle: object = {color: "white", fontFamily: "JetBrainsMono"}
  if (docExists?.mimeType === "application/pdf"){
    return(
      <View style={getFinalContainerStyles("red")}>
        <Text style={textStyle}>PDF</Text>
      </View>
    );
  }else if (docExists?.mimeType === "application/msword"){
    return(
      <View style={getFinalContainerStyles("blue")}>
        <Text style={textStyle}>Word</Text>
      </View>
    );
  }else if (docExists?.mimeType === "text/plain") {
    return (
      <View style={getFinalContainerStyles("grey")}>
        <Text style={textStyle}>.txt</Text>
      </View>
    );
  }else if (docExists?.mimeType?.includes("image")){
    return(
      <Image style={styles.messageContainerImage} source={{uri: docExists.uri}} />
    );
  }else{
    return(
      <View style={getFinalContainerStyles("grey")}>
        <Text>Doc</Text>
      </View>
    );
  }
}

export default memo(FilePreviewContainer);

