import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton, useTheme} from 'react-native-paper';

import {ChatScreens} from "../../screens/chat/chatScreens";
import {ToolScreens} from "../../screens/tools/toolScreens";
import {SettingScreens} from "../../screens/settings/settingScreen";
import SingleTabbar from "./tabBarSingle";
import {Dimensions, View} from "react-native";
import {themeColors} from "../../theme/theme";
const Tab = createMaterialBottomTabNavigator();

const windowWidth = Dimensions.get('window').width;



export default function NavigationMain() {
    const theme = useTheme();
    theme.colors.secondaryContainer = "transparent";

    return (
        <Tab.Navigator
            shifting={false}
            labeled={false} // disable all albels for the tabs
            initialRouteName="Settings"
            activeColor={'#01152a'}
            inactiveColor={"rgb(0, 0, 0)"}
            barStyle={{
                height:58,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 0,
                paddingVertical: 0,
                backgroundColor: "#f6f6f6",
            }}>
            <Tab.Screen
                name="Chat"
                component={ChatScreens} // if the Screen Component contains any props just pass them at the bottom
                options={{
                    // tabBarBadge: 0, take it to show new messages
                    tabBarBadge: null,
                    tabBarColor: "transparent",
                    headerShown: false,
                    tabBarIconStyle: { display: "none"},
                    // tabBarOnPress: animations for tabPress
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons  name={focused ? "comment-multiple" : "comment-multiple-outline"} color={color} size={26} direction={"top"} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tools"
                component={ToolScreens} // if the Screen Component contains any props just pass them at the bottom
                options={{
                    tabBarColor: "transparent",
                    tabBarIcon: ({color, focused}) => (
                        <MaterialCommunityIcons name={focused ? "ballot" : "ballot-outline"} color={color} size={26} direction={"top"} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingScreens} // if the Screen Component contains any props just pass them at the bottom
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} iconColor={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}




/* later
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
