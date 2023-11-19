import {useDispatch, useSelector} from "react-redux";
import {HeadingText} from "../../text/HeadingText";
import {Button, View} from "react-native";
import {DefaultButton} from "../../buttons/DefaultButton";
import {themeColors} from "../../../colors/theme";
import {useEffect} from "react";

export const DarkMode = () => {

  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value);
  // @ts-ignore
  const colors = useSelector(state => state.colors.value)

  const dispatch = useDispatch()

  const darkmodeOnOff = () => {
    console.log("clicked");
    dispatch({
      type: 'DARKMODE',
      payload: {
        primary: colors.primary_darkLight[0] === darkmode.primary ? colors.primary_darkLight[1] : colors.primary_darkLight[0],
        secondary: colors.secondary_darkLight[0] === darkmode.secondary ? colors.secondary_darkLight[1] : colors.secondary_darkLight[0],
        navigatorColor: colors.navigatorColor[0] === darkmode.navigatorColor ? colors.navigatorColor[1] : colors.navigatorColor[0],
        headerIconColors: colors.headerIconColors[0] === darkmode.headerIconColors ? colors.headerIconColors[1] : colors.headerIconColors[0],
        switchTextColorLD: colors.switchTextColorLD[0] === darkmode.switchTextColorLD ? colors.switchTextColorLD[1] : colors.switchTextColorLD[0],
        secondaryContainerBackground: colors.secondaryContainerBackground[0] === darkmode.secondaryContainerBackground ? colors.secondaryContainerBackground[1] : colors.switchTextColorLD[0],
        view: colors.view[0] === darkmode.view ? colors.view[1] : colors.view[0],
        switchedSecondaryContainerBackground: colors.switchedSecondaryContainerBackground[0] === darkmode.switchedSecondaryContainerBackground ? colors.switchedSecondaryContainerBackground[1] : colors.switchTextColorLD[0],
        bool: !darkmode.bool,
        messageContainer: colors.messageContainer[0] === darkmode.messageContainer ? colors.messageContainer[1] : colors.messageContainer.view[0],
        text: colors.text[0] === darkmode.text ? colors.text[1] : colors.text[0],
        borderColor: colors.borderColor[0] === darkmode.borderColor ? colors.borderColor[1] : darkmode.borderColor[0]
      }
    });
  };

  useEffect(() => {
    console.log("---", darkmode)
  }, []);
  return(
    <View style={{justifyContent: "flex-start", alignItems: "center", flex: 1, paddingVertical: 30, paddingHorizontal: 20}}>
      <HeadingText
        text={"DARKMODE"}
        extraStyles={undefined} />
        <DefaultButton
          extraStyles={undefined}
          onPressAction={() =>{darkmodeOnOff()}}
          text={"on/off"}
          secondIcon={undefined} />
    </View>
  );
}