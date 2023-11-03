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
import {useSelector} from "react-redux";
import {LinearGradient} from "expo-linear-gradient";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// str
const continuePurchaseText = "Continue";
const headingText = "Choose your Plan!";

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
// darkmode.navigatorColor

export const PurchaseScreen = () => {
    // @ts-ignore
    const darkmode = useSelector(state => state.darkmode.value);
    const [selected, setSelected] = useState(1);
    // @ts-ignore
    const colors = useSelector(state => state.colors.value);
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
      <SafeAreaView
        style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20, padding: 0, backgroundColor: darkmode.primary }}

        // @ts-ignore
                    contentContainerStyle={{
                        flex: 1,
                        backgroundColor: darkmode.primary,
                        justifyContent: "center",
                        alignItems: "center"}}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              backgroundColor: darkmode.primary,
              justifyContent: "center",
              alignItems: "center"}}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 40, backgroundColor: darkmode.primary}}>

              <View style={{ paddingHorizontal: 10 }}>
                  <HeadingText extraStyles={styles.Heading} text={headingText}/>
                  <Text style={styles.SubHeading}>GET ACCESS TO</Text>
              </View>
              {/* Good stuff  style={{ width: windowWidth, flex: 1, backgroundColor: darkmode.secondaryContainerBackground}}*/}
              <PlusAdContainer />
              <View style={styles.ButtonSection}>
                  {buttonText.map((item, index) => (
                    <ToggleButton key={index} select={selected === item.id} setSelect={() => handleOptionSelect(item.id)} title={item.text} />
                  ))}
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