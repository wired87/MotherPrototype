import {FlatList} from "react-native";
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
    screen: "GmailScreen",
  },
]


const MotherTools: React.FC = () => {
  return(
    <FlatList
      numColumns={4}
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
  );
}

export default memo(MotherTools);