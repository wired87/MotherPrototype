import {View} from "react-native";


// @ts-ignore
export const DefaultContainer = ({ extraStyles, children }) => {
    return(
        <View style={[extraStyles? extraStyles : undefined, {flex: 1, justifyContent: "center", alignItems: "center"}]}>
            {children}
        </View>
    );
}