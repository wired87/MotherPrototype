import React, {Key, useCallback} from "react";
import {SettingsNavigateButton} from "../buttons/SettingsNavigateButton";
import {settingStyles} from "../../screens/settings/settingStyles";
import {Text, View} from "react-native";


// @ts-ignore
export const SmallFlatLoop = ({ list, headingText, setData, openModal }) => {

    return (
        <>
            <Text
                style={settingStyles.btnHeading}>
                {headingText}
            </Text>
            <View
                style={settingStyles.box2} >
                {list.map((item: { title: any; icon: any; id: Key | null | undefined; data: any }, index: number) => (
                    <SettingsNavigateButton
                        title={item.title}
                        icon={item.icon}
                        action={() => {
                            setData(item.data)
                            openModal()
                        }}
                        isFirstItem={index === 0}
                        isLastItem={index === list.length - 1}
                        key={item.id} // Assuming each item has a unique 'id' property that can be used as a key
                    />
                ))}
            </View>
        </>
    );
}