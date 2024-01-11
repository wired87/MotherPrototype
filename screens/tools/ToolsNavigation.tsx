import React, {memo, useContext, useEffect, useMemo} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import SpeechToText from "./Screens/SpeechToText";
import ToolsMain from "./ToolsMain";
import ResumeCreator from "./Screens/ResumeCreator/ResumeCreator";
import {ToolContext} from "../Context";
import {showToolAds} from "../chat/functions/AdLogic";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import ChatResponseHelper from "./Screens/ChatResponseHelper";
import MovieFinder from "./Screens/MovieFinder/MovieFinder";

const ToolStack = createNativeStackNavigator();

const ToolsNavigator = () => {
  const { toolActionValue, setToolActionValue}  = useContext(ToolContext);


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

    </ToolStack.Navigator>
  );
}

export default memo(ToolsNavigator);
