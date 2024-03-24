import {SwitchChangeEvent, View} from "react-native";
import React, {memo, useContext} from "react";
import {motherMainStyles as mms} from "../mother/styles";
import {ThemeContext} from "../Context";
import FeedSpot from "../../components/flatlist/FeedSpot";


export interface AppTypes {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  screen: string;
  unlocked: boolean | undefined;
  onSwitch: ((event: SwitchChangeEvent) => void | Promise<void>);
}



const ToolsMain: React.FC = () => {
  const {customTheme} = useContext(ThemeContext);

  const mainContainerStyles: object[] =
    [mms.flexColumn, mms.flex, {marginTop:49,flexGrow: 1,  backgroundColor: customTheme.primary}];


  return(
    <View style={mainContainerStyles}>
      <FeedSpot />

    </View>
  );
}

export default memo(ToolsMain);



/*
<View>
        <DefaultText text={"Services"} />
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
 */