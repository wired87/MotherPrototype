import React, {memo, useMemo} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import DefaultHeader from "../../components/navigation/DefaultHeader";


import ToolsMain from "./ToolsMain";
import GoogleAuthScreen from "../../google/GoogleAuthScreen";
import EmailAuthScreen from "./email/EmailAuthScreen";
import EmailContactScreen from "./email/EmailContactScreen";

const ToolStack = createNativeStackNavigator();

const ToolsNavigator: React.FC = () => {

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
