import {FlatList} from "react-native";
import {SettingsNavigateButton} from "../buttons/SettingsNavigateButton";
import {styles} from "./flatlistStyles";

// @ts-ignore
export const DefaultFlatList = ({data}) => {
    return(
        <FlatList
            style={styles.box2}
            data={data}
            renderItem={({ item, index }) => (
                <SettingsNavigateButton title={item.title} icon={item.icon}
                                        isFirstItem={item.index === 0} isLastItem={item.index === data.length - 1}
                                        key={index}
                                        action={undefined} />
            )}/>
    );
}