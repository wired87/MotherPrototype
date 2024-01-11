import {ActivityIndicator, Pressable, Text} from "react-native";
import React, {useContext, useMemo} from "react";
import {userStyles} from "../../screens/user/userStyles";
import {PrimaryContext, ThemeContext} from "../../screens/Context";
import {StyleProps} from "react-native-reanimated";

const buttonStyles = { color: "white", marginHorizontal: 5, fontSize: 16 }
interface DefaultButtonStyles {
  extraStyles?: StyleProps
  onPressAction: (() => void);
  text: string
  secondIcon?: string
}


export const DefaultButton: React.FC<DefaultButtonStyles> = (
  {
    extraStyles,
    onPressAction,
    text,
    secondIcon
  }
) => {
  const { loading } = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);

  const pressableStyles = [extraStyles || null, userStyles.changeInfoBtn,
    {backgroundColor: customTheme.primaryButton, color: '#fff'}]

  const loadingSpinner = useMemo(()=> {
    if (loading) {return <ActivityIndicator size={"small"}/>}else {return secondIcon || null}
  }, [secondIcon]);

  return(
      <Pressable style={pressableStyles} onPress={onPressAction} >
        <Text style={buttonStyles}>{text}</Text>
        {loadingSpinner}
      </Pressable>
  );
}