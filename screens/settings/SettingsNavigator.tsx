import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PurchaseScreen} from "./PurchaseScreen"
import { SettingsMain } from "./SettingsMain";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import React from "react";

export const SettingNavigation = () => {
  const SettingStack = createNativeStackNavigator();

  const screenHeaderOptions2 = {
    header: () => <DefaultHeader />
  };

  return(
    <SettingStack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={screenHeaderOptions2} >

      <SettingStack.Screen
        name="PurchaseScreen"
        component={PurchaseScreen}
      />

      <SettingStack.Screen
        name="SettingsMain"
        component={SettingsMain}
      />

    </SettingStack.Navigator>
  );
}
