import React, {memo, useCallback, useContext, useEffect, useMemo} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";


import {PrimaryContext, ThemeContext, ToolContext} from "../Context";
import {showToolAds} from "../chat/functions/AdLogic";
import DefaultHeader from "../../components/navigation/DefaultHeader";

import UniversalCardScreens from "./Screens/TextScreens/Cards/CardContent";
import {sendObject} from "../chat/functions/SendProcess";
import {getToken} from "../../AppFunctions";
import {useRoute} from "@react-navigation/native";
import CardMain from "./Screens/TextScreens/Cards/CardMain";
import ToolsMain from "./ToolsMain";
import SpeechToText from "./Screens/SpeechToText";
import ResumeCreator from "./Screens/ResumeCreator/ResumeCreator";
import ChatResponseHelper from "./Screens/ChatResponseHelper";
import MovieFinder from "./Screens/MovieFinder/MovieFinder";
import StoryMain from "./Screens/TextScreens/Story/StoryMain";
import LyricsMain from "./Screens/TextScreens/Lyrics";
import EmailMain from "./Screens/TextScreens/EMail";
import ProductMain from "./Screens/TextScreens/Product/ProductMain";
import FitnessMain from "./Screens/TextScreens/Fitness";

const ToolStack = createNativeStackNavigator();


interface Screens {
  id: string;
  name: string;
  type: string;
  heading: string;
}


const screenFields: Screens[] = [
  {
    id: "CardWriter",
    name: "Christmas Card",
    heading: "Christmas Card creator",
    type: "christmasCard",
  }
]

/*
 content,
    placeholder,
    extraContent,
    type
 */

const ToolsNavigator: React.FC = () => {

  // Context
  const { setToolActionValue,
    toolActionValue, setResponse} = useContext(ToolContext);

  const {setFieldError, setError} = useContext(PrimaryContext);

  const route = useRoute();

  useEffect(() => {
    setResponse("");
    setError("");
    setFieldError(false); // + bei closed bottomsheet
  }, [route.name]);



  // GOOGLE MOBILE AD LOGIC ////////////////////
  useEffect(() => {
    console.log("Real toolActionValue:", toolActionValue)
    showToolAds(toolActionValue, setToolActionValue)
      .then(() => console.log("Ads successfully showed. Refilled the Messages"));
  }, [toolActionValue]);

  const screenHeaderOptions = useMemo(() => ({
    header: () => <DefaultHeader />,
  }), []);


  return(
    <ToolStack.Navigator
      initialRouteName="ToolsMain"
      screenOptions={screenHeaderOptions}>

      <ToolStack.Screen
        name="ToolsMain"
        component={ToolsMain}
      />

      <ToolStack.Screen
        name="Speech-to-Text"
        component={SpeechToText}
      />

      <ToolStack.Screen
        name="ResumeCreator"
        component={ResumeCreator}
      />

      <ToolStack.Screen
        name="ChatResponseHelper"
        component={ChatResponseHelper}
      />

      <ToolStack.Screen
        name="MovieFinder"
        component={MovieFinder}
      />

      <ToolStack.Screen
        name={"CardWriter"}
        component={CardMain}
      />

      <ToolStack.Screen
        name={"ProductWriter"}
        component={ProductMain}
      />

      <ToolStack.Screen
        name={"StoryWriter"}
        component={StoryMain}
      />

      <ToolStack.Screen
        name={"LyricWriter"}
        component={LyricsMain}
      />

      <ToolStack.Screen
        name={"FitnessWriter"}
        component={FitnessMain}
      />

      <ToolStack.Screen
        name={"EmailWriter"}
        component={EmailMain}
      />

    </ToolStack.Navigator>
  );
}

export default memo(ToolsNavigator);
