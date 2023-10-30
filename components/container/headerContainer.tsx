import {View} from "react-native";
import {uniStyles} from "../../screens/universalStyles";

// @ts-ignore
export const HeaderView = ({ children, extraStyles }) => {
    return(
        <View style={[uniStyles.headerNavbarContainer, extraStyles? extraStyles : null]}>
            {children}
        </View>
    );
}