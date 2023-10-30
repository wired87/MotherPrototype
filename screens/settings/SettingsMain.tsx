import React, {Key, useCallback, useEffect, useState} from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Image, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {LinearGradient} from "expo-linear-gradient";
import {useDispatch, useSelector} from "react-redux";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";
import {DefaultFlatList} from "../../components/flatlist/DefaultFlatList";
import {BottomImage} from "../../components/images/BottomImage";
import {settingStyles} from "./settingStyles";
import {styles} from "../../components/styles"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {SmallFlatLoop} from "../../components/flatlist/SmallFlatLoop";
import { SwipeModal } from '../../components/modals/SwipeModal';
import {AreYouSureContainer} from "../../components/container/AreYouSureContainer";
import axios from "axios/index";
import {ChatMenuModalContent} from "../../components/container/ChatMenuModalContainer/ChatMenuModalContent";
import {Contact} from "../../components/container/modalContainers/Contact";
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);


/////////////////////////////////////////////////////////////////////////////////////DATA FOR FAILED AND SUCCESS EINBAUENS

export const SettingsMain = () => {
    const [visible, setVisible] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [data, setData] = useState(null);

    const dispatch = useDispatch()

    // @ts-ignore
    const text = useSelector(state => state.text.value)
    // @ts-ignore
    const icon = useSelector(state => state.icon.value)



    const deleteHistory = useCallback(async() => {
        dispatch({
            type: 'LOADING',
            payload: true
        });
        try {
            const response = await axios.post("http://endpoint")
            console.log("response: " + response);
        } catch(error) {
            console.log("error: " + error);
        } finally {
            dispatch({
                type: 'LOADING',
                payload: false
            });
        }
    }, [])


    const closeModal = useCallback(() => {
        setVisible(false);
        setAnimation(false);
    },[]);

    const openModal = useCallback(() => {
        setVisible(true);
        setAnimation(true);
    },[]);




    let settings = [
        {
            id: 1,
            icon: <Icon name="translate" size={26} color="white" />,
            title: "Language",
            navigate: "",
            data: null
        },
        {
            id: 2,
            icon: <Icon name="theme-light-dark" size={26} color="white" />,
            title: "Theme",
            navigate: "",
            data: null
        },
        {
            id: 3,
            icon: <MaterialCommunityIcons name={icon.trashIcon} size={26} color="white" />,
            title: "Delete History",
            navigate: "",
            data: <AreYouSureContainer
                text={"Are you sure to delete your History?"}
                action={deleteHistory}
                closeModalAction={closeModal} />
        },
        {
            id: 4,
            icon: <Icon name="help-box" size={26} color="white" />,
            title: "Help and Contact",
            navigate: "",
            data: <Contact />
        },
    ]
    let other = [
        {
            id: 1,
            icon: <Icon name="help-circle" size={26} color="white" />,
            title: "Features in Future",
            navigate: "",
            data: null
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
            data: null //<Terms />
        },
        {
            id: 2,
            icon: <Icon name="security" size={26} color="white" />,
            title: "Privacy Policy",
            navigate: "",
            data: null // <PrivacyPolicy />
        },

    ]

    const lists = [
        {
            id: 1,
            heading: "SETTINGS",
            list: settings,
        },
        {
            id: 2,
            heading: "OTHER",
            list: other,
        },
        {
            id: 3,
            heading: "ABOUT",
            list: about,
        }
    ]


    const buttonPress = useCallback(() => {

    }, [])

    // @ts-ignore
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, backgroundColor: 'rgb(255,255,255)', paddingVertical: 50}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>

                <PlusAdContainer />

                {lists.map((item, index) => (
                    <SmallFlatLoop
                        key={item.id}
                        openModal={openModal}
                        headingText={item.heading}
                        list={item.list}
                        setData={setData}  />

                    ))}

                <BottomImage />

                <SwipeModal
                    animation={true}
                    modalVisible={visible}
                    closeModal={closeModal}
                    setAnimation={setAnimation}
                    Content={
                        data
                    }
                />


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