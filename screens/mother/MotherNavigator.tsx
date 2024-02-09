import React, {memo, useContext, useEffect, useMemo} from "react";
import {ToolContext} from "../Context";
import {showToolAds} from "../chat/functions/AdLogic";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MotherMain from "./MotherMain";

const MotherStack = createNativeStackNavigator();

const MotherNavigator: React.FC = () => {

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
    <MotherStack.Navigator
      initialRouteName="MotherMain"
      screenOptions={screenHeaderOptions}>

      <MotherStack.Screen
        options={{ headerShown: false }}
        name="MotherMain"
        component={MotherMain}
      />

    </MotherStack.Navigator>
  )
}
export default memo(MotherNavigator);