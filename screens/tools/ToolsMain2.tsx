import MasonryList from '@react-native-seoul/masonry-list';
import {LinearGradient} from 'expo-linear-gradient';
import React, {Dispatch, memo, SetStateAction, useCallback, useContext, useMemo, useState} from 'react';
import {FlatList, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle, Image} from 'react-native';
import ToolItemButton from "../../components/buttons/ToolitemButton";
import {DefaultText} from "../../components/text/DefaultText";
import * as Linking from "expo-linking";
import {ThemeContext} from "../Context";
import {LINKMINK_AFFILIATE_URL, NEURONWRITER_AFFILIATE_LINK, ORIGIBNALITY_AFFILITE_UTR} from "@env";

//Affiliate Images
import neuronNoBg from "../../assets/affiliateImages/neuronNoBg.png";
import originalityNoBg from "../../assets/affiliateImages/originalityNoBg.png";
import linkMinkNoBg from "../../assets/affiliateImages/linkMinkNoBg.png";

// INTERFACE
interface CarouselDataTypes {
  text: string,
  image: any,
  backgroundColor: string,
  url: string,
}

interface DataItem {
  text: string,
  color: string,
  icon: string,
  navigation: string,
  extraText?: string,
}


interface CategoryTypes {
  key: string
  title: string,
  onPress: () => void
}



const carouselData: CarouselDataTypes[] =
[
  {
    text: "Optimize your Website content",
    image: neuronNoBg,
    backgroundColor: "rgb(76,60,239)",
    url: NEURONWRITER_AFFILIATE_LINK
  },
  {
    text: "Check your AI content",
    image: originalityNoBg,
    backgroundColor: "rgb(43,33,84)",
    url: ORIGIBNALITY_AFFILITE_UTR
  },
  {
    text: "Grow Your SaaS Revenue",
    image: linkMinkNoBg,
    backgroundColor: "rgb(85,194,191)",
    url: LINKMINK_AFFILIATE_URL
  },
]
/*
{
    text: "Example01",
    image: {},
    backgroundColor: "",
    url: "https://example.com/01"
  },
  {
    text: "Example01",
    image: {},
    backgroundColor: "",
    url: "https://example.com/01"
  },
  {
    text: "Example01",
    image: {},
    backgroundColor: "",
    url: "https://example.com/01"
  },
 */

const businessButtonList: DataItem[] = [
  {
    text: "Resume creator",
    color: "rgba(29,152,189,0.4)",
    icon: "format-float-left",
    navigation: "ChatNavigator",
    extraText: undefined
  },
  {
    text: "Document Editor",
    color: "rgba(255,255,0,.4)",
    icon: "sticker-text-outline",
    navigation: "ChatNavigator",
    extraText: undefined,
  }
]

const creativeButtonList: DataItem[] = [
  {
    text: 'Text-To-Speech',
    color: "rgba(110,0,0,.7)",
    icon: "text-to-speech",
    navigation: "ChatNavigator",
    extraText: undefined
  },
  {
    text: "Idea finder",
    color: "#232f44",
    icon: "lightbulb-on-outline",
    navigation: "ChatNavigator",
    extraText: undefined,
  },
  {
    text: "Image editor",
    color: 'rgba(127,0,255,0.6)',
    icon: "wallpaper",
    navigation: "ChatNavigator",
    extraText: undefined,
  }
]

const lifeButtonList: DataItem[] = [
  {
    text: "Movie/Series-\nfinder",
    color: "rgba(37,210,37,0.2)",
    icon: "television-shimmer",
    navigation: "ChatNavigator",
    extraText: undefined
  },
  {
    text: "Chat",
    icon: "comment-multiple-outline",
    navigation: "ChatNavigator",
    color: "rgba(255,255,255,.2)",
    extraText: undefined,
  },
  {
    text: "Image explanation",
    color: "rgba(255,165,0,.4)",
    icon: "tooltip-image-outline",
    navigation: "ChatNavigator",
    extraText: undefined,
  }
]

interface ToolItemProps {
  item: DataItem;
  index: number | string;

}

const ToolItem: React.FC<ToolItemProps> = ({ item, index}) => {
  return (
    <View key={index}>
      <ToolItemButton text={item.text} color={item.color} extraText={item.extraText} icon={item.icon}/>
    </View>
  );
};

