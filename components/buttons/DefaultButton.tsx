import {ActivityIndicator, Pressable, Text} from "react-native";
import React, {ReactNode, useCallback, useContext} from "react";
import {styles as s} from "./styles";
import {PrimaryContext, ThemeContext} from "../../screens/Context";
import {StyleProps} from "react-native-reanimated";


const buttonStyles: StyleProps = { color: "white", marginHorizontal: 5, fontSize: 16 };

interface DefaultButtonStyles {
  extraStyles?: StyleProps
  onPressAction: (() => void);
  text?: string
  secondIcon?: ReactNode;
}


export const DefaultButton: React.FC<DefaultButtonStyles> = (
  {
    extraStyles,
    onPressAction,
    text,
    secondIcon,
  }
) => {

  const { loading} = useContext(PrimaryContext);

  const { customTheme } = useContext(ThemeContext);

  const pressableStyles =
    [extraStyles || null, s.changeInfoBtn, {backgroundColor: customTheme.primaryButton, color: '#fff'}]

  const loadingSpinner = useCallback(()=> {
    if (loading) {
      return <ActivityIndicator size={"small"}/>
    }else if (secondIcon) {
      return secondIcon
    }
  }, [secondIcon, loading]);

  return(
    <Pressable style={pressableStyles} onPress={onPressAction} >
      <Text style={buttonStyles}>{text || "Create"}</Text>
      {
        loadingSpinner()
      }
    </Pressable>
  );
}