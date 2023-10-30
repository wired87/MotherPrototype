import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {SingleProContainer} from "../../components/container/PlusPlanContainer/SingleProContainer";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import { HeadingText } from '../../components/text/HeadingText';
import ToggleButton from '../../components/buttons/ToggleButton';
import {themeColors} from "../../colors/theme";
import {settingStyles as styles} from "./settingStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// str
const continuePurchaseText = "Continue";
const headingText = "Test Pro for Free";

// lists
let optionsData = [
    {
        id: 1,
        text: "Unlimited Access"
    },
    {
        id: 2,
        text: "Unlimited Messages"
    },
    {
        id: 3,
        text: "Access to GPT-4V"
    },
    {
        id: 4,
        text: "No Ads anymore!"
    },
]
const buttonText = [
    {
        id: 1,
        text: "3 Days for FREE after that $5.99/week"
    },
    {
        id: 2,
        text: "$15.47/Month"
    },
    {
        id: 3,
        text: "$39.99/Year"
    }
]


export const PurchaseScreen = () => {

    const [selected, setSelected] = useState(1);

    // @ts-ignore
    const icon = useSelector(state => state.icon.value)

    const handleOptionSelect = (optionId: React.SetStateAction<number>) => {
        if (selected === optionId) {
            // @ts-ignore
            setSelected(null);
        } else {
            // Select the option
            setSelected(optionId);
        }
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20, padding: 0 }}
            // @ts-ignore
                      contentContainerStyle={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center"}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 40}}>
                <View style={{ paddingHorizontal: 10 }}>
                    <HeadingText extraStyles={styles.Heading} text={headingText}/>
                    <Text style={styles.SubHeading}>GET ACCESS TO</Text>
                </View>

                {/* Good stuff */}
                <View style={{width: windowWidth, justifyContent: "center", alignItems: "center", flex: 1}}>
                    <FlatList
                        style={styles.Box}
                        data={optionsData}
                        renderItem={({ item }) => (
                            <SingleProContainer text={item.text} />
                        )}
                    />
                </View>

                <View style={styles.ButtonSection}>
                    <FlatList
                        data={buttonText}
                        renderItem={({ item }) => (
                            <ToggleButton select={selected === item.id} setSelect={() => handleOptionSelect(item.id)} title={item.text} />
                        )}
                    />
                    <View style={styles.BottomTextCont}>
                        <Icon name="lock" size={20} color="#9b9e9b" />
                        <Text style={styles.BottomText}>
                            Safe Payment Process with Google Play. {"\n"}
                            Week-/Monthly Plans can be cancelled at any time
                        </Text>
                    </View>

                    <DefaultButton
                        extraStyles={styles.BottomLastBtn}
                        onPressAction={undefined}
                        indicatorColor={undefined}
                        indicatorSize={undefined}
                        text={continuePurchaseText} // <Text style={[styles.BottomLastBtnText, { flex: 1 }]}></Text>
                        secondIcon={
                            <MaterialCommunityIcons name={icon.arrow} size={30} color={"rgba(255,255,255, .6)"} />
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



/*
 <ToggleButton select={selected === 1} setSelect={() => handleOptionSelect(1)} title="3 Days for FREE after that $5.99/week" />
                    <ToggleButton select={selected === 2} setSelect={() => handleOptionSelect(2)} title="$15.47/Month" />
                    <ToggleButton select={selected === 3} setSelect={() => handleOptionSelect(3)} title="$39.99/Year" />

 */