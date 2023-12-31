import React, {memo, useMemo, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import SpeechToText from "./Screens/SpeechToText";
import ToolsMain2 from "./ToolsMain2";
import ResumeCreator from "./Screens/ResumeCreator/ResumeCreator";
import {ResumeContext} from "../Context";

const ToolStack = createNativeStackNavigator();

const ToolsNavigator = () => {
  const [resume, setResume] = useState<string>("")


  const screenHeaderOptions = useMemo(() => ({
    header: () => null,
  }), []);

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
          <ResumeContext.Provider value={[resume, setResume]}>
            <ResumeCreator />
          </ResumeContext.Provider>
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