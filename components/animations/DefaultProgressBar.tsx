import React, {memo, useContext} from "react";
import {ProgressBar} from "react-native-paper";
import {ThemeContext} from "../../screens/Context";
import {toolStyles as ts} from "../../screens/tools/toolStyles";
interface CustomTypes {
  loading: boolean;
}


const DefaultProgressBar: React.FC<CustomTypes>  = (
  {
    loading
  }
) => {
  const {customTheme} = useContext(ThemeContext);

  const loadingStyle = [
    ts.loadingStyle, {
      marginVertical: loading ? 10 : 0
    }
  ];

  return (
    <ProgressBar
      progress={.5}
      color={customTheme.primaryButton}
      style={loadingStyle}
      indeterminate={true}
      visible={loading}
    />
  );
}


export default memo(DefaultProgressBar);