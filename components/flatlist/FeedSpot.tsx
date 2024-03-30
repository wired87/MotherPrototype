import React, {memo, useCallback} from "react";
import {View, FlatList, StyleProp, ViewStyle} from "react-native";
import {DefaultText} from "../text/DefaultText";
import MotherAppIcon from "../buttons/mother/MotherAppIcon";
import {useFeedSpot} from "../../AppHooks/ServicesHooks/useFeedSpot";

const FeedSpot: React.FC = () => {

  const { feedSpotArray } = useFeedSpot();

  // STYLES
  const extraFlatListStyles: StyleProp<ViewStyle> = { justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: 300,
    offset: 300 * index,
    index,
  }), []);

  return(
    <View>
      <DefaultText text={"Feed spot"} />
      <FlatList
        data={feedSpotArray()}
        renderItem={
          (
            { item }
          ) =>
            <MotherAppIcon
              item={item}
              key={item.name}
            />
        }
        keyExtractor={(_, index) => index.toString()}
        horizontal
        contentContainerStyle={extraFlatListStyles}
        initialScrollIndex={0}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default memo(FeedSpot);
