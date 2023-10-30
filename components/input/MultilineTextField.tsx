import {TextInput} from "react-native";
import {inputStyles as styles} from "./styles";
import {themeColors} from "../../colors/theme";


// @ts-ignore
export const MultilineInput = ({ value, onChangeText, placeholder }) => {
    return(
        <TextInput
            multiline={true}

            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={false}
            editable={true}
            blurOnSubmit={true}
            maxLength={1200}
            style={[styles.defaultInput, {minHeight: 100, textAlignVertical: "top", paddingTop: 12}]}
            placeholderTextColor={themeColors.mediumDark}
        />

    );
}