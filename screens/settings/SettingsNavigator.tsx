import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PurchaseScreen} from "./PurchaseScreen"
import { SettingsMain } from "./SettingsMain";
import {DefaultHeader} from "../../components/navigation/DefaultHeader";
import {Appbar} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {HeaderView} from "../../components/container/headerContainer";
import React from "react";
import {PrivacyPolicy} from "./PrivacyPolicy";
import {ChatMain} from "../chat/ChatMain";
export const SettingNavigation = () => {
    const SettingStack = createNativeStackNavigator();
    const navigation = useNavigation();
  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)
  // @ts-ignore
  const user = useSelector(state => state.user.value);
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
        name="SettingsMain">
        {(props) =>
          <SettingsMain
           user={user} />
        }
      </SettingStack.Screen>
      <SettingStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
    </SettingStack.Navigator>
    );
}
