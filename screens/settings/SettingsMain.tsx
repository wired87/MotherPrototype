import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Image, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {styles} from "../settingStyles";
import {LinearGradient} from "expo-linear-gradient";
import Chroma from "chroma-js";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import auth from '@react-native-firebase/auth';
import {SingleProContainer} from "../../components/container/PlusPlanContainer/SingleProContainer";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";
import {HeadingText} from "../../components/text/HeadingText";
import {DefaultFlatList} from "../../components/flatlist/DefaultFlatList";
import {BottomImage} from "../../components/images/BottomImage";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);


export const SettingsMain = () => {

    // @ts-ignore
    const text = useSelector(state => state.text.text)


    let settings = [
        {
            id: 1,
            icon: <Icon name="translate" size={26} color="white" />,
            title: "Language",
            navigate: "",
        },
        {
            id: 2,
            icon: <Icon name="theme-light-dark" size={26} color="white" />,
            title: "Theme",
            navigate: "",
        },
        {
            id: 3,
            icon: <Icon name="trash-can" size={26} color="white" />,
            title: "Delete History",
            navigate: "",
        },
        {
            id: 4,
            icon: <Icon name="help-box" size={26} color="white" />,
            title: "Help and Contact",
            navigate: "",
        },
    ]
    let other = [
        {
            id: 1,
            icon: <Icon name="help-circle" size={26} color="white" />,
            title: "Features in Future",
            navigate: "",
        },
        {
            id: 2,
            icon: <Icon name="star" size={26} color="white" />,
            title: "Rate us",
            navigate: "",
        },
        {
            id: 3,
            icon: <MIcon name="share" size={26} color="white" />,
            title: "Share it with your friends",
            navigate: "",
        },

    ]
    let about = [
        {
            id: 1,
            icon: <Icon name="note-text" size={26} color="white" />,
            title: "Terms of use",
            navigate: "",
        },
        {
            id: 2,
            icon: <Icon name="security" size={26} color="white" />,
            title: "Privacy Policy",
            navigate: "",
        },

    ]


    // @ts-ignore
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, backgroundColor: 'rgb(255,255,255)' }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>

                <PlusAdContainer />

                <View>
                    <Text
                        style={styles.btnHeading}>
                        SETTINGS
                    </Text>
                    <View
                        style={styles.box2} >
                        <DefaultFlatList
                            data={settings} />
                    </View>
                </View>
                <View>
                    <Text
                        style={styles.btnHeading}>
                        OTHER
                    </Text>
                    <View>
                        <View
                            style={styles.box2} >
                            <DefaultFlatList
                                data={other} />
                        </View>
                    </View>
                </View>
                <View>
                    <Text
                        style={styles.btnHeading}>
                        ABOUT
                    </Text>
                    <View>
                        <DefaultFlatList
                            data={about} />
                    </View>
                </View>
                <BottomImage />
            </View>
        </ScrollView>
    )
}





/*
    useEffect(() => {
        const interval = setInterval(() => {
            let newTopIndex = topIndex + 1;
            if (newTopIndex === TOP_COLORS_SPECTRUM.length) {
                newTopIndex = 0;
            }
            let newBottomIndex = bottomIndex + 1;
            if (newBottomIndex === BOTTOM_COLORS_SPECTRUM.length) {
                newBottomIndex = 0;
            }
            setTopIndex(newTopIndex);
            setBottomIndex(newBottomIndex);
            setColorTop(TOP_COLORS_SPECTRUM[newTopIndex]);
            setColorBottom(BOTTOM_COLORS_SPECTRUM[newBottomIndex]);
        }, INTERVAL);

        return () => clearInterval(interval); // Clear the interval on component unmount

    }, [topIndex, bottomIndex]);

    map container form before


    <View style={styles.box2} >
                            {about.map((e, index) => (
                                <NavigateBtn title={e.title} icon={e.icon} isLastItem={index === about.length - 1}
                                             isFirstItem={index === 0} key={index} />
                            ))}
                        </View>





 */