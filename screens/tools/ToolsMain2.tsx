import MasonryList from '@react-native-seoul/masonry-list';
import { LinearGradient } from 'expo-linear-gradient';
import React, {useState, useMemo, useCallback, memo} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable, StyleProp, ViewStyle} from 'react-native';
import ToolItemButton from "../../components/buttons/toolBtn";
import {DefaultText} from "../../components/text/DefaultText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";

interface DataItem {
  //id: string;
  btn: React.ReactElement;
  text: string;
}
interface ListElement {
  data: (color: string, text: string) => DataItem[]
}

const listElement: ListElement = useMemo(() => {
  return {
    data: (color: string, text: string) => [
      {
        btn: <ToolItemButton colors={[color, 'transparent']} randomBool={true} />,
        text: text,
      },
    ],
  };
}, []);



// Carousel List
interface CarouselDataTypes {
  text: string;
  icon: string;
  url: string;
}

const carouselData: CarouselDataTypes[] =
[
  {
    text: "Example01",
    icon: "Example01",
    url: "https://example.com/01"
  },
  {
    text: "Example01",
    icon: "Example01",
    url: "https://example.com/01"
  },
  {
    text: "Example01",
    icon: "Example01",
    url: "https://example.com/01"
  },
  {
    text: "Example01",
    icon: "Example01",
    url: "https://example.com/01"
  },
  {
    text: "Example01",
    icon: "Example01",
    url: "https://example.com/01"
  },
  {
    text: "Example01",
    icon: "Example01",
    url: "https://example.com/01"
  },

]




// SINGLE TOOLS LISTS
const businessButtonList = useMemo(() => {
  return(
    [
      listElement.data("pink", "Resume creator"),
      listElement.data("yellow", "Document Editor"),
    ]
  )
}, [])

const creativeButtonList = useMemo(() => {
  return(
    [
      listElement.data("red", 'Text-To-Speech'),
      listElement.data("blue", 'Idea finder'),
      listElement.data("violet", "Image editor"),
    ]
  )
}, [])

const lifeButtonList = useMemo(() => {
  return(
    [
      listElement.data("green", 'Moviefinder'),
      listElement.data("white", "Chat"),
      listElement.data("orange", "Image explanation"),
    ]
  )
}, [])


const getItemLayout = useCallback((_: any, index: number) => ({
  length: 300,
  offset: 300 * index,
  index,
}), []);


interface ToolItemProps {
  item: DataItem;
  index: number | string;
}

const ToolItem: React.FC<ToolItemProps> = ({ item, index }) => {
  return (
    <View key={index} style={{ marginTop: 12, flex: 1 }}>
      {item.btn}
    </View>
  );
};

interface ListElement {
  data: (color: string, text: string) => DataItem[]
}

const CarouselDataComponent: React.FC<CarouselDataTypes> = React.memo(({ url, text, icon }) => (
  <Pressable style={styles.item} onPress={() => Linking.openURL(url)}>
    <DefaultText text={text}/>
    <MaterialCommunityIcons name={icon} color={"white"}/>
  </Pressable>
));

const ToolsMain = () => {
  const [category, setCategory] = useState(1);

  // styles
  const masonryStyles: StyleProp<ViewStyle> = { paddingHorizontal: 20, alignSelf: 'stretch', padding: 10 };
  const extraFlatListStyles: StyleProp<ViewStyle> = { justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }

  const handleCategoryChange = useCallback((newCategory: React.SetStateAction<number>) => {
    setCategory(newCategory);
  }, []);



  const items = [
    { key: '1', title: 'Assistant', onPress: () => handleCategoryChange(1) },
    { key: '2', title: 'Business', onPress: () => handleCategoryChange(2) },
    { key: '3', title: 'Creative', onPress: () => handleCategoryChange(3) },
  ];

  const renderItem = ( item: any) => (
    <Pressable onPress={item.onPress} style={styles.categoryButton}>
      <View style={styles.pressableView}>
        <LinearGradient
          colors={['rgba(211, 215, 222, .2)', 'rgba(0,0,0,.5)']}
          style={styles.categoryButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.85 }}
        >
          <Text style={styles.categoryButtonText}>{item?.title}</Text>
        </LinearGradient>
      </View>
    </Pressable>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  const categoryContent = useMemo(() => {
    const data =
      category === 1 ? lifeButtonList :
        category === 2 ? creativeButtonList :
          businessButtonList; // Stellen Sie sicher, dass diese Listen definiert und vom Typ DataItem[] sind

    return (
      <MasonryList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={masonryStyles}
        numColumns={2}
        renderItem={({ item, i }) => <ToolItem item={item as DataItem} index={i} />}
      />
    );
  }, [category])


  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={carouselData}
          renderItem={({ item }) => <CarouselDataComponent icon={item.icon} text={item.text} url={item.url}/>}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          contentContainerStyle={extraFlatListStyles}
          initialScrollIndex={1}
          getItemLayout={getItemLayout}
        />
      </View>
      <View style={styles.categoryList}>
        <Text style={styles.categoryText}> CATEGORY LIST:</Text>
      </View>
      <View style={styles.categoryFlatlist}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal={true}
          contentContainerStyle={styles.categoryListContainer}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
      {categoryContent}
    </View>
  );
};

export default memo(ToolsMain);
















const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListContainer: {
        marginTop: 40,
    },
    item: {
        padding: 5,
        marginHorizontal: 1,
    },
    image: {
        width: 200,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 30,
    },
    categoryButton: {
        padding: 7,
        borderRadius: 15,
        flexDirection: 'column',
    },
    categoryButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',

    },
    categoryListContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 10,

    },
    categoryText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    categoryList: {
        marginTop: 20,
        paddingHorizontal: 18,
    },
    pressableView: {
        backgroundColor: "black",
        borderRadius: 15,


    },
    categoryFlatlist: {
        display: "flex",
        alignItems: "center",

    },
    separator: {
        width: 10,
    },

});