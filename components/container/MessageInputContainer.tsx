import {DefaultContainer} from "./DefaultContainer";
import {Dimensions, TextInput, TouchableOpacity, View} from "react-native";
import {DefaultInput} from "../input/DefaultInput";
import {styles} from "./contiStyles";
import {IconButton} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {themeColors} from "../../colors/theme";
import {TypeIndicator} from "../animations/TypeIndicator";
import {BreakButton} from "../buttons/BreakButton";

const windowWidth = Dimensions.get('window').width;

// @ts-ignore
export const MessageInputContainer = ({ valueInput, onChange, typing, messageBreakOption, setMessageFinalBreak,sendMessage }) => {
  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value)

  return(
    <DefaultContainer
      extraStyles={{ marginTop: 20, backgroundColor: "transparent", position: "relative", justifyContent: "center", alignItems: "center",
        flexDirection: "column", bottom: -5}} >
      <View style={{flexDirection: "row", width: windowWidth, justifyContent: "space-between",
        marginBottom: 7, alignItems: "center"}}>
        {typing ? (
          <View style={{ justifyContent: "flex-start",
            alignItems: "flex-start", width: windowWidth * .5, paddingLeft: 20 }}>
            <TypeIndicator />
          </View>
        ) : null}
        {messageBreakOption? (
          <View style={{ width: windowWidth * .5, justifyContent: "center", alignItems: "center"}}>
            <BreakButton
              extraStyles={{justifyContent: "center", alignItems: "center"}}
              onPress={() => {setMessageFinalBreak(true)}}
            />
          </View>
        ):null}
      </View>
      <View style={{flexDirection: "row"}}>
        <TextInput style={[styles.chatMessageInput,
          {backgroundColor: darkmode? "rgba(255,255,255,.7)" : themeColors.dotNineWhite}]}
                   placeholder={"Ask something!"}
                   value={valueInput}
                   onChangeText={(val) => onChange(val)}
                   multiline={true}
        />

        {valueInput?.trim().length > 0? (
          <TouchableOpacity
            onPress={() => onChange(null)}
            style={{position: "absolute", top: 6, zIndex: 90,  right: 35, borderWidth: 1, borderRadius: 50, borderColor: themeColors.borderThin,
              paddingVertical: 0, paddingHorizontal: 0,
            }}>
            <MaterialCommunityIcons name={"close"} size={17}/>
          </TouchableOpacity>
        ):null}
        <MaterialCommunityIcons
          name={"atlassian"} size={25}
          onPress={() => {
            !typing && valueInput?.length >= 1 && valueInput.trim().length > 0 ?
              sendMessage().then(() => console.log("Successfully sent Message")) :
              console.log("Already Sent Message, length === 0 or just whitespace")
          }}
          style={{ marginRight: 5, color:darkmode.headerIconColors, transform: [{ rotate: '90deg'}]}}
        />
      </View>
    </DefaultContainer>
  );
}