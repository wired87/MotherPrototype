
import React, {useEffect, useContext, memo} from 'react';

import {HeadingText} from "../../text/HeadingText";
import {View, StyleSheet} from "react-native";
import {DefaultButton} from "../../buttons/DefaultButton";
import * as SecureStore from "expo-secure-store";

import {PrimaryContext, ThemeContext} from "../../../screens/Context";
import ThemeContextProvider from "../../../AppContextCoponents/ThemeContextProvider";

const localStyles = StyleSheet.create(
  {
    main: {
      justifyContent: "flex-start",
      alignItems: "center",
      flex: 1,
      paddingVertical: 30,
      paddingHorizontal: 20
    }
  }
)


export async function postNewColorValues(bool: boolean){
  try {
    await SecureStore.setItemAsync("darkMode", String(bool));
  } catch (e) {
    // @ts-ignore
    throw new Error('Error while saving the data: ', e.message);
  }
}

export async function getDarkmode() {
  try {
    return await SecureStore.getItemAsync("darkMode")
  } catch (e) {
    console.error('Error at requesting the Colors: ', e);
    return false;
  }
}

const DarkMode = () => {
  const
    {
      darkmode,
      setDarkmode
    } = useContext(ThemeContext);

  useEffect(() => {
    console.log("---DarkMode", darkmode)
  }, [darkmode]);

  const setDarkModeAction = async () => {
    setDarkmode(!darkmode);
  }

  return(
    <View style={localStyles.main}>
      <HeadingText
        text={"DARKMODE"}
        extraStyles={undefined} />
        <DefaultButton
          extraStyles={undefined}
          onPressAction={setDarkModeAction}
          text={"on/off"}
          secondIcon={undefined}
        />
    </View>
  );
}
export default memo(DarkMode);
