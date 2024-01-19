import React, {memo, useContext, useEffect, useMemo} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {ToolContext} from "../Context";
import DefaultHeader from "../../components/navigation/DefaultHeader";

import CardMain from "./Screens/TextScreens/CardMain";
import ToolsMain from "./ToolsMain";
import SpeechToText from "./Screens/SpeechToText";
import ResumeCreator from "./Screens/ResumeCreator/ResumeCreator";
import ChatResponseHelper from "./Screens/ChatResponseHelper";
import MovieFinder from "./Screens/MovieFinder/MovieFinder";
import StoryMain from "./Screens/TextScreens/StoryMain";
import LyricsMain from "./Screens/TextScreens/Lyrics";
import EmailMain from "./Screens/TextScreens/EMail";
import ProductMain from "./Screens/TextScreens/ProductMain";
import FitnessMain from "./Screens/TextScreens/Fitness";
import IdeaFinder from "./Screens/TextScreens/IdeaFinder";
import {showToolAds} from "../chat/functions/AdLogic";

const ToolStack = createNativeStackNavigator();

const ToolsNavigator: React.FC = () => {

  // Context
  const { setToolActionValue, toolActionValue} = useContext(ToolContext);


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
        name="IdeaFinder"
        component={IdeaFinder}
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
