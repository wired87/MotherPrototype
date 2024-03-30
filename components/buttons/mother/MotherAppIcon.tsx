import React, {memo, useCallback, useContext} from "react";
import {Switch, View, Image} from "react-native";

import {AppTypes} from "../../../screens/tools/ToolsMain";
import {appIconStyles as ais} from "./motherButtonStyles";

// ICONS
import Icon from "react-native-vector-icons/FontAwesome6";
import AntIcon  from "react-native-vector-icons/AntDesign"
import MatIcon  from "react-native-vector-icons/MaterialCommunityIcons"
import IonIcon  from "react-native-vector-icons/Ionicons"
import {ThemeContext} from "../../../screens/Context";


interface AppIconTypes {
  item: AppTypes;
}

const AppIcon: React.FC<AppIconTypes> = (
  {
    item,
  }
) => {

  const { customTheme } = useContext(ThemeContext);

  const containerStyles = [
    ais.appIcon, ais.justifyAlignCenter, {
    backgroundColor: item.bgColor,
      borderRadius: 20,

    }];

  const itemMedia = useCallback(() => {
    if (item.icon) {
      if (item.icon === "message1") {
        return(
          <AntIcon name={item.icon} size={30} color={item.color} />
        )
      }else if (item.icon === "microsoft-outlook") {
        return(
          <MatIcon name={item.icon} size={30} color={item.color} />
        )
      }else if (item.icon === "logo-venmo") {
        return(
          <IonIcon name={item.icon} size={30} color={item.color} />
        )
      }
      return <Icon name={item.icon} size={30} color={item.color} />
    }else if (item.image) {
      return(
        <Image style={{ maxHeight: 50, width: 70, resizeMode: "contain"}} source={item.image} />
      )
    }
  }, [item, item.image, item.icon]);

  return(
    <View style={containerStyles}>
      {
        itemMedia()
      }
      <Switch
        style={{zIndex: 10}}
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