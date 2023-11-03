import {Animated, Dimensions, FlatList, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation, useRoute} from "@react-navigation/native";
import Chroma from 'chroma-js';
import {styles} from "../../styles";
import {settingStyles} from "../../../screens/settings/settingStyles";
import MIcon from "react-native-vector-icons/MaterialIcons";
import {DefaultButton} from "../../buttons/DefaultButton";
import {SingleProContainer} from "./SingleProContainer";
import {useDispatch, useSelector} from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const TOP_COLORS =  ['#9c0582', '#0e198c', '#1d155e', '#2A3BEF', '#662250', '#6b0e5e'];
const BOTTOM_COLORS = ['#0e198c', '#1d155e', '#4f0c3d', '#7F00FF', '#0e198c'];
const GRADIENT_COLOR_LENGTH = 700;
const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(GRADIENT_COLOR_LENGTH);
const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(GRADIENT_COLOR_LENGTH);
const INTERVAL = 2;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const windowWidth = Dimensions.get('window').width;

let optionsData = [
    {
        text: "Unlimited Access and Messages"
    },
    {
        text: "Access to GPT-4V"
    },
    {
        text: "No Ads anymore!"
    },
]

export const PlusAdContainer = () => {

    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);
    const [colorTop, setColorTop] = useState(TOP_COLORS_SPECTRUM[0]);
    const [colorBottom, setColorBottom] = useState(BOTTOM_COLORS_SPECTRUM[0]);
    const route = useRoute();

    // @ts-ignore
    const text = useSelector(state => state.text.value)
    // @ts-ignore
    const icon = useSelector(state => state.icon.value)
    // @ts-ignore
    const screens = useSelector(state => state.screens.value)

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

    const navigation = useNavigation();
    const dispatch = useDispatch()

    // @ts-ignore
    const onExplore = useCallback(() => {
        console.log("route: ", route)
        if (route.name === "AccountMain") {
            console.log("PURCHASEACCESS")
            dispatch({
                type: 'PURCHASEACCESS',
                payload: true
            });
        }
        // @ts-ignore
        navigation.navigate("Settings", {
            screen: screens.purchaseScreen
        });
    }, []);

    return(
        <LinearGradient style={settingStyles.topBtn} colors={[colorTop, colorBottom]} >
                <View style={styles.header}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold", marginBottom: 5}}>Upgrade To Pro</Text>
                </View>
            {optionsData.map((item, index) => (
              <SingleProContainer key={index} text={item.text} />
            ))}
            {!(route.name === "PurchaseScreen")? (
              <DefaultButton
                extraStyles={[
                    styles.btnContainer,
                    {width: windowWidth * .8, flexDirection: "row",
                        justifyContent: "center", alignItems: "center", textAlign: "center"}]}
                onPressAction={onExplore}
                text={text.plusPlanButton}
                secondIcon={<MaterialCommunityIcons name={icon.arrow} size={28} color="rgba(255,255,255,.8)" />} />
            ):null}

        </LinearGradient>
    );
}
