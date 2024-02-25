import React, {memo, useContext, useEffect, useMemo} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {ToolContext} from "../Context";
import DefaultHeader from "../../components/navigation/DefaultHeader";

import {showToolAds} from "../chat/functions/AdLogic";
import {useRoute} from "@react-navigation/native";
import ToolsMain from "./ToolsMain";
import GoogleAuthScreen from "./google/GoogleAuthScreen";
import EmailAuthScreen from "./email/EmailAuthScreen";
import EmailContactScreen from "./email/EmailContactScreen";

const ToolStack = createNativeStackNavigator();

const ToolsNavigator: React.FC = () => {

  // Context
  const { setToolActionValue, toolActionValue} = useContext(ToolContext);
  const route = useRoute();
  useEffect(() => {
    console.log("ROUTE MOTHER CHANGED:", route.name)
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
        name={"ToolsMain"}
        component={ToolsMain}
      />
      <ToolStack.Screen
        name={"GoogleAuthScreen"}
        component={GoogleAuthScreen}
      />
      <ToolStack.Screen
        name={"EmailAuthScreen"}
        component={EmailAuthScreen}
      />
      <ToolStack.Screen
        name="EmailContact"
        component={EmailContactScreen}
      />
    </ToolStack.Navigator>
  );
}

export default memo(ToolsNavigator);
