import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import * as Sharing from "expo-sharing";
import {View} from "react-native";
import {IconButton} from "react-native-paper";
import {themeColors} from "../../../colors/theme";
import {DefaultText} from "../../text/DefaultText";
import {ThemeContext} from "../../../screens/Context";


// @ts-ignore
export const SingleAudio = ({ item, styles, secondaryTextStyles }) => {
  const [isSharingAvailable, setIsSharingAvailable] = useState(false);
  const [play, setPlay] = useState(false);
  const { customTheme } = useContext(ThemeContext);

  useEffect(() => {
    const checkSharingAvailability = async () => {
      const available = await Sharing.isAvailableAsync();
      setIsSharingAvailable(available);
    };
    checkSharingAvailability()
      .then(r => console.log("Sharing set to:", isSharingAvailable));
  }, []);

  useEffect(() => {
    if (play && item.soundAudio !== "") {
      item.soundAudio.setOnPlaybackStatusUpdate((playbackStatus: { didJustFinish: any; isLooping: any; }) => {
        if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
          setPlay(false);
        }
      });
      item.soundAudio.replayAsync();
    }
  }, [play]);

  const checkAudioStatus = useCallback(() => {
    if (play) {setPlay(false)} else {setPlay(true)}
  }, [play])
  // STYLES
  const singleAuduioContainerStyles = [styles[item.class],
    {backgroundColor: customTheme.primaryButton}];

  const shareButton = useMemo(() => {
    if (isSharingAvailable) {
      return <IconButton
        size={17}
        iconColor={themeColors.headerTextLight} icon={"share"}
        onPress={() => {
          Sharing.shareAsync(item.file_id)
            .then(() => console.log("Recorded file successfully shared.."))
            .catch(e => console.log("Cant share the file:", e))
        }
        }
      />
    }
  }, [isSharingAvailable])



  return(
    <View style={singleAuduioContainerStyles}>
      <View style={[styles.audioInfoBox, {left: 0}]}>
        <IconButton iconColor={"white"} icon={play? "pause" : "play"} onPress={checkAudioStatus} />
        <DefaultText text={item.duration} moreStyles={secondaryTextStyles}/>
      </View>
      <View style={[styles.audioInfoBox, {right: -8, bottom: -12}]}>
        <DefaultText text={item.timeToken} moreStyles={secondaryTextStyles}/>
        {shareButton}
      </View>
    </View>
  );
}
