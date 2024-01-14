import {DefaultContainer} from "../DefaultContainer";
import {HeadingText} from "../../text/HeadingText";
import {DefaultText} from "../../text/DefaultText";
import {View} from "react-native";

import React, {memo, useContext, useMemo} from "react";
import {styles} from "../contiStyles";
import {ThemeContext} from "../../../screens/Context";
import { StyleSheet } from "react-native";

const localStyles = StyleSheet.create(
  {
    footerMainContainer: {
      marginVertical: 40,
      justifyContent: "center",
      alignItems: "center"
    },
    extraTextStyles: {
      fontSize: 16,
      marginTop: 30,
      textAlign: "center",
      lineHeight: 50,
    },
    extraDefaultContainerStyles: {
      paddingVertical: 40,
    },
    sectionContainer: {
      paddingVertical: 30
    }
  }
)

// STRINGS
const notHere: string = "Do you have any ideas for future tools?";
const contactFeatureText:string = "Please fill out the Contact Form with your wishes. \nWe will contact you ASAP.";
const featuresInFuture: string = "Features in Future";

const FeaturesInFuture: React.FC = () => {

  const { customTheme } = useContext(ThemeContext);
  const extraTextStyles = [localStyles.extraTextStyles, {color: customTheme.text}];

  const moreTextStyles  = {fontSize: 18, color: customTheme.text};

  let features = [
    "Cook assistant",
    "Text from Image converter",
    "Partnerships(Contact us)",
  ]

  // @ts-ignore
  const renderItem = ({ item }) => (
    <View style={[styles.featuresContainer, { backgroundColor: customTheme.modalColor, borderColor: customTheme.text }]}>
      <DefaultText
        text={item}
        moreStyles={moreTextStyles}
      />
    </View>
  );

  const sections = useMemo(() => {
    return features.map((item, index) => ({
      title: `Section ${index}`,
      data: [item],
    }));
  }, [features]);

  const sectionHeaderComponent = useMemo(() => {
    return () =>
      <HeadingText
        text={featuresInFuture}
        extraStyles={undefined}
      />
  }, []);



  return(
    <DefaultContainer
      extraStyles={localStyles.extraDefaultContainerStyles}>
      <View style={localStyles.sectionContainer}>

        <View style={localStyles.footerMainContainer}>
          <DefaultText
            text={notHere}
            moreStyles={extraTextStyles}
          />
          <DefaultText
            text={contactFeatureText}
            moreStyles={extraTextStyles}/>
        </View>

      </View>
    </DefaultContainer>
  );
}

export default memo(FeaturesInFuture);


