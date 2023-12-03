import React, {lazy, RefObject, useCallback, useContext, useMemo, useRef, useState} from 'react'
import {
  View,
  Animated,
  ActivityIndicator, StyleSheet, Text, SectionList, Share,
} from 'react-native'

import {LinearGradient} from "expo-linear-gradient";
import {useSelector} from "react-redux";
import {styles} from "../../components/styles"
import { SwipeModal } from '../../components/modals/SwipeModal';
import AreYouSureContainer from "../../components/container/AreYouSureContainer";
import Contact from "../../components/container/modalContainers/Contact/Contact";
import FeaturesInFuture from "../../components/container/modalContainers/FeaturesInFuture";
import DarkMode from "../../components/container/modalContainers/DarkMode";
import PrivacyPolicy from "./PrivacyPolicy";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

import successAuth from "../../assets/animations/successLottie.json";
// @ts-ignore
import close from "../../assets/images/close.png";

const StatusContainer =
  lazy(() => import("../../components/container/modalContainers/StatusContainer"));

import { imgStyles } from '../../components/images/imgStyles';
import {ThemeContext} from "../Context";
import Imprint from "./Imprint";
import {settingStyles} from "./settingStyles";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";
import {BottomImage} from "../../components/images/BottomImage";
import RoundedButton from "../../components/buttons/RoundedButton";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";

interface IconProps {
  name: string,
  size: string | number,
  color: string
}

interface loopDataTypes {
  id: number,
  icon: string,
  title: string,
  navigate: string,
}

let settingsData = [
  {
    id: 1,
    icon: "theme-light-dark",
    title: "Theme",
    navigate: "",

  },
  {
    id: 2,
    icon: "help-box",
    title: "Help and Contact",
    navigate: "",
  },
  {
    id: 3,
    icon: "trash-can-outline",
    title: "Delete History",
    navigate: "",
  },
]

let otherData = [
  {
    id: 1,
    icon: "help-circle",
    title: "Features in Future",
    navigate: "",
  },
  {
    id: 2,
    icon: "star" ,
    title: "Rate us",
    navigate: "",
  },
  {
    id: 3,
    icon: "share",
    title: "Share it with your Friends",
    navigate: "",
  },
]

let aboutData = [
  {
    id: 1,
    icon: "note-text",
    title: "Terms of use",
    navigate: "",
  },
  {
    id: 2,
    icon: "security",
    title: "Privacy Policy",
    navigate: "",
  },
  {
    id: 3,
    icon: "security",
    title: "Imprint",
    navigate: "",
  },
]


const localStyles = StyleSheet.create(
  {
    mainContainer: {
      flexGrow: 1,
    }
  }
)

export const  SettingsMain = () => {

  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const setNewData = useCallback((value: any) => setData(value), []);

  // @ts-ignore
  const loading = useSelector(state => state.loading.value);
  const { customTheme } = useContext(ThemeContext);

  const updateModalIndex = useCallback((number: number) => {
    bottomSheetRef.current?.snapToIndex(number);
  }, []);

  // set the last Field in the
  const settings = useMemo(() => settingsData.map(item => ({
    ...item,
    data:
      item.id === 1 ?
        <DarkMode /> :
        item.id === 2 ?
          <Contact
            bottomSheetRef={bottomSheetRef}
            setStatus={setStatus}
          /> :
          <AreYouSureContainer
            bottomSheetRef={bottomSheetRef}
          />,
  })), []);

  const other = useMemo(() => otherData.map(item => ({
    ...item,
    data: item.id === 1 ? <FeaturesInFuture /> : null,
  })), []);

  const about = useMemo(() => aboutData.map(item => ({
    ...item,
    data: item.id === 2 ? <PrivacyPolicy /> : item.id === 3 ? <Imprint /> :  null,
  })), []);

  ////////////////////////////////////////

  const sections = [
    {
      title: 'Settings',
      data: settings
    },
    {
      title: 'Other',
      data: other
    },
    {
      title: 'About',
      data: about
    },
  ];

  const share = useCallback(async() => {
    try {
      const result = await Share.share({
          title: "Share AIX",
          message: "AIX the AI of you", ///////////////////////////////////////////////////////////////////////
          url: "https://example.de", ///////////////////////////////////////////////////////////////////////////////////
        },
        {
          dialogTitle: "Look at this cool new App!",
          subject: "The cooles App ever!",
          tintColor: customTheme.text,
          }
        );
      if (result?.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("1")
        } else {
          console.log("2")
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("3")
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [])

  const handleAction = useCallback((item: any) => {
    return () => {
      console.log("item title", item.title);
      if (item.title.includes("Share")) {
        share()
          .then(() => console.log("Shared successfully.."));
      } else {
        setNewData(item.data);
        updateModalIndex(2);
      }
    }
  }, [share, setNewData, updateModalIndex]);

  return (
    <View
      style={[localStyles.mainContainer, {backgroundColor: customTheme.primary}]}>
        <View style={styles.container}>
          <SectionList
            style={settingStyles.box2}
            showsVerticalScrollIndicator={false}

            ListHeaderComponent={
              <PlusAdContainer />
            }

            ListFooterComponent={
              <BottomImage />
            }

            sections={sections}
            keyExtractor={(item, index) => item.toString() + index}
            renderItem={({ item }) => (
              <RoundedButton
                item={item}
                action={handleAction(item)}
                list={sections}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={[settingStyles.btnHeading, {color: customTheme.text}]}>
                {title}
              </Text>
            )}
          />
          <SwipeModal
            bottomSheetRef={bottomSheetRef}
            modalIndex={-1}
            Content={
              loading ? (
                <ActivityIndicator size={20}/>
              ) : data ? (
                status === 201 || status === 200 ? (
                  <StatusContainer source={successAuth} text={"Success"} styles={imgStyles.statusImg}
                                   extraContainerStyles={undefined}/>
                ) : status === 400 || status === 401 ? (
                  <StatusContainer source={close} text={"Failed! \n Please try again or contact us."}
                                   styles={imgStyles.statusImg} extraContainerStyles={undefined} />
                ) : (
                  data
                )
              ) : null}
             />
        </View>
    </View>
    );
}


