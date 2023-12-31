import {memo} from "react";
import {IconButton} from "react-native-paper";

const PdfDownloadButton = () => {
  return(
    <IconButton  icon={"download"}/>
  );
}

export default memo(PdfDownloadButton);