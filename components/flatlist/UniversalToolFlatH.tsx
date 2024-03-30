import React, {memo, ReactNode, useCallback} from "react";
import {View, FlatList} from "react-native";
import {DefaultText} from "../text/DefaultText";
import MotherAppIcon from "../buttons/mother/MotherAppIcon";
import {AppTypes} from "../../screens/tools/ToolsMain";
import {AllServices} from "../../AppHooks/ServicesHooks/useAllServices";
import {windowWidth} from "../../screens/chat/chatStyles";

interface ToolFlat {
  data: AllServices[];
}

const UniversalToolFlatH: React.FC<ToolFlat> = (
  {
    data
  }
) => {

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: 300,
    offset: 300 * index,
    index,
  }), []);

  const CategorySection = useCallback((categoryItem: AppTypes[]):ReactNode => {
    return categoryItem.map((item) => {
      return(
        <MotherAppIcon
          item={item}
          key={item.name}
        />
      )
    })
  }, [data]);

  return(
    <View>
      <FlatList
        style={{width: windowWidth}}
        data={data}
        renderItem={
          (
            { item, index }
          ) =>
            <View style={{flexDirection: "column", marginTop: 20}}>
              <DefaultText moreStyles={{fontSize: 20}} text={item.label} />
              <View style={{width: windowWidth, flexWrap: 'wrap', flexDirection: "row" }} key={index}>
                {
                  CategorySection(item.data)
                }
              </View>
            </View>
        }
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{justifyContent: "flex-start", alignItems: "flex-start"}}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={true}
      />
    </View>
  );
}

export default memo(UniversalToolFlatH);
