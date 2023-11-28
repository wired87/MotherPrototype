import React, {useCallback, useContext, useMemo, useRef, useState} from 'react'
import {
  View,
  Animated,
  ActivityIndicator, StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {LinearGradient} from "expo-linear-gradient";
import {useSelector} from "react-redux";
import {styles} from "../../components/styles"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {SmallFlatLoop} from "../../components/flatlist/SmallFlatLoop";
import { SwipeModal } from '../../components/modals/SwipeModal';
import AreYouSureContainer from "../../components/container/AreYouSureContainer";
import Contact from "../../components/container/modalContainers/Contact";
import FeaturesInFuture from "../../components/container/modalContainers/FeaturesInFuture";
import DarkMode from "../../components/container/modalContainers/DarkMode";
import PrivacyPolicy from "./PrivacyPolicy";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
// @ts-ignore
import successAuth from "../../assets/images/successAuth.png";
// @ts-ignore
import close from "../../assets/images/close.png";

import {StatusContainer} from "../../components/container/modalContainers/StatusContainer";
import { imgStyles } from '../../components/images/imgStyles';
import {PrimaryContext, ThemeContext} from "../Context";
import {Imprint} from "./Imprint";
import BottomSheet from "@gorhom/bottom-sheet";

interface IconProps {
  name: string,
  size: string | number,
  color: string
}

interface loopDataTypes {
  id: number,
  icon: React.ReactElement,
  title: string,
  navigate: string,
}

let settingsData = [
  {
    id: 1,
    icon: <Icon name="theme-light-dark" size={26} color="white" />,
    title: "Theme",
    navigate: "",

  },
  {
    id: 2,
    icon: <Icon name="help-box" size={26} color="white" />,
    title: "Help and Contact",
    navigate: "",
  },
  {
    id: 3,
    icon: <MaterialCommunityIcons name={"trash-can-outline"} size={26} color="white" />,
    title: "Delete History",
    navigate: "",
  },
]

let otherData = [
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

let aboutData = [
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
  {
    id: 3,
    icon: <Icon name="security" size={26} color="white" />,
    title: "Imprint",
    navigate: "",
  },
]

/*
ts-ignore (If you are doing this you are likely doing something wrong)
any as type (If you are doing this you are creating a lot of technical debt)
TouchableOpacity (just use Pressable as they recommend in the RN docs) ------------------
Inline styles, why not just use a Stylesheet instead. Also I would probably create a wrapper for it with your theme,
you can look at unistyles for some inspiration, you have a theme but are still hardcoding colors?
You are mapping through a lot of data but not using a FlatList / FlashList for it, could any of these lists contain a --------------------
lot of data, if so it would probably create some performance issues. -----------------------------------------------
Storing the bottomSheetRef within a context seems rather odd to me -------------------------------------------------
*/

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

  const bottomSheetRef = useRef<BottomSheet>(null);

  const setNewData = useCallback((value: any) => setData(value), []);
  const setNewStatus = useCallback((value: any) => setStatus(value), []);

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
          <Contact bottomSheetRef={bottomSheetRef}/> :
          <AreYouSureContainer bottomSheetRef={bottomSheetRef}/>,
  })), []);

  const other = useMemo(() => otherData.map(item => ({
    ...item,
    data: item.id === 1 ? <FeaturesInFuture /> : null,
  })), []);

  const about = useMemo(() => aboutData.map(item => ({
    ...item,
    data: item.id === 2 ? <PrivacyPolicy /> : item.id === 3 ? <Imprint /> :  null,
  })), []);

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
  return (
    <View
      style={[localStyles.mainContainer, {backgroundColor: customTheme.primary}]}>
        <View style={styles.container}>
          <SmallFlatLoop
            openModal={updateModalIndex}
            setData={setNewData}
            list={sections}
           />
          <SwipeModal
            bottomSheetRef={bottomSheetRef}
            modalIndex={-1}
            Content={
              loading ? (
                <ActivityIndicator size={10}/>
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