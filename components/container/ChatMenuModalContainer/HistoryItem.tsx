import React, {memo, useContext} from "react";
import {Pressable} from "react-native";
import {uniStyles} from "../../../screens/universalStyles";
import {ThemeContext} from "../../../screens/Context";
import {DefaultText} from "../../text/DefaultText";

interface HistoryitemTypes {
  item: any;
  onPress: void | (() => {}) | any;
}

export const HistoryItem: React.FC<HistoryitemTypes> = memo(({ item, onPress }) => {

  const { customTheme } = useContext(ThemeContext);
  const buttonStyles = [uniStyles.historyItem, {backgroundColor: customTheme.primaryButton}]
  const textStyles = {color: "white"}

  return(
    <Pressable
      style={buttonStyles}
      onPress={() => onPress(item.message)}>
      <DefaultText
        text={item?.message}
        moreStyles={textStyles}
      />
    </Pressable>
  )
});

