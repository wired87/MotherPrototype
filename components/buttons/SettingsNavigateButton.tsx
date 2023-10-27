// @ts-ignore
import {TouchableOpacity, Text, View} from "react-native";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {themeColors} from "../../colors/theme";
import {styles} from "./styles";

// @ts-ignore
export const SettingsNavigateButton = ({ title, icon, isLastItem, isFirstItem }) => {
    return (
        <TouchableOpacity style={[styles.settingsButton, isLastItem ? { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 } : { borderBottomWidth: 0.3, borderColor: 'gray'}, isFirstItem ? {borderTopLeftRadius: 20, borderTopRightRadius: 20} : null]}>
            <View style={styles.TouchableView}>
                <View style={styles.box2Icon}>
                    {icon}
                </View>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
            <MIcon name="arrow-forward-ios" size={16} color="#40434f" />
        </TouchableOpacity>
    )
}
