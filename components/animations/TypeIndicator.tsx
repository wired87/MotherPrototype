import {Text, View} from "react-native";
import {TypingAnimation} from "react-native-typing-animation";
import {StyleSheet} from "react-native";
import {themeColors} from "../../colors/theme";

const aiNameList = ["C-3PO", "Computer", "R2D2", "Optimus Prime", "SkyNet", "JARVIS", "Morpheus"]

export const TypeIndicator = () => {
    const aiName = aiNameList[Math.floor(Math.random() * aiNameList.length)];

    return (
        <View
            // @ts-ignore
            style={{left: 0, flexDirection: "row", paddingBottom: 0, justifyContent: "center", alignItems: "center,"}}>
            <Text style={{opacity: .6, fontSize: 13, color: themeColors.sexyBlue}}>{aiName} is typing</Text>
            <TypingAnimation
                dotColor={"rgba(0, 0, 0, .7)"}
                dotMargin={6}
                dotAmplitude={90}
                dotSpeed={0.15}
                dotRadius={2.5}
                dotX={15}
                dotY={100}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dotContainer: {
        borderRadius: 50,
        width: 10,
        height: 10,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    }
})