import {styles} from "../container/contiStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Pressable} from "react-native";
import React, {memo, useContext} from "react";
import {ThemeContext} from "../../screens/Context";

interface ClearButtonTypes {
  setValue?: ((text: string) => void);
  value: string;
}

const ClearButton: React.FC<ClearButtonTypes> = (
  {
    setValue,
    value
  }
) => {

  const { customTheme } = useContext(ThemeContext);
  if (value.length > 0) {
    return (
      <Pressable
        onPress={() => !(setValue) || setValue("") || undefined}
        style={styles.clearInputFiledBtn}>
        <MaterialCommunityIcons color={customTheme.text} name={"close"} size={17}/>
      </Pressable>
    );
  }
}

export default memo(ClearButton);