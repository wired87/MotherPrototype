import React, {memo, useCallback, useContext, useEffect} from "react";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import DefaultPageNavigationBtn from "../../components/buttons/DefaultPageNavigationBtn";
import {useNavigation, useRoute} from "@react-navigation/native";
import {PrimaryContext, ThemeContext} from "../Context";

const AuthHeader = () => {

  const { darkmode } = useContext(PrimaryContext);

  const route = useRoute();

  const { customTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("routeName:", route.name);
    console.log("darkmode AuthHeader", darkmode);
  }, []);

  const navigation = useNavigation()

  const navigateAuth = useCallback((screen: string) => {
    // @ts-ignore
    return navigation.navigate(screen);
  }, []);

  const btnColor = useCallback((screen: string) => {
    return route.name === screen ? darkmode ? "white" : "rgb(0,0,0)" : "rgb(255,255,255)"
  }, [])

  const btnBackgroundColor = useCallback((screen: string) => {
    return route.name === screen ? "transparent" : customTheme.primaryButton
  }, [])

  return (
    <DefaultHeader
      childrenMiddle={
        <>
          <DefaultPageNavigationBtn
            text={"Sign In"}
            onPressAction={navigateAuth("Login")}
            extraTextStyles={{
              color: btnColor("Login"),
              fontSize: 16,
              textAlign: "center"
            }}
            extraBtnStyles={{
              backgroundColor: btnBackgroundColor("Login")
            }}
          />
          <DefaultPageNavigationBtn
            text={"Sign Up"}
            onPressAction={navigateAuth("SignUp")}
            extraTextStyles={{
              color: btnColor("SignUp"),
              fontSize: 16,
              textAlign: "center"
            }}
            extraBtnStyles={{
              backgroundColor: btnBackgroundColor("SignUp")
            }}
          />
      </>
    }
      childrenRight={undefined}
      extraStyles={undefined}
    />
  );
}

export default memo(AuthHeader);
