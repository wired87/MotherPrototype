
import React, {useEffect, useContext} from 'react';

import {HeadingText} from "../../text/HeadingText";
import {View} from "react-native";
import {DefaultButton} from "../../buttons/DefaultButton";
import * as SecureStore from "expo-secure-store";

import {PrimaryContext} from "../../../screens/Context";

export async function postNewColorValues(bool: boolean){
  try {
    await SecureStore.setItemAsync("darkmode", String(bool));
  } catch (e) {
    // @ts-ignore
    throw new Error('Error while saving the data: ', e.message);
  }
}

export async function getDarkmode() {
  try {
    console.log("Success at getting the colors")
    return await SecureStore.getItemAsync("darkmode")
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
    } = useContext(PrimaryContext);

  useEffect(() => {
    console.log("---", darkmode)
  }, [darkmode]);

  return(
    <View style={{justifyContent: "flex-start", alignItems: "center", flex: 1, paddingVertical: 30, paddingHorizontal: 20}}>
      <HeadingText
        text={"DARKMODE"}
        extraStyles={undefined} />
        <DefaultButton
          extraStyles={undefined}
          onPressAction={() => setDarkmode(!darkmode)}
          text={"on/off"}
          secondIcon={undefined} />
    </View>
  );
}
export default DarkMode;
