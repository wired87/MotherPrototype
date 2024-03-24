import React, {memo} from "react";
import {Switch, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {AppTypes} from "../../../screens/tools/ToolsMain";
import {appIconStyles as ais} from "./motherButtonStyles";


interface AppIconTypes {
  item: AppTypes;
}

const AppIcon: React.FC<AppIconTypes> = (
  {
    item,
  }
) => {

  const containerStyles = [
    ais.appIcon, ais.justifyAlignCenter, {
    backgroundColor: "transparent",

    }];

  return(
    <View style={containerStyles}>
      <MaterialCommunityIcons
        size={30}
        color={item.color}
        name={item.icon}
      />
      <Switch
        thumbColor={"black"}
        value={item.unlocked}
        onChange={item.onSwitch}
      />
    </View>
  );
}

export default memo(AppIcon);

/*
<Pressable
        style={containerStyles}
        onPress={() => navigate()}>

        <DefaultText moreStyles={{textAlign: "center"}} text={item.name}/>
      </Pressable>
 */