import React, {memo, useCallback, useContext} from "react";
import {IconButton} from "react-native-paper";
import {toolStyles as ts} from "../../screens/tools/toolStyles";
import * as Clipboard from "expo-clipboard";
import {ThemeContext} from "../../screens/Context";

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
    <IconButton size={size || 20} iconColor={copyButtonColor} style={ts.copyButton} onPress={handleCopyClick} icon={copy} />
  );
}

export default memo(CopyButton);