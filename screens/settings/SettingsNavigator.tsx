import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PurchaseScreen} from "./PurchaseScreen"
import { SettingsMain } from "./SettingsMain";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import React from "react";

export const SettingNavigation = () => {
  const SettingStack = createNativeStackNavigator();
  return(
    <SettingStack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={{
        header:
          (props: any) =>
            <DefaultHeader
              {...props}
              extraStyles={undefined}
              childrenMiddle={
                undefined
              }
              childrenRight={undefined}
            />
          }}>
      <SettingStack.Screen
        name="PurchaseScreen"
        component={PurchaseScreen}
      />
      <SettingStack.Screen
        name="SettingsMain"
        component={SettingsMain} />
    </SettingStack.Navigator>
    );
}
