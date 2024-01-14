import React, {lazy, memo, useCallback, useContext, useMemo, useRef, useState} from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  SectionList,
  Linking,
} from 'react-native'


import {styles} from "../../components/styles"
import SwipeModal from '../../components/modals/SwipeModal';
import AreYouSureContainer from "../../components/container/AreYouSureContainer";
import Contact from "../../components/container/modalContainers/Contact/Contact";
import FeaturesInFuture from "../../components/container/modalContainers/FeaturesInFuture";
import DarkMode from "../../components/container/modalContainers/DarkMode";
import successSent from "../../assets/animations/successSent.json";

import {PrimaryContext, SettingsContext, ThemeContext} from "../Context";
import Imprint from "./Imprint";
import {settingStyles} from "./settingStyles";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";
import BottomImage from "../../components/images/BottomImage";
import RoundedButton from "../../components/buttons/RoundedButton";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {share} from "../Functions";

import failLottie from "../../assets/animations/failLottie.json";

// STINGS
const termsUrl: string = "https://www.app-privacy-policy.com/live.php?token=NWq13bWUVgAMJFLBRIlHlsxdsSasqurJ";
const privacyUrl: string = "https://www.app-privacy-policy.com/live.php?token=1imlqB2AjBzWW6xCk201qYMelCw2TQm5"
const StatusContainer =
  lazy(() => import("../../components/container/modalContainers/StatusContainer"));



let settingsData = [
  {
    id: 1,
    icon: "theme-light-dark",
    title: "Theme",
    navigate: "",
    component: memo(() => React.createElement(DarkMode))
  },
  {
    id: 2,
    icon: "help-box",
    title: "Help and Contact",
    navigate: "",
    component: memo(() => React.createElement(Contact))
  },
  {
    id: 3,
    icon: "trash-can-outline",
    title: "Delete History",
    navigate: "",
    component: memo(() => React.createElement(AreYouSureContainer))
  }
]

let otherData = [
  {
    id: 1,
    icon: "help-circle",
    title: "Features in Future",
    navigate: "",
    component: memo(() => React.createElement(FeaturesInFuture))
  },
  {
    id: 2,
    icon: "star" ,
    title: "Rate us",
    navigate: "",
    component: null
  },
  {
    id: 3,
    icon: "share",
    title: "Share it with your Friends",
    navigate: "",
    component: null
  },
]

let aboutData = [
  {
    id: 1,
    icon: "note-text",
    title: "Terms of use",
    navigate: "",
    component: null
  },
  {
    id: 2,
    icon: "security",
    title: "Privacy Policy",
    navigate: "",
    component: null
  },
  {
    id: 3,
    icon: "security",
    title: "Imprint",
    navigate: "",
    component: memo(() => React.createElement(Imprint))
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


  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const setNewData = useCallback((value: any) => setData(value), []);


  const { loading } = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);
  const {status} = useContext(SettingsContext);


  const updateModalIndex = useCallback((number: number) => {
    bottomSheetRef.current?.snapToIndex(number);
  }, []);


  const statusData = useMemo(() => {
    if (loading) {
      return <ActivityIndicator size={20} />
    } else if (status == 201 || status == 200) {
      return <StatusContainer
                source={successSent}
                text={"Success!"}
                helpText={"We have received your Message and contact you ASAP!"}
              />
    } else if (status == 400 || status == 401 || status == 500) {
      return <StatusContainer
        source={failLottie}
        text={"Failed!\n"}
        helpText={"Please try again or send us your E-Mail directly at info@sales-detective.live."}
      />;
    } else if (status == 300){
      return <StatusContainer
        source={failLottie}
        text={"Authentication Error\n"}
        helpText={"We could not authenticate you. \n Please write us your E-Mail directly at info@sales-detective.live"}
      />;
    } else if (data) {
      return React.createElement(data);
    }
  }, [status, data, loading])


  const sections = [
    {
      title: 'General',
      data: settingsData
    },
    {
      title: 'Other',
      data: otherData
    },
    {
      title: 'About',
      data: aboutData
    },
  ];


  const handleAction = useCallback((item: any) => {
    return () => {
      console.log("item title", item.title);
      if (item.title.includes("Share")) {
        share(customTheme)
          .then(() => console.log("Shared successfully.."));
      }else if (item.title.includes("Terms")){
         Linking.openURL(termsUrl)
           .then(() => console.log("Terms successfully linked"))
           .catch(e => console.log("Error while linking Terms:", e));
      }else if (item.title.includes("Privacy")){
         Linking.openURL(privacyUrl)
           .then(() => console.log("Privacy successfully linked"))
           .catch(e => console.log("Error while linking Privacy:", e));
      } else {
        updateModalIndex(2);
        setNewData(item.component);
        console.log("item.data", item.component);
      }
    }
  }, [share]);

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
                action={handleAction}
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
            Content={statusData}
            modalIndex={-1}
          />

        </View>
    </View>
    );
}
/*
import { A } from '@expo/html-elements';
import {userStyles} from "../user/userStyles";
import {memo, useContext} from "react";
import {ThemeContext} from "../Context";


const TermsOfUse = () => {

  const {customTheme} = useContext(ThemeContext);

  const pressableStyles = [userStyles.changeInfoBtn,
    {backgroundColor: customTheme.primaryButton, color: customTheme.text}]

  return(
    <>
      <A style={pressableStyles} href={termsUrl}>Terms and Conditions</A>
    </>
  );
}
export default memo(TermsOfUse)
 */