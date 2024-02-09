import {View} from "react-native";
import {StyleProps} from "react-native-reanimated";
import React, {memo, ReactNode} from "react";

interface DefaultContainerTypes {
    extraStyles?: StyleProps;
    children?: ReactNode;
}

const DefaultContainer: React.FC<DefaultContainerTypes> = (
  {
      extraStyles,
      children
  }
) => {
    return(
        <View style={[extraStyles? extraStyles : undefined, {flex: 1, justifyContent: "center", alignItems: "center"}]}>
            {children}
        </View>
    );
}
export default memo(DefaultContainer);