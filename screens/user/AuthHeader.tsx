import React, {memo, useCallback, useContext, useEffect, useMemo} from "react";
import DefaultHeader from "../../components/navigation/DefaultHeader";
import DefaultPageNavigationBtn from "../../components/buttons/DefaultPageNavigationBtn";
import {useNavigation, useRoute} from "@react-navigation/native";
import {PrimaryContext, ThemeContext} from "../Context";

const AuthHeader = () => {

  const { darkmode } = useContext(PrimaryContext);

  const route = useRoute();

  const { customTheme } = useContext(ThemeContext);

  const loginBtnColor =
    route.name === "Login" ? darkmode ? "white" : "rgb(0,0,0)" : "rgb(255,255,255)";

  const registerBtnColor =
    route.name === "SignUp" ? darkmode ? "white" : "rgb(0,0,0)" : "rgb(255,255,255)";

  const loginBtnBackgroundColor =
    route.name === "Login" ? "transparent" : customTheme.primaryButton;

  const registerBtnBackgroundColor =
    route.name === "SignUp" ? "transparent" : customTheme.primaryButton;

  useEffect(() => {
    console.log("routeName:", route.name);
    console.log("darkmode AuthHeader", darkmode);
  }, []);

  const navigation = useNavigation()

  const navigateAuth = useCallback((screen: string) => {
    // @ts-ignore
    return navigation.navigate(screen);
  }, []);


  const shouldShowAuthNavigationButtons = useCallback(() => {
    return [
      "Login",
      "SignUp"].includes(route.name);
  }, [route.name]);

  const showAuthButtons = useMemo(() => {
    return shouldShowAuthNavigationButtons() ? (
      <>
        <DefaultPageNavigationBtn
          text={"Sign In"}
          onPressAction={() => navigateAuth("Login")}
          extraTextStyles={{
            color: loginBtnColor,
            fontSize: 16,
            textAlign: "center"
          }}
          extraBtnStyles={{
            backgroundColor: loginBtnBackgroundColor
          }}
        />
        <DefaultPageNavigationBtn
          text={"Sign Up"}
          onPressAction={() => navigateAuth("SignUp")}
          extraTextStyles={{
            color: registerBtnColor,
            fontSize: 16,
            textAlign: "center"
          }}
          extraBtnStyles={{
            backgroundColor: registerBtnBackgroundColor
          }}
        />
      </>
    ) : null;
  }, [shouldShowAuthNavigationButtons, navigateAuth, loginBtnColor, loginBtnBackgroundColor, registerBtnColor,
    registerBtnBackgroundColor]);

  return (
    <DefaultHeader
      childrenRight={undefined}
      extraStyles={undefined}
      childrenMiddle={showAuthButtons}
    />
  );
}

export default memo(AuthHeader);
