import React, {memo, useContext} from "react";
import {View} from "react-native";
import {settingStyles} from "./settingStyles"
import {styles} from "../../components/styles"
import {ThemeContext} from "../Context";
import {DefaultText} from "../../components/text/DefaultText";

const Imprint = () => {

  const { customTheme } = useContext(ThemeContext);

  return(
    <View style={[settingStyles.imprintView, {borderColor: customTheme.borderColor}]}>
      <View>
        <DefaultText
          moreStyles={styles.middleText}
          text={"CEO: Benedikt Sterra"} />
        <DefaultText
          moreStyles={styles.middleText}
          text={"E-Mail: info@sales-detective.live"} />
        <DefaultText
          moreStyles={styles.middleText}
          text={"Address: Klingestr 22, 01159 Dresden, Germany"} />
        <DefaultText
          moreStyles={styles.middleText}
          text={"If you have any problems please fill out our contact form.\n" +
            "   Someone from our Team will contact you ASAP."} />
      </View>
    </View>
  );
}
export default memo(Imprint);