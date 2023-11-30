import React, {useContext, useEffect} from "react";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import {DefaultPageNavigationBtn} from "../../components/buttons/DefaultPageNavigationBtn";
import {themeColors} from "../../colors/theme";
import {useNavigation, useRoute} from "@react-navigation/native";
import {PrimaryContext} from "../Context";

export const AuthHeader = (back: { name: boolean}) => {

  const { darkmode } = useContext(PrimaryContext);
  const route = useRoute();

  useEffect(() => {
    console.log("routeName:", route.name);
    console.log("darkmode AuthHeader", darkmode);
  }, []);
  const navigation = useNavigation()

  return (
    <DefaultHeader
      back={back}
      childrenMiddle={
        <>
          <DefaultPageNavigationBtn
            text={"Sign In"}
            // @ts-ignore
            onPressAction={
              () => {
              // @ts-ignore
                navigation.navigate("AuthNavigator", {screen: "Login"})
              console.log("routeName2", route.name)}}
            extraTextStyles={{
              color: route.name === "Login" ? darkmode ? "white" : "rgb(0,0,0)" : "rgb(255,255,255)",
              fontSize: 16,
              textAlign: "center"
            }}
            extraBtnStyles={[{
              backgroundColor: route.name === "Login" ? "transparent" : themeColors.sexyBlue
            }]}
          />
          <DefaultPageNavigationBtn
            text={"Sign Up"}
            // @ts-ignore
            onPressAction={() => navigation.navigate("SignUp")}
            extraTextStyles={{
              color: route.name === "SignUp" ? darkmode ? "white" : "rgb(0,0,0)" : "rgb(255,255,255)",
              fontSize: 16,
              textAlign: "center"
            }}
            extraBtnStyles={{
              backgroundColor: route.name === "SignUp" ? "transparent" : themeColors.sexyBlue
            }}
          />
      </>
    }
      childrenRight={undefined}
      extraStyles={undefined}
    />
  );
}
