import React, {useEffect, useState} from "react";
import * as Sharing from "expo-sharing";
import {View} from "react-native";
import {IconButton} from "react-native-paper";
import {themeColors} from "../../../colors/theme";
import {DefaultText} from "../../text/DefaultText";
import {DefaultLinearGradient} from "../DefaultLinearGradient";


const colorTop = ['rgba(83,106,155,0.98)', '#2e357c', '#1d155e', '#182173', '#662250', '#6b0e5e']
const colorBottom = ['#181e5d', '#6a6783', '#0f2742', '#453654', '#0e198c']


// @ts-ignore
export const SingleAudio = ({ item, styles, secondaryTextStyles }) => {
  const [isSharingAvailable, setIsSharingAvailable] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const checkSharingAvailability = async () => {
      const available = await Sharing.isAvailableAsync();
      setIsSharingAvailable(available);
    };
    checkSharingAvailability().then(r => console.log("Sharing set to:", isSharingAvailable));
  }, []);

  const checkAudioStatus = () => {
    if (play) {setPlay(false)} else {setPlay(true)}
    if (item.soundAudio !== "") {
      item.soundAudio.setOnPlaybackStatusUpdate((playbackStatus: { didJustFinish: any; isLooping: any; }) => {
        if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
          setPlay(false);
        }
      });
      item.soundAudio.replayAsync();
    }
  }

  return(
    <DefaultLinearGradient linearViewStyles={[styles[item.class],
      item.id % 2 === 0 ? {left: 0} : {right: 0},
      {marginTop: 12, bottom: 0, justifyContent: "space-between", zIndex: 100}]} customTopColor={colorTop}
                           customBottonColor={colorBottom}                           >
      <View style={[styles.audioInfoBox, {position: "absolute", left: 0}]}>
        <IconButton iconColor={"white"} icon={play? "pause" : "play"} onPress={() => {
          checkAudioStatus()
          }}
        />
        <DefaultText text={item.duration} moreStyles={secondaryTextStyles}/>
      </View>
      <View style={[styles.audioInfoBox, {position: "absolute", right: -8, bottom: -12}]}>
        <DefaultText text={item.timeToken} moreStyles={secondaryTextStyles}/>
        {isSharingAvailable? (
          <IconButton
            size={17}
            iconColor={themeColors.headerTextLight} icon={"share"}
            onPress={() => {
              Sharing.shareAsync(item.file_id)
                .then(() => console.log("Recorded file successfully shared.."))
                .catch(e => console.log("Cant share the file:", e))
              }
            }
          />
        ):null}
      </View>
    </DefaultLinearGradient>
  );
}
