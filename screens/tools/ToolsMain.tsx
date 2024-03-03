import {FlatList, View} from "react-native";
import React, {memo, useContext} from "react";
import MotherAppIcon from "../../components/buttons/mother/MotherAppIcon";
import {motherMainStyles as mms} from "../mother/styles";
import {ThemeContext} from "../Context";

export interface AppTypes {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  screen: string;
}


const apps: AppTypes[] = [
  {
    name: "E-mail",
    icon: "email",
    color: "red",
    bgColor: "blue",
    screen: "EmailAuthScreen",
  },
  {
    name: "services",
    icon: "google",
    color: "red",
    bgColor: "blue",
    screen: "GoogleAuthScreen",
  },
]


const ToolsMain: React.FC = () => {
  const {customTheme} = useContext(ThemeContext);

  const mainContainerStyles: object[] =
    [mms.flexColumn, mms.flex, {marginTop:49,flexGrow: 1,  backgroundColor: customTheme.primary}];

  return(
    <View style={mainContainerStyles}>
      <FlatList
        numColumns={3}
        style={mms.flatList}
        keyExtractor={(_, index) => index.toString()}
        data={apps}
        renderItem={({ item }) =>
          <MotherAppIcon
            item={item}
            key={item.name}
          />
        }
      />
    </View>
  );
}

export default memo(ToolsMain);