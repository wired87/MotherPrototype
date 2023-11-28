import { Text, Dimensions, Pressable} from 'react-native'
import {styles} from "./styles"
import {memo} from "react";

const windowWidth = Dimensions.get('window').width;

// @ts-ignore
const ToggleButton = ({ title, select, setSelect }) => {
    return (
        <Pressable onPress={setSelect} style={[select ? styles.buttonSelected : styles.button, {width: windowWidth * .9}]}>
            <Text style={styles.buttonText1}>{title}</Text>
        </Pressable>
    )
}

export default memo(ToggleButton);

