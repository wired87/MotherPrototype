import React, {memo, useCallback, useContext} from "react";
import {toolStyles as ts} from "../../screens/tools/toolStyles";
import * as Clipboard from "expo-clipboard";
import {ThemeContext} from "../../screens/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// STRINGS
const copy = "content-copy";

interface CopyButtonTypes {
  value: string;
  size?: number
}


const CopyButton: React.FC<CopyButtonTypes> = (
  {
    value,
    size
  }
) => {
  //  CONTEXT
  const { customTheme } = useContext(ThemeContext);

  // STYLES
  const copyButtonColor = customTheme.text;


  const handleCopyClick = useCallback(async () => {
    await Clipboard.setStringAsync(value);
  }, [value]);

  return(
    <MaterialCommunityIcons
      size={size || 20}
      color={copyButtonColor}
      style={ts.copyButton}
      onPress={handleCopyClick}
      name={copy}
    />
  );
}

export default memo(CopyButton);