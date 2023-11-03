import {getAuth} from "firebase/auth";
import React, {JSX, useEffect} from "react";
import {DefaultHeader} from "../../components/navigation/DefaultHeader";
import {DefaultPageNavigationBtn} from "../../components/buttons/DefaultPageNavigationBtn";
import {userStyles} from "./userStyles";
import {themeColors} from "../../colors/theme";
import {HeaderView} from "../../components/container/headerContainer";
import {useRoute} from "@react-navigation/native";
import {Dimensions, View} from "react-native";
const windowWidth = Dimensions.get('window').width;
export const UserHeader = (back: { name: boolean}) => {
    const auth = getAuth();
    const user = auth.currentUser;
  const route = useRoute();
  useEffect(() => {

    console.log("routeName:", route.name, "\nback: ", back)
  }, []);

    return (
        // @ts-ignore
        <DefaultHeader
            // @ts-ignore
            back={back}
            visible={true}
            children={
              <>
                {route.name === "Login" || route.name === "SignUp"? (
                  <>
                    <View style={{borderWidth: 2,
                      borderColor: "black",justifyContent: "center", alignItems: "center", width: windowWidth * .5,}}>
                      <DefaultPageNavigationBtn
                        text={"Sign in"}
                        // @ts-ignore
                        onPressAction={() => navigation.navigate("Login")}
                        extraTextStyles={[userStyles.authNavHeaderContainerText,
                          // @ts-ignore
                          {color: route.name === "Login"? themeColors.mediumDarkDark :
                              themeColors.headerText, fontSize: 16}]}
                        extraBtnStyles={[{
                          // @ts-ignore
                          backgroundColor: route.name === "Login" ? "transparent" : themeColors.mediumDarkDark
                        }]}
                      />
                    </View>
                    <View style={{borderWidth: 2,
                      borderColor: "red", justifyContent: "center", alignItems: "center", width: windowWidth * .5,}}>
                      <DefaultPageNavigationBtn
                        text={"Sign up"}
                        // @ts-ignore
                        onPressAction={() => navigation.navigate("Register")}
                        extraTextStyles={[userStyles.authNavHeaderContainerText,
                          // @ts-ignore
                          {color: route.name === "Register"? themeColors.mediumDarkDark :
                              themeColors.headerText, fontSize: 16}]}
                        extraBtnStyles={[{
                          // @ts-ignore
                          backgroundColor: route.name === "Login" ? "transparent" : themeColors.mediumDarkDark
                        }]}
                      />
                    </View >
                  </>
                ):(
                  <>
                  </>
                )}
              </>
            }
        />
    );
}
