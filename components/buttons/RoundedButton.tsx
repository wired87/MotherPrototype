import {GestureResponderEvent, Pressable, Text, View} from "react-native";
import {styles} from "./styles";
import React, {memo, useContext} from "react";
import {ThemeContext} from "../../screens/Context";
/*
item: { icon: string | number | boolean | React.ReactElement<any, string |
      React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null |
      undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> |
      Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, list: any[], action:
    ((event: GestureResponderEvent) => void) | null | undefined, index: number
 */

const RoundedButton =
  (
    {
      // @ts-ignore
      action, index, list, item
    }
  ) => {
  const { customTheme } = useContext(ThemeContext);
  return(
    <Pressable
      onPress={action}
      style={[styles.settingsButton, {backgroundColor: customTheme.primaryButton},
        (index === list.length - 1) ? { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 } :
          { borderBottomWidth: 0.3, borderColor: 'gray'},
        (index === 0) ? {borderTopLeftRadius: 20, borderTopRightRadius: 20} : null]}
    >
      <View style={styles.TouchableView}>
        <View style={styles.box2Icon}>
            {item.icon}
        </View>
        <Text style={styles.buttonText}>{item.title}</Text>
      </View>
    </Pressable>
  );
}

export  default memo(RoundedButton);
