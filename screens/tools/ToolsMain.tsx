import {ImageProps, SwitchChangeEvent, View} from "react-native";
import React, {memo, useContext} from "react";
import {motherMainStyles as mms} from "../mother/styles";
import {ThemeContext} from "../Context";
import UniversalToolFlatH from "../../components/flatlist/UniversalToolFlatH";
import {useAllServices} from "../../AppHooks/ServicesHooks/useAllServices";


export interface AppTypes {
  name: string;
  icon?: string;
  image?: ImageProps | Readonly<ImageProps>;
  color: string;
  bgColor: string;
  screen: string;
  unlocked: boolean | undefined;
  onSwitch: ((event: SwitchChangeEvent) => void | Promise<void>);
}




const ToolsMain: React.FC = () => {
  const {customTheme} = useContext(ThemeContext);

  const { allServices } = useAllServices();

  const mainContainerStyles: object[] =
    [mms.flexColumn, mms.flex, {marginTop:49,flexGrow: 1,  backgroundColor: customTheme.primary}];


  return(
    <View style={mainContainerStyles}>
      <UniversalToolFlatH
        data={allServices()}
      />
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