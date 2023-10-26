import {FlatList} from "react-native";
import {SettingsNavigateButton} from "../buttons/SettingsNavigateButton";

// @ts-ignore
export const DefaultFlatList = ({data}) => {
    return(
        <FlatList
            style={styles.box2}
            data={data}
            renderItem={({ e }) => (
                <SettingsNavigateButton style={styles.settingsButton} title={e.title} icon={e.icon}
                             isFirstItem={e.index === 0}  isLastItem={e.index === data.length - 1}
                             key={e.index}
            )}/>
    );
}