const CategoryButton:
  React.FC<{ item: CategoryTypes; selected: boolean; setSelectedItem: Dispatch<SetStateAction<string | null>>; }> =
  memo(({ item, selected, setSelectedItem }
  ) => {


  const { customTheme } = useContext(ThemeContext);

  const pressableStyles =
    [
      styles.categoryButton,
      {  shadowColor: customTheme.text, paddingVertical: 7, paddingHorizontal: 10 },
    ]

  const handlePress = () => {
    setSelectedItem(item.key.toString());
    item.onPress();
  }

  const linearColor = selected? customTheme.categoryButton : customTheme.primaryButton;

  return(
    <Pressable onPress={handlePress} style={[styles.categoryButton, ]}>
      <View style={[styles.categoryButton, {backgroundColor: customTheme.primary}]}>
        <LinearGradient
          colors={[linearColor, 'rgba(0,0,0,.5)']}
          style={pressableStyles}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.85}}>
          <Text style={styles.categoryButtonText}>
            {item?.title}
          </Text>
        </LinearGradient>
      </View>
    </Pressable>
  )
});



const ToolsMain = () => {
  const [category, setCategory] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // CONTEXT
  const { customTheme } = useContext(ThemeContext);

  // styles
  const masonryStyles: StyleProp<ViewStyle> = { paddingHorizontal: 0, alignSelf: 'stretch', padding: 10 };
  const extraFlatListStyles: StyleProp<ViewStyle> = { justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }

  const mainContainer = [styles.main, {backgroundColor: customTheme.primary}]

  const handleCategoryChange = useCallback((newCategory: React.SetStateAction<number>) => {
    setCategory(newCategory);
  }, []);

  const items: CategoryTypes[] = [
    { key: "1", title: 'Assistant', onPress: () => handleCategoryChange(1) },
    { key: "2", title: 'Business', onPress: () => handleCategoryChange(2) },
    { key: "3", title: 'Creative', onPress: () => handleCategoryChange(3) },
  ];

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: 300,
    offset: 300 * index,
    index,
  }), []);

  const CarouselDataComponent: React.FC<{ item: CarouselDataTypes }> = useCallback(({item}) => {

    const carouselContainer =
      [styles.item, {backgroundColor: item.backgroundColor}]

    return <Pressable style={carouselContainer} onPress={() => Linking.openURL(item.url)}>
              <LinearGradient
                style={styles.affiliateLineargradient}
                colors={[item.backgroundColor, "black"]}
                start={{ x: 0, y: 0 }}
                end={{ x: .1, y: .8 }}>
                <DefaultText text={item.text} moreStyles={styles.affiliateText} />
                <Image source={item.image} style={styles.affiliateImage}/>
              </LinearGradient>
          </Pressable>

  }, []);


  const categoryContent = useMemo(() => {
    const data =
      category === 1 ? lifeButtonList :
        category === 2 ? creativeButtonList :
          businessButtonList;

    return (
      <MasonryList
        style={styles.masonryList}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={masonryStyles}
        numColumns={2}
        renderItem={({ item, i }) =>
          <ToolItem item={item as DataItem} index={i} />}
      />
    );
  }, [category])


  return (
    <View style={mainContainer}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={carouselData}
          renderItem={
            (
              { item }
            ) => <CarouselDataComponent item={item}/>
          }
          keyExtractor={(_, index) => index.toString()}
          horizontal
          contentContainerStyle={extraFlatListStyles}
          initialScrollIndex={0}
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.categoryList}>
        <Text style={styles.categoryText}>Categories</Text>
      </View>

      <View style={{overflow: "visible"}}>
        <FlatList
          style={{overflow: "visible", paddingHorizontal: 10}}
          data={items}
          initialScrollIndex={0}
          horizontal
          renderItem={
            (
              { item }
            ) => <CategoryButton
                    item={item}
                    selected={selectedItem === item.key.toString()}
                    setSelectedItem={setSelectedItem}
                  />
          }
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={
            () => <View style={{width: 10}}/>
          }
          keyExtractor={
            (_, index) => index.toString()
          }
        />
      </View>

      {categoryContent}

    </View>
  );
};

export default memo(ToolsMain);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  flatListContainer: {
    marginTop: 40,
  },

  item: {
    width: 200,
    height: 120,
    borderRadius: 14,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  categoryButton: {
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22

  },

  categoryButtonText: {
    fontSize: 15,
    marginVertical: 5,
    color: 'white',
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

  masonryList: {
    flex: 1,
  },

  affiliateImage: {
    position: "absolute",
    width: "90%",
    height: "20%",
    bottom: 30,
  },
  affiliateText: {
    textAlign: "center",
    position: "absolute",
    top: 10,
    fontSize: 16,
    marginHorizontal: 5,
    fontFamily: "JetBrainsMono"
  },
  affiliateLineargradient: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  }
});