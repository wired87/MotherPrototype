import {memo, useContext} from "react";
import {View, StyleSheet} from "react-native";
import {ThemeContext} from "../../../../screens/Context";
import {windowWidth} from "../../../../screens/chat/chatStyles";
import HeaderButton from "../../../buttons/navigation/HeaderButton";
import {DefaultText} from "../../../text/DefaultText";
import {uniStyles as us} from "../../../../screens/universalStyles";


const ls = StyleSheet.create(
  {
    main: {
      width: windowWidth,
      height: 60,
      backgroundColor: "transparent",
    }
  }
)

const EmailContactItem = (
    item:any
  ) => {

  const { customTheme } = useContext(ThemeContext);
  const mainStyles = [
    ls.main, {borderBottomWidth: 1, borderColor: customTheme.borderColor, }];

  const synonymContainerStyles = [us.justifyAlignStart];
  const emailContainerStyles = [us.justifyAlignStart];
  return(
    <View style={mainStyles}>
      <View style={synonymContainerStyles}>
        <DefaultText  text={item.synonym}/>
      </View>
      <View style={emailContainerStyles}>
        <DefaultText  text={item.email}/>
      </View>
      <HeaderButton
        action={undefined}
        icon={"settings-outline"}
      />
    </View>
  );
}

export default memo(EmailContactItem);
