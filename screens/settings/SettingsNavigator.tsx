import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Auth} from "../../components/user/auth";
import {Settings} from "./settingScreens/settingsMain";
import {NavigateBtn, SettingsMain} from "./settingScreens/settings2";
import ToolHeader from "../tools/components/toolHeader";
import SettingsHeader from "./components/settingsHeader";

export const SettingScreens = () => {
    const SettingStack = createNativeStackNavigator();

    return(
        <SettingStack.Navigator initialRouteName="Settings1"
                                screenOptions={{
                                    header: (props) => <SettingsHeader {...props} />,
                                }}>
            <SettingStack.Screen name="Settings1" component={Settings}/>
            <SettingStack.Screen name="SettingsMain" component={SettingsMain} />
        </SettingStack.Navigator>
    );
}
