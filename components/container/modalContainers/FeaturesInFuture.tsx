import {DefaultContainer} from "../DefaultContainer";
import {HeadingText} from "../../text/HeadingText";
import {DefaultText} from "../../text/DefaultText";
import {View} from "react-native";
import {DefaultButton} from "../../buttons/DefaultButton";
import {useNavigation} from "@react-navigation/native";
import {Contact} from "./Contact";
import {useDispatch, useSelector} from "react-redux";
import {DefaultFlatList} from "../../flatlist/DefaultFlatList";
import {SingleMessage} from "../chat/SingleMessage";
import {chatStyles} from "../../../screens/chat/chatStyles";
import React from "react";
import {styles} from "../contiStyles";

// @ts-ignore
export const FeaturesInFuture = ({ setData, contactScreen }) => {

  let features = [
    "Speech to Text",
    "Text to Speech",
    "Website scanner(Pro)",
    "Cook assistant",
    "Translator(the best)",
    "Partnerships(Contact me)",
  ]

  // @ts-ignore
  const text = useSelector(state => state.text.value)

  const redirect = () => {
    setData(contactScreen)
  }

  return(
    <DefaultContainer
      extraStyles={undefined}>
      <HeadingText
        text={text.featuresInFuture}
        extraStyles={undefined} />
      <View>
        {features.map((item, index) => {
          return(
            <View
              style={styles.featuresContainer}
              key={index}>
              <DefaultText
                text={item}
                moreStyles={{fontSize: 18}} />
            </View>
          );
        })}
      </View>
      <View>
        <DefaultText
          text={text.notHere}
          moreStyles={{fontSize: 16, fontWeight: "bold", marginTop: 30}}/>
        <DefaultText
          text={text.contactFeatureText}
          moreStyles={undefined}/>
        <DefaultButton
          extraStyles={undefined}
          onPressAction={redirect}
          text={text.contact}
          secondIcon={undefined}
        />
      </View>
    </DefaultContainer>

  );
}