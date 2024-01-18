import MasonryList from '@react-native-seoul/masonry-list';
import {LinearGradient} from 'expo-linear-gradient';
import React, {memo, useCallback, useContext, useMemo, useState} from 'react';
import {FlatList, Pressable, StyleProp, Text, View, ViewStyle, Image, Linking} from 'react-native';
import ToolItemButton from "../../components/buttons/ToolitemButton";
import {ThemeContext} from "../Context";
import {DEEP_SWAP_AFFILIATE_URL, NEURONWRITER_AFFILIATE_LINK, ORIGIBNALITY_AFFILITE_UTR} from "@env";
import {toolStyles as styles} from "./toolStyles";

//Affiliate Images
import neuronNoBg from "../../assets/affiliateImages/neuronNoBg.png";
import originalityNoBg from "../../assets/affiliateImages/originalityNoBg.png";
import ds_noBg from "../../assets/affiliateImages/ds_noBg.png";
import CategoryButton from "../../components/buttons/CategoryNavigationButton";

//////////////////////////////////////// IN APP RECENSION BUILD IN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
  screen: string,
}


interface CategoryTypes {
  key: string
  title: string,
  onPress: () => void
}

const carouselData: CarouselDataTypes[] =
[
  {
    text: "Advanced Deep \nFakes",
    image: ds_noBg,
    backgroundColor: "rgb(0,0,0)",
    url: DEEP_SWAP_AFFILIATE_URL
  },
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
]


const businessButtonList: DataItem[] = [
  {
    text: "Product Text writer",
    color: "rgb(49,239,0)",
    icon: "sticker-text-outline",
    navigation: "ChatNavigator",
    extraText: "Create Slogans, product Descriptions,...",
    screen: "ProductWriter"
  },
  {
    text: "Idea finder",
    color: "#eed919",
    icon: "lightbulb-on-outline",
    navigation: "ChatNavigator",
    extraText: "Share your ideas for feedback or create some for your next Business",
    screen: "IdeaFinder"
  },
  {
    text: "Resume creator",
    color: "rgb(0,103,239)",
    icon: "format-float-left",
    navigation: "ChatNavigator",
    extraText: "AI job Application writer",
    screen: "ResumeCreator"
  },
  {
    text: "E-Mail \nwriter",
    color: "rgb(229,94,0)",
    icon: "gmail",
    navigation: "ChatNavigator",
    extraText: "Professional Email writer",
    screen: "EmailWriter"
  },
];

// grau settings weg
// font umstellen
// weiße linie settings item

const creativeButtonList: DataItem[] = [
  {
    text: 'Speech-to- Text',
    color: "rgb(178,8,8)",
    icon: "text-to-speech",
    navigation: "ChatNavigator",
    extraText: "Transcribe your thoughts",
    screen: "Speech-to-Text"
  },
  {
    text: 'Card writer',
    color: "rgb(12,170,225)",
    icon: "map-outline",
    navigation: "ChatNavigator",
    extraText: "Create greeting Cards for Birthday, Christmas,...",
    screen: "CardWriter"
  },
  {
    text: "Story writer",
    color: "rgb(245,85,29)",
    icon: "book-open-page-variant",
    navigation: "ChatNavigator",
    extraText: "Write the next best seller...",
    screen: "StoryWriter"
  },
  {
    text: "Lyric writer",
    color: "rgb(158,25,245)",
    icon: "cellphone-text",
    navigation: "ChatNavigator",
    extraText: "Create Lyrics for every Music genre",
    screen: "LyricWriter"
  },
]

const lifeButtonList: DataItem[] = [
  {
    text: "Movie/Series-\nfinder",
    color: "#c72e2e",
    icon: "television-shimmer",
    navigation: "ChatNavigator",
    extraText: "Find the best Movie for your Movie night",
    screen: "MovieFinder"
  },
  {
    text: "Chat",
    icon: "comment-multiple-outline",
    navigation: "ChatNavigator",
    color: "rgb(255,255,255)",
    extraText: "Keep yourself informed!",
    screen: "ChatMain"
  },
  {
    text: "Fitness Assistant",
    icon: "food-apple",
    navigation: "ChatNavigator",
    color: "rgb(0,255,4)",
    extraText: "Create Free Diet or training plans",
    screen: "FitnessWriter"
  },
  {
    text: "Chat response helper",
    color: "rgb(148,184,234)",
    icon: "tooltip-image-outline",
    navigation: "ChatNavigator",
    extraText: "Dont know how to answer to an Text Message? Our Model does!",
    screen: "ChatResponseHelper"
  }
]

interface ToolItemProps {
  item: DataItem;
  index: number | string;
}

const ToolItem: React.FC<ToolItemProps> = ({ item, index}) => {
  return (
    <View key={index}>
      <ToolItemButton text={item.text} color={item.color} extraText={item.extraText} icon={item.icon} navigationScreen={item.screen}/>
    </View>
  );
};



const ToolsMain: React.FC = () => {
  const [category, setCategory] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // CONTEXT
  const { customTheme } = useContext(ThemeContext);

  // styles
  const masonryStyles: StyleProp<ViewStyle> = { paddingHorizontal: 0, alignSelf: 'stretch', padding: 10 };
  const extraFlatListStyles: StyleProp<ViewStyle> = { justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }
  const categoryTextStyles = [styles.categoryText, {color: customTheme.text}]
  const mainContainer = [styles.flex, {backgroundColor: customTheme.primary}]

  const handleCategoryChange = useCallback((newCategory: React.SetStateAction<number>) => {
    setCategory(newCategory);
  }, []);

  const items: CategoryTypes[] = [
    { key: "1", title: 'Assistant', onPress: () => handleCategoryChange(1) },
    { key: "2", title: 'Business', onPress: () => handleCategoryChange(2) },
    { key: "3", title: 'Creative', onPress: () => handleCategoryChange(3) },
    //{ key: "4", title: 'Partners', onPress: () => handleCategoryChange(4) },
  ];

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: 300,
    offset: 300 * index,
    index,
  }), []);

  const CarouselDataComponent: React.FC<{ item: CarouselDataTypes }> = useCallback(({item}) => {

    const carouselContainer =
      [styles.item, {backgroundColor: item.backgroundColor}];

    return <Pressable style={carouselContainer} onPress={() => Linking.openURL(item.url)}>
              <LinearGradient
                style={styles.affiliateLineargradient}
                colors={[item.backgroundColor, "black"]}
                start={{ x: 0, y: 0 }}
                end={{ x: .1, y: .8 }}>
                <Text style={styles.affiliateText} >{item.text}</Text>
                <Image source={item.image} style={styles.affiliateImage}/>
              </LinearGradient>
          </Pressable>
  }, []);


  const categoryContent = useMemo(() => {
    const data =
      category === 1 ? lifeButtonList :
        category === 2 ? creativeButtonList :
          businessButtonList


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
        <Text style={categoryTextStyles}>Categories</Text>
      </View>

      <View style={{overflow: "visible", paddingHorizontal: 15}} >
        <FlatList
          style={{overflow: "visible", paddingHorizontal: 0, paddingTop: 5, paddingBottom: 10}}
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


/*
Image editor: input a image and a string for description, send it to my backend and get a image and string as response (after user chooses an image it must me alsdo displayed in the ui)
ideafinder: for business ideas. user choose the category (tech, ......) from a Picker ("@react-native-picker/picker")
and the last one is a
 */