import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PurchaseScreen} from "./PurchaseScreen"
import { SettingsMain } from "./SettingsMain";
import {DefaultHeader} from "../../components/navigation/DefaultHeader";
import {Appbar} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {HeaderView} from "../../components/container/headerContainer";
import React from "react";
export const SettingNavigation = () => {
    const SettingStack = createNativeStackNavigator();
    const navigation = useNavigation();
  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)

  return(
        <SettingStack.Navigator
          initialRouteName="SettingsMain"
          screenOptions={{

            header:
              (props: any) =>
                <DefaultHeader
                  {...props}
                  visible={true}
                  extraStyles={undefined}
                  statement={undefined}
                  children={
                    <>

                    </>
                  }/>
                }}>
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
