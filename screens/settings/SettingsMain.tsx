import React, {Key, useCallback, useEffect, useRef, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  FlatList,
  ActivityIndicator,
  Alert, Share
} from 'react-native'

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
import {FeaturesInFuture} from "../../components/container/modalContainers/FeaturesInFuture";
import {themeColors} from "../../colors/theme";
import {DarkMode} from "../../components/container/modalContainers/DarkMode";
import {PrivacyPolicy} from "./PrivacyPolicy";
import {getAuth} from "firebase/auth";
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
// @ts-ignore
import successAuth from "../../assets/images/successAuth.png"
// @ts-ignore
import close from "../../assets/images/close.png";
import { DefaultText } from '../../components/text/DefaultText';
import {DefaultContainer} from "../../components/container/DefaultContainer";
import {StatusContainer} from "../../components/container/modalContainers/StatusContainer";
import { imgStyles } from '../../components/images/imgStyles';

/////////////////////////////////////////////////////////////////////////////////////DATA FOR FAILED AND SUCCESS EINBAUENS

// @ts-ignore
export const  SettingsMain = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(0);

    const dispatch = useDispatch()
    // @ts-ignore
    const text = useSelector(state => state.text.value)
    // @ts-ignore
    const icon = useSelector(state => state.icon.value)
    // @ts-ignore
    const loading = useSelector(state => state.loading.value)
    // @ts-ignore
    const darkmode = useSelector(state => state.darkmode.value)

    const deleteHistory = useCallback(async() => {
        dispatch({
            type: 'LOADING',
            payload: true
        });
        try {
          const userObject = {
            user_id: user?.uid
          }
          console.log("user id: ", user?.uid)
          const response = await axios.post("http://192.168.178.51:8000/open/delete-chat-history/",
            userObject
          )
          // @ts-ignore
          setStatus(response.data.status);
          console.log("response: ", response.data.messages, "\n response.status:", response.data.status);
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

    const share = useCallback(async() => {
      try {
        const result = await Share.share({
          title: "Share AIX",
          message: "Your AI https://pornhub.de",
          url: "https://pornhub.de",
        },
        {
          dialogTitle: "Look at this cool new App!",
          subject: "AIX the cooles AI-App ever!",
          tintColor: themeColors.sexyBlue,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log("1")
          } else {
            console.log("2")
          }
        } else if (result.action === Share.dismissedAction) {
          console.log("3")
        }
      } catch (error: any) {
        console.log(error.message)
        Alert.alert(error.message);
      }
    }, [])


    let settings = [
        {
            id: 1,
            icon: <Icon name="theme-light-dark" size={26} color="white" />,
            title: "Theme",
            navigate: "",
            data: <DarkMode />
        },
        {
            id: 2,
            icon: <Icon name="help-box" size={26} color="white" />,
            title: "Help and Contact",
            navigate: "",
            data: <Contact
              closeModal={closeModal}/>
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
    ]
    let other = [
        {
            id: 1,
            icon: <Icon name="help-circle" size={26} color="white" />,
            title: "Features in Future",
            navigate: "",
            data: <FeaturesInFuture
              setData={setData}
              contactScreen={
                  <Contact
                    closeModal={closeModal}/>
              }
          />
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
            data: null
        },
        {
            id: 2,
            icon: <Icon name="security" size={26} color="white" />,
            title: "Privacy Policy",
            navigate: "",
            data: <PrivacyPolicy />
        },

    ]

    const lists = [
        {
            heading: "SETTINGS",
            list: settings,
        },
        {
            heading: "OTHER",
            list: other,
        },
        {
            id: 3,
            heading: "ABOUT",
            list: about,
        }
    ]
//options={{ headerBackground: darkmode.primary }}

    const buttonPress = useCallback(() => {

    }, [])

    // @ts-ignore
    // @ts-ignore
  return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: darkmode.primary}}
        showsVerticalScrollIndicator={false}>
          <View style={[styles.container, {backgroundColor: "transparent",}]}>

              <PlusAdContainer />

              {lists.map((item, index) => (
                <SmallFlatLoop
                  key={index}
                  openModal={openModal}
                  headingText={item.heading}
                  list={item.list}
                  setData={setData}
                  share={share}
                />
              ))}

              <BottomImage />

              <SwipeModal
                animation={true}
                modalVisible={visible}
                closeModal={closeModal}
                Content={
                    loading? (
                      <ActivityIndicator size={10}  />
                    ):data?(
                      status === 201 || status === 200 ? (
                        <StatusContainer source={successAuth} text={"Success"} styles={imgStyles.statusImg}
                                         extraContainerStyles={{gap: 20}} />
                      ): status === 400 || status === 401?(
                        <StatusContainer source={close} text={"Failed! \n Please try again or contact us."}
                                         styles={imgStyles.statusImg} extraContainerStyles={{gap: 20}} />
                      ):(
                        data
                      )
                    ):null}
              />
          </View>
      </ScrollView>
    )
}





/*
): success? (
                    <LottieView />
                  ): error? (
                    <LottieView />
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