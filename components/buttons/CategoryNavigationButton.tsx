import React, {Dispatch, memo, SetStateAction, useContext} from "react";
import {ThemeContext} from "../../screens/Context";
import {Pressable, StyleProp, Text, TextStyle} from "react-native";
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

        {

          shadowColor: customTheme.text,
          paddingVertical: 7,
          paddingHorizontal: 10,
          borderWidth: selected? 0:2,
          borderColor: customTheme.text,

        },
      ]

    const handlePress = () => {
      setSelectedItem(item.key.toString());
      item.onPress();
    }
    const categoryTextStyles: StyleProp<TextStyle> = [styles.categoryButtonText, {
      color: customTheme.text,
      fontWeight: "500"
    }];

    return(
      <Pressable onPress={handlePress} style={pressableStyles}>
        <Text style={categoryTextStyles}>
          {item?.title}
        </Text>
      </Pressable>
    )
  });

export default memo(CategoryButton);