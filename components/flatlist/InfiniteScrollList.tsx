import {Dimensions, FlatList, View} from "react-native";
import React, {memo, useRef, useState} from "react";
import {toolStyles as ts} from "../../screens/tools/toolStyles";

const windowWidth: number = Dimensions.get('window').width;


interface InfiniteScrollingListProps {
  data: React.ReactElement;
}

const InfiniteScrollList = (
  data: any
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<React.ReactElement>>(null);

  const extendedData = [...data, ...data, ...data];

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const nextIndex = Math.floor((contentOffset + 0.5 * viewSize) / viewSize);
    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={extendedData}
      horizontal
      pagingEnabled
      onScroll={handleScroll}
      scrollEventThrottle={16}
      getItemLayout={(data, index) => ({
        length: windowWidth,
        offset: windowWidth * index,
        index
      })}
      keyExtractor={(index) => index.toString()}
      renderItem={({ item, index }) => (
        <View key={index} style={{...ts.pageScrollView}} >
          {item}
        </View>
      )}
      contentContainerStyle={ts.pageScrollView}
    />
  );
};

export default memo(InfiniteScrollList);