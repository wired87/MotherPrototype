import {memo, useCallback} from "react";
import {IconButton} from "react-native-paper";

const ChooseFileButton = () => {

  const handleUploadPress = useCallback(() => {

  }, [])


  return(
    <IconButton  icon={"upload"} onPress={handleUploadPress}/>
  );
}

export default memo(ChooseFileButton);