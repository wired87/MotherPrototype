import {Animated, FlatList, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import Chroma from 'chroma-js';
import {styles} from "../../styles";
import MIcon from "react-native-vector-icons/MaterialIcons";
import {DefaultButton} from "../../buttons/DefaultButton";
import {SingleProContainer} from "./SingleProContainer";


const TOP_COLORS =  ['#9c0582', '#0e198c', '#1d155e', '#2A3BEF', '#662250', '#6b0e5e'];
const BOTTOM_COLORS = ['#0e198c', '#1d155e', '#4f0c3d', '#7F00FF', '#0e198c'];
const GRADIENT_COLOR_LENGTH = 700;
const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(GRADIENT_COLOR_LENGTH);
const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(GRADIENT_COLOR_LENGTH);
const INTERVAL = 2;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const PlusAdContainer = () => {
    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);
    const [colorTop, setColorTop] = useState(TOP_COLORS_SPECTRUM[0]);
    const [colorBottom, setColorBottom] = useState(BOTTOM_COLORS_SPECTRUM[0]);

    // @ts-ignore
    const text = useSelector(state => state.text.text)

    // @ts-ignore
    const screens = useSelector(state => state.screens.screens)

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

    const onExplore = useCallback(() => {
        // @ts-ignore
        navigation.navigate(screens.plusPlanInfo);
    }, []);

    const proArgumentContainers = [
        <SingleProContainer text={"No Ads anymore!"} />,
        <SingleProContainer text={"Unlimited Messages!"} />,
        <SingleProContainer text={"Access to \n GPT-4V!"} />
    ]


    return(
        <LinearGradient style={styles.topBtn} colors={[colorTop, colorBottom]}>
            <View style={styles.header}>
                <Text style={{ color: 'white', fontSize: 28, }}>Upgrade To Pro</Text>
            </View>
            {/* <Image style={styles.topBtnImg} /> */}
            <FlatList style={{flexDirection: "column"}}
                      data={proArgumentContainers}
                    // @ts-ignore
                      renderItem={({ item }) => (
                          {item}
                      )}/>
            <DefaultButton
                extraStyles={styles.btnContainer}
                onPressAction={onExplore}
                indicatorColor={undefined}
                indicatorSize={text.indicatorSizeSmall}
                text={text.plusPlanButton}
                secondIcon={<MIcon name="arrow-right-thin" size={20} color="#40434f" />} />
        </LinearGradient>
    );
}