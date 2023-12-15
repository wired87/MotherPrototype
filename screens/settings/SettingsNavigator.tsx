import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PurchaseScreen} from "./PurchaseScreen"
import { SettingsMain } from "./SettingsMain";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import React, {useMemo, useState} from "react";
import {SettingsContext} from "../Context";

export const SettingNavigation = () => {
  const SettingStack = createNativeStackNavigator();
  const [status, setStatus] = useState(0);

  const screenHeaderOptions = useMemo(() => ({
    header: () => <DefaultHeader />,
  }), []);

  return(
    <SettingStack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={screenHeaderOptions} >

      <SettingStack.Screen
        name="PurchaseScreen"
        component={PurchaseScreen}
      />

        <SettingStack.Screen
          name="SettingsMain"
          children={
          () =>
            <SettingsContext.Provider value={{setStatus, status}}>
              <SettingsMain />
            </SettingsContext.Provider>
        }
        />
    </SettingStack.Navigator>
  );
}
