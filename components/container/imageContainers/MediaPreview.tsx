import React, {memo, ReactNode, useContext} from "react";
import {styles} from "../contiStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {View} from "react-native";
import {MediaContext, ThemeContext} from "../../../screens/Context";

interface ImagePreviewTypes {
  children: ReactNode
}

const MediaPreview: React.FC<ImagePreviewTypes> = (
  {
    children
  }
) => {

  const {customTheme} = useContext(ThemeContext);
  const {updateDoc, updatePickedImage} = useContext(MediaContext)
  const color:string = customTheme.text
  const iconStyles: object[] = [styles.singleImageClearIcon, {borderColor: color}];

  const updateMedia = () => {
    updateDoc(undefined);
    updatePickedImage(undefined);
  }


  return(
    <View style={styles.singleImageMessageContainer}>
      <MaterialCommunityIcons
        color={color}
        style={iconStyles}
        name={"close"}
        size={20}
        onPress={updateMedia}
      />
      {
        children
      }
    </View>
  );
}

export default memo(MediaPreview);