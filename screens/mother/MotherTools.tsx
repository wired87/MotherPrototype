import {FlatList, View} from "react-native";
import React, {memo} from "react";
import MotherAppIcon from "../../components/buttons/mother/MotherAppIcon";
import {motherMainStyles as mms} from "./styles";

export interface AppTypes {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  screen: string;
}


const apps: AppTypes[] = [
  {
    name: "gmail",
    icon: "gmail",
    color: "red",
    bgColor: "blue",
    screen: "EmailAuthScreen",
  },
]


const MotherTools: React.FC = () => {

  const mainContainerStyles: object[] = [mms.flexColumn, mms.marginVer50, mms.flex, mms.justifyAlignCenter];

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

export default memo(MotherTools);