import React, {memo, useContext} from "react";
import {View, StyleSheet, Switch} from "react-native";
import {PrimaryContext, ThemeContext} from "../../../../screens/Context";
import {windowWidth} from "../../../../screens/chat/chatStyles";
import {DefaultText} from "../../../text/DefaultText";
import {SingleEmailServiceInter} from "../../../../AppInterfaces/MotherInterfaces";



const ls = StyleSheet.create(
  {
    main: {
      width: windowWidth,
      height: 100,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 30,
    }
  }
)

const SingleEmailService: React.FC<SingleEmailServiceInter> = (
  {
    name,
    isUnlocked,
    onSwitch
  }
) => {

  const { customTheme } = useContext(ThemeContext);

  const mainStyles =
    [
      ls.main,
      {
        backgroundColor: customTheme.primary,
      }
    ];

  return(
    <View style={mainStyles}>
      <DefaultText
        text={name}
      />
      <Switch
        thumbColor={"green"}
        value={isUnlocked}
        onChange={onSwitch}
      />
    </View>
  );
}

export default memo(SingleEmailService);
