import React, {memo, useContext} from "react";
import {toolStyles as ts} from "../../screens/tools/toolStyles";
import {ActivityIndicator, View} from "react-native";
import {ThemeContext} from "../../screens/Context";

const ToolIndicator: React.FC = () => {
  const { customTheme} = useContext(ThemeContext);

  return(
    <View style={[ts.justifyAlign, ts.marginV]}>
      <ActivityIndicator size={60} color={customTheme.text} />
    </View>
  );
}

export default memo(ToolIndicator);