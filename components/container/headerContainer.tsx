import {View} from "react-native";
import {uniStyles} from "../../screens/universalStyles";
import React, {ReactNode} from "react";
import {StyleProps} from "react-native-reanimated";


interface HeaderContainerTypes {
    children: ReactNode;
    extraStyles: StyleProps;
}
export const HeaderView: React.FC<HeaderContainerTypes> = (
  {
      children,
      extraStyles
  }

) => {

    return(
      <View style={[uniStyles.headerNavbarContainer, extraStyles? extraStyles : null]}>
          {children}
      </View>
    );
}