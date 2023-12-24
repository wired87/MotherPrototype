import {DefaultContainer} from "../DefaultContainer";
import {HeadingText} from "../../text/HeadingText";
import {DefaultText} from "../../text/DefaultText";
import {View} from "react-native";
import {DefaultButton} from "../../buttons/DefaultButton";
import {useSelector} from "react-redux";

import React, {memo, useContext, useMemo} from "react";
import {styles} from "../contiStyles";
import {ThemeContext} from "../../../screens/Context";
import {BottomSheetSectionList} from "@gorhom/bottom-sheet";
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


// @ts-ignore
const FeaturesInFuture = () => {
  // @ts-ignore
  const text = useSelector(state => state.text.value);

  const { customTheme } = useContext(ThemeContext);
  const extraTextStyles = [localStyles.extraTextStyles, {color: customTheme.text}];

  const moreTextStyles  = {fontSize: 18, color: customTheme.text};

  let features = [
    "Speech to Text",
    "Job Application creator",
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
        text={text.featuresInFuture}
        extraStyles={undefined}
      />
  }, [])


  const sectionFooterComponent = useMemo(() => {
    return(
      <View style={localStyles.footerMainContainer}>
        <DefaultText
          text={text.notHere}
          moreStyles={extraTextStyles}
        />
        <DefaultText
          text={text.contactFeatureText}
          moreStyles={extraTextStyles}/>
      </View>
    );
  }, [])

  return(
    <DefaultContainer
      extraStyles={localStyles.extraDefaultContainerStyles}>
      <View style={localStyles.sectionContainer}>
        <BottomSheetSectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          ListHeaderComponent={sectionHeaderComponent}
          ListFooterComponent={sectionFooterComponent}
        />
      </View>
    </DefaultContainer>
  );
}

export default memo(FeaturesInFuture);


/*

  const featuresLoop = useMemo(() => {
    return() =>
      features.map((item, index) => {


          <View
            style={styles.featuresContainer}
            key={index}>
            <DefaultText
              text={item}
              moreStyles={moreTextStyles}
            />
          </View>
})
}, [])
 */