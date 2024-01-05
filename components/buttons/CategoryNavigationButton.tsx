import React, {Dispatch, memo, SetStateAction, useContext} from "react";
import {ThemeContext} from "../../screens/Context";
import {Pressable, StyleProp, Text, TextStyle, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {toolStyles as styles} from "../../screens/tools/toolStyles";


interface CategoryTypes {
  key: string
  title: string,
  onPress: () => void
}


const CategoryButton:
  React.FC<{ item: CategoryTypes; selected: boolean; setSelectedItem: Dispatch<SetStateAction<string | null>>; }> =
  memo(({ item, selected, setSelectedItem }
  ) => {
    const { customTheme } = useContext(ThemeContext);

    const pressableStyles =
      [
        styles.categoryButton,
        {  shadowColor: customTheme.text,
          paddingVertical: 7,
          paddingHorizontal: 10,
        },
      ]

    const handlePress = () => {
      setSelectedItem(item.key.toString());
      item.onPress();
    }
    const textColor = selected? customTheme.text : "white"
    const linearColor = selected? customTheme.categoryButton : customTheme.primaryButton;
    const bothColors = selected? ["transparent", "transparent"] : [linearColor, customTheme.primaryButton];
    const categoryTextStyles: StyleProp<TextStyle> = [styles.categoryButtonText, {
      color: textColor,
      fontWeight: "500"
    }]

    return(
      <Pressable onPress={handlePress} style={[styles.categoryButton, ]}>
        <View style={[styles.categoryButton, {backgroundColor: customTheme.primary}]}>
          <LinearGradient
            colors={bothColors}
            style={pressableStyles}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0.85}}>
            <Text style={categoryTextStyles}>
              {item?.title}
            </Text>
          </LinearGradient>
        </View>
      </Pressable>
    )
  });

export default memo(CategoryButton);