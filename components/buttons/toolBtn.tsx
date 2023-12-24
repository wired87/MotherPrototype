import React, { memo, useCallback, useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {LinearGradient} from "expo-linear-gradient";

const ls = StyleSheet.create({
    bgView: {
        backgroundColor: "black",
        borderRadius: 22,
    },
    button: {
        // paddingHorizontal: 10,
        borderRadius: 22,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginBottom: 10,
        color: "white",
    },
    text: {
        color: "white",
        fontSize: 19,
    }
});

interface ToolitemButton {
    text?: string;
    colors: string[];
    extraText?: string;
    randomBool: boolean; // Added randomBool to the interface
}

const ToolItemButton: React.FC<ToolitemButton> = ({
                                                    text,
                                                    colors,

                                                    extraText,
                                                }) => {
  const randomBool = useMemo(() => Math.random() < 0.4, []); // Generate randomBool within the component
  const extraTextComponent = useMemo(() => {
      if (extraText) return <Text>{extraText}</Text>;
  }, [extraText]);

  const finalButton = useCallback((className: any) => {
      return [
          className,
          { width: 150, height: randomBool ? 150 : 280 }
      ];
  }, [randomBool,]);

  return (
    <View style={finalButton(ls.bgView)}>
      <LinearGradient
        style={finalButton(ls.button)}
        colors={colors || ['rgba(255,99,0,.6)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: .6, y: .75 }}>
          <MaterialCommunityIcons size={30} style={ls.icon} name={"text-to-speech"} />
          <Text style={ls.text}>{text || " Voice too Text"}</Text>
          {/* <Text style={{ color: "white", fontSize: 12 }}>{para}</Text> */}
          {extraTextComponent}
      </LinearGradient>
    </View>
  );
};

export default memo(ToolItemButton);
