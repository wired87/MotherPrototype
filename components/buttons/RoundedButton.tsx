import { Pressable, Text, View } from "react-native";
import {styles} from "./styles";
import React, {useContext} from "react";
import {ThemeContext} from "../../screens/Context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface RoundedButtonTypes {
  action?: ((item: any) => void);
  list: any[];
  item: object | any;
}

const RoundedButton: React.FC<RoundedButtonTypes> =
  (
    {
      action, list, item
    }
  ) => {

  const { customTheme } = useContext(ThemeContext);

  return(
    <Pressable
      unstable_pressDelay={0}
      onPressIn={action}
      style={[styles.settingsButton, {backgroundColor: customTheme.primaryButton},
        (item.id === list.length ) ?
          { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 } :
          { borderBottomWidth: 0.3, borderColor: 'gray'},
        (item.id === 1) ? {borderTopLeftRadius: 20, borderTopRightRadius: 20} : null]}>
      <View style={styles.TouchableView}>
        <View style={styles.box2Icon}>
          <Icon name={item.icon} size={26} color="white" />
        </View>
        <Text style={styles.buttonText}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
}

export  default RoundedButton;
