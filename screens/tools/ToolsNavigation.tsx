import React, {memo, useContext, useEffect, useMemo, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import SpeechToText from "./Screens/SpeechToText";
import ToolsMain2 from "./ToolsMain2";
import ResumeCreator from "./Screens/ResumeCreator/ResumeCreator";
import {ResumeContext, ToolContext} from "../Context";
import {showToolAds} from "../chat/functions/AdLogic";

const ToolStack = createNativeStackNavigator();

const ToolsNavigator = () => {
  const { toolActionValue, setToolActionValue}  = useContext(ToolContext);

  const screenHeaderOptions = useMemo(() => ({
    header: () => null,
  }), []);

  // GOOGLE MOBILE AD LOGIC ////////////////////
  useEffect(() => {
    console.log("Real toolActionValue:", toolActionValue)
    showToolAds(toolActionValue, setToolActionValue)
      .then(() => console.log("Ads successfully showed. Refilled the Messages"));
  }, [toolActionValue]);

  return(
    <ToolStack.Navigator
      initialRouteName="ToolsMain2" screenOptions={screenHeaderOptions}>

      <ToolStack.Screen
        name="ToolsMain2"
        component={ToolsMain2}
      />

      <ToolStack.Screen
        name="Speech-to-Text"
        component={SpeechToText}
      />
      <ToolStack.Screen
        name="ResumeCreator"
        children={
        () =>
            <ResumeCreator />
      }
      />

    </ToolStack.Navigator>
  );
}

export default memo(ToolsNavigator);


/*
<ToolStack.Screen
        name="MediaFinder"
        component={SpeechToText}
      />

      <ToolStack.Screen
        name="ResumeCreator"
        component={SpeechToText}
      />

      <ToolStack.Screen
        name="DocumentEditor"
        component={SpeechToText}
      />
 */