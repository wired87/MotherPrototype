import React, {memo, useContext, useEffect, useMemo} from "react";
import {ToolContext} from "../Context";
import {showToolAds} from "../chat/functions/AdLogic";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MotherMain} from "./MotherMain";
import MotherTools from "./MotherTools";
import HeaderButton from "../../components/buttons/navigation/HeaderButton";
import {motherMainStyles as mms} from "./styles";
import {useNavigation, useRoute} from "@react-navigation/native";
import EmailAuthScreen from "./ToolScreens/EmailAuthScreen";
import {startListening, stopListening} from "../../AppFunctions/AppFunctions";

const MotherStack = createNativeStackNavigator();

const MotherNavigator: React.FC = () => {
  const navigation = useNavigation()

  // Context
  const { setToolActionValue, toolActionValue} = useContext(ToolContext);

  // GOOGLE MOBILE AD LOGIC ////////////////////
  useEffect(() => {
    console.log("Real toolActionValue:", toolActionValue)
    showToolAds(toolActionValue, setToolActionValue)
      .then(() => console.log("Ads successfully showed. Refilled the Messages"));
  }, [toolActionValue]);

  const navigate = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  }
  const route = useRoute();


  // VOICE LISTENER LOGIC
  useEffect(() => {
    console.log("ROUTE NAME:", route.name);
    if (route.name === "MotherMain" || route.name === "MotherNavigator") {
      startListening()
        .then(() => {
            console.log("Start listening...");
          }
        )
    } else {
      stopListening()
        .then(() => {
            console.log("Route name changed Stop Listening...");
          }
        )
    }
  }, [route.name]);


  const screenHeaderOptions = useMemo(() => ({
    header:
      () =>
        <DefaultHeader
          childrenRight={
            <HeaderButton
              action={
                () => navigate("MotherTools")
              }
              icon={"align-horizontal-right"}
              eS={mms.marginVertical10}
            />
          }
        />
  }), []);

  return(
    <MotherStack.Navigator
      initialRouteName="MotherMain"
      screenOptions={screenHeaderOptions}>

      <MotherStack.Screen
        name="MotherMain"
        component={MotherMain}
      />

      <MotherStack.Screen
        name="MotherTools"
        component={MotherTools}
      />

      <MotherStack.Screen
        name="EmailAuthScreen"
        component={EmailAuthScreen}
      />

    </MotherStack.Navigator>
  )
}
export default memo(MotherNavigator);