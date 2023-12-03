import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';

import {ThemeContext} from "../Context";

import underConstruction from "../../assets/animations/underConstruction.json";
import LottieView from "lottie-react-native";

export const PurchaseScreen = () => {

    const { customTheme } = useContext(ThemeContext)
    const uniStylesLocal = [localStyles.main, {backgroundColor: customTheme.primary}]

    return (
      <View style={uniStylesLocal}>
          <LottieView source={underConstruction} />
      </View>
    );
}

const localStyles = StyleSheet.create(
  {
      main: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          padding: 0,
      }
  }
)





/*

// lists
let optionsData = [
    {
        id: 1,
        text: "Unlimited Access"
    },
    {
        id: 2,
        text: "Unlimited Messages"
    },
    {
        id: 3,
        text: "Access to GPT-4V"
    },
    {
        id: 4,
        text: "No Ads anymore!"
    },
]
const buttonText = [
    {
        id: 1,
        text: "3 Days for FREE after that $5.99/week"
    },
    {
        id: 2,
        text: "$15.47/Month"
    },
    {
        id: 3,
        text: "$39.99/Year"
    }
]


    // @ts-ignore
    const icon = useSelector(state => state.icon.value)

    const handleOptionSelect = (optionId: React.SetStateAction<number>) => {
        if (selected === optionId) {
            // @ts-ignore
            setSelected(null);
        } else {
            // Select the option
            setSelected(optionId);
        }
    }
 <ToggleButton select={selected === 1} setSelect={() => handleOptionSelect(1)} title="3 Days for FREE after that $5.99/week" />
                    <ToggleButton select={selected === 2} setSelect={() => handleOptionSelect(2)} title="$15.47/Month" />
                    <ToggleButton select={selected === 3} setSelect={() => handleOptionSelect(3)} title="$39.99/Year" />
<View style={{ paddingHorizontal: 10 }}>
                  <HeadingText extraStyles={styles.Heading} text={headingText}/>
                  <Text style={styles.SubHeading}>GET ACCESS TO</Text>
              </View>

              <PlusAdContainer />

              <View style={styles.ButtonSection}>
                  {buttonText.map((item, index) => (
                    <ToggleButton key={index} select={selected === item.id} setSelect={() => handleOptionSelect(item.id)} title={item.text} />
                  ))}
                  <View style={styles.BottomTextCont}>
                      <Icon name="lock" size={20} color="#9b9e9b" />
                      <Text style={styles.BottomText}>
                          Safe Payment Process with Google Play. {"\n"}
                          Week-/Monthly Plans can be cancelled at any time
                      </Text>
                  </View>

                  <DefaultButton
                    extraStyles={styles.BottomLastBtn}
                    onPressAction={undefined}
                    text={continuePurchaseText} // <Text style={[styles.BottomLastBtnText, { flex: 1 }]}></Text>
                    secondIcon={
                        <MaterialCommunityIcons name={icon.arrow} size={30} color={"rgba(255,255,255, .6)"} />
                    }
                  />
              </View>
 */