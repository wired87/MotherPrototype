import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';

import {SettingNavigation} from "../../screens/settings/SettingsNavigator";
import {Dimensions, View} from "react-native";
import {ChatNavigation} from "../../screens/chat/ChatNavigator";
const Tab = createMaterialBottomTabNavigator();

const windowWidth = Dimensions.get('window').width;

import {useSelector} from "react-redux";
import {themeColors} from "../../colors/theme";
import useNavigation from "react";
import {useRoute} from "@react-navigation/native";


export default function NavigationMain() {
    const theme = useTheme();

    theme.colors.secondaryContainer = "transparent"; // set the focus shadow of the tab bar to transüarent

    // @ts-ignore
    const darkmode = useSelector(state => state.darkmode.value);

  // @ts-ignore
  return (
        <Tab.Navigator
            shifting={false}
            labeled={false}
            initialRouteName="Chat"
            activeColor={themeColors.sexyBlue} //
            inactiveColor={themeColors.sexyBlue}
            backBehavior={"firstRoute"}
            barStyle={{
              height:60,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingHorizontal: 0,
              paddingVertical: 0,
              backgroundColor: darkmode.navigatorColor,
            }}>
            <Tab.Screen
              name="Chat"
              component={ChatNavigation} // if the Screen Component contains any props just pass them at the bottom
              options={{
                  // tabBarBadge: 0, take it to show new messages
                  tabBarColor: darkmode.navigatorColor ,
                  // @ts-ignore
                  headerShown: false,
                  tabBarIconStyle: { display: "none"},
                  // tabBarOnPress: animations for tabPress

                  tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons style={{top: 0, position: "relative"}} name={focused ? "comment-multiple" : "comment-multiple-outline"} color={color} size={29} />
                  ),
              }}
            />
            <Tab.Screen

                name="Settings"
                component={SettingNavigation} // if the Screen Component contains any props just pass them at the bottom
                options={{

                  tabBarIcon: ({ color, focused }) => (// @ts-ignore
                      <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={color} size={29} />
                  ),
              }}
            />
        </Tab.Navigator>
    );
}




/* later
<Tab.Screen
                name="Tools"
                component={ToolScreens} // if the Screen Component contains any props just pass them at the bottom
                options={{
                    tabBarColor: "transparent",
                    tabBarIcon: ({color, focused}) => (
                        <MaterialCommunityIcons name={focused ? "ballot" : "ballot-outline"} color={color} size={26} />
                    ),
                }}
            />
<Tab.Screen
        name="Profile"
        component={ProfileMain}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
 */
