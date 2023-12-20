import React, {memo, useContext} from "react";
import {View} from "react-native";
import {settingStyles} from "./settingStyles"
import {styles} from "../../components/styles"
import {ThemeContext} from "../Context";
import {DefaultText} from "../../components/text/DefaultText";

const Imprint = () => {

  const { customTheme } = useContext(ThemeContext);
  const textStyles = [styles.middleText, {color: customTheme.text}]
  return(
    <View style={[settingStyles.imprintView, {borderColor: customTheme.borderColor}]}>
      <View>
        <DefaultText
          moreStyles={textStyles}
          text={"CEO: Benedikt Sterra"} />
        <DefaultText
          moreStyles={textStyles}
          text={"E-Mail: info@sales-detective.live"} />
        <DefaultText
          moreStyles={textStyles}
          text={"Address: Klingestr 22, 01159 Dresden, Germany"} />
        <DefaultText
          moreStyles={textStyles}
          text={"If you have any problems please fill out our contact form.\n" +
            "   Someone from our Team will contact you ASAP."} />
      </View>
    </View>
  );
}
export default memo(Imprint);