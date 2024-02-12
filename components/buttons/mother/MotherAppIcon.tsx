import React, {memo} from "react";
import {Pressable} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {useNavigation} from "@react-navigation/native";
import {AppTypes} from "../../../screens/mother/MotherTools";
import {appIconStyles as ais} from "./motherButtonStyles";
import {DefaultText} from "../../text/DefaultText";

interface AppIconTypes {
  item: AppTypes
}


const AppIcon: React.FC<AppIconTypes> = (
  {
    item
  }
) => {

  const containerStyles = [
    ais.appIcon, ais.justifyAlignCenter, {
    backgroundColor: "transparent"
  }];

  const navigation = useNavigation()

  const navigate = () => {
    // @ts-ignore
    navigation.navigate("MotherNavigator", {screen: item.screen});
  }

  return(
    <Pressable
      style={containerStyles}
      onPress={() => navigate()}>
      <MaterialCommunityIcons
        size={30}
        color={item.color}
        name={item.icon}
      />
      <DefaultText text={item.name}/>
    </Pressable>
  );
}

export default memo(AppIcon);