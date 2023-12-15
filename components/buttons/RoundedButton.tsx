import { Pressable, Text, View } from "react-native";
import {styles} from "./styles";
import React, {memo, useContext, useMemo} from "react";
import {ThemeContext} from "../../screens/Context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface RoundedButtonTypes {
  action: any;
  item: object | any;
}

const RoundedButton: React.FC<RoundedButtonTypes> =
  (
    {
      action, item
    }
  ) => {

  const { customTheme } = useContext(ThemeContext);

  const buttonStyles = useMemo(() => {
    const baseStyles = [styles.settingsButton, { backgroundColor: customTheme.primaryButton }];
    if (item.id === 3) {
      return [...baseStyles, { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }];
    } else if (item.id === 1) {
      return [...baseStyles, { borderTopLeftRadius: 20, borderTopRightRadius: 20 }];
    } else {
      return [...baseStyles, { borderBottomWidth: 0.3, borderColor: 'gray' }];
    }
  }, [item.id, customTheme.primaryButton]);

  return(
    <Pressable
      unstable_pressDelay={0}
      onPress={action(item)}
      style={buttonStyles}>
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

export  default memo(RoundedButton);
