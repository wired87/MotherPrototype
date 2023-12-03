
import React, {useContext, memo} from "react";
import { SectionList, Share, Text } from "react-native";
import { settingStyles } from "../../screens/settings/settingStyles";
import {themeColors} from "../../colors/theme";
import {PlusAdContainer} from "../container/PlusPlanContainer/PlusPlanContainer";
import {BottomImage} from "../images/BottomImage";
import {ThemeContext} from "../../screens/Context";
import RoundedButton from "../buttons/RoundedButton";

// Typdefinitionen (als Beispiel, passen Sie diese entsprechend an)
type Item = {
  title: string;
  icon: string;
  id: React.Key;
  data: any; // Definieren Sie einen genaueren Typ, falls möglich
};

interface SmallFlatLoopProps {
  list: any[];
  setData: (data: any) => void;
  openModal: (number: number) => void;
}

const SmallFlatLoop: React.FC<SmallFlatLoopProps> = (
  { list, setData, openModal }
  ) => {
  const { customTheme } = useContext(ThemeContext);
  const share = async () => {
    try {
      const result = await Share.share({
          title: "Share this App",
          message: "Your https://example.de", ///////////////////////////////////////////////////////////////////////
          url: "https://example.de", ///////////////////////////////////////////////////////////////////////////////////
        },
        {
          dialogTitle: "Look at this cool new App!",
          subject: "The cooles App ever!",
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
      console.log(error.message);
    }
  }

  const handleAction = (item: Item) => {
    if (item.title === "Share it with your friends") {
      share()
        .then(() => console.log("Shared successfully.."))
    } else {
      setData(item.data);
      openModal(2);
    }
  }

  return (
      <SectionList
        style={settingStyles.box2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <PlusAdContainer />
        }
        ListFooterComponent={
          <BottomImage />
        }
        sections={list}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <RoundedButton
            item={item}
            action={() => handleAction(item)}
            list={list}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[settingStyles.btnHeading, {color: customTheme.text}]}>{title}</Text>
        )}
      />
  );
}

export default SmallFlatLoop;


/*
  return (
    <>
      <Text style={[settingStyles.btnHeading, { color: colors.text[darkmode? 1 : 0] }]}>
        {headingText}
      </Text>
      <View style={settingStyles.box2}>
        {list.map((item: { title: any; icon: any; id: any; data?: any; }, index: number) => (
          <Pressable
            key={item.id}

            <View style={styles.TouchableView}>
              <View style={styles.box2Icon}>
                {item.icon}
              </View>
              <Text style={styles.buttonText}>{item.title}</Text>
            </View>
            <MIcon name="arrow-forward-ios" size={16} color="#40434f" />
          </Pressable>
        ))}
      </View>
    </>
  );
};

 */