import {getAuth} from "firebase/auth";
import React, {JSX, useEffect} from "react";
import {DefaultHeader} from "../../components/navigation/DefaultHeader";
import {DefaultPageNavigationBtn} from "../../components/buttons/DefaultPageNavigationBtn";
import {userStyles} from "./userStyles";
import {themeColors} from "../../colors/theme";
import {HeaderView} from "../../components/container/headerContainer";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Dimensions, View} from "react-native";
import {Appbar} from "react-native-paper";
import {useSelector} from "react-redux";
const windowWidth = Dimensions.get('window').width;
export const UserHeader = (back: { name: boolean}) => {
    const auth = getAuth();
    const user = auth.currentUser;
  const route = useRoute();
  useEffect(() => {

    console.log("routeName:", route.name)
  }, []);
  const navigation = useNavigation()
  // @ts-ignore
  const darkmode = useSelector(state => state.darkmode.value);
    // @ts-ignore
  return (

    <DefaultHeader
      back={back}
      visible={true}
      children={<>
        {route.name === "Login" || route.name === "SignUp" ? (
          <>
            <View
              style={{justifyContent: "flex-start", alignItems: "flex-end", width: windowWidth * .5, height: "100%",
                backgroundColor: darkmode.primary //////////////////
            }}>
              <Appbar.Action
                icon="less-than"
                style={{left: 5, position: "absolute", zIndex: 900000}}
                color={"rgba(0, 0, 0, .8)"}
                size={27}
                iconColor={darkmode.headerIconColors}
                // @ts-ignore
                onPress={() => {
                  navigation.goBack();
                }}/>
              <DefaultPageNavigationBtn
                text={"Sign in"}
                // @ts-ignore
                onPressAction={() => navigation.navigate("Login")}
                extraTextStyles=
                {// @ts-ignore
                  {
                    color: route.name === "Login" ? darkmode.bool? "white" : "rgb(0,0,0)" : "rgb(255,255,255)",
                    fontSize: 16,
                    textAlign: "center"
                  }
                }
                extraBtnStyles={[{
                  backgroundColor: route.name === "Login" ? "transparent" : themeColors.sexyBlue
                }]}/>
            </View>
            <View
              style={{justifyContent: "flex-start", alignItems: "flex-start", width: windowWidth * .5, height: "100%"}}>
              <DefaultPageNavigationBtn
                text={"Sign up"}
                // @ts-ignore
                onPressAction={() => navigation.navigate("SignUp")}
                extraTextStyles={
                  // @ts-ignore
                  {
                    color: route.name === "SignUp" ? darkmode.bool? "white" : "rgb(0,0,0)" : "rgb(255,255,255)",
                    fontSize: 16,
                    textAlign: "center"
                  }}
                extraBtnStyles={{
                  backgroundColor: route.name === "SignUp" ? "transparent" : themeColors.sexyBlue
                }}/>
            </View>
          </>
        ) : (
          <>
          </>
        )}
      </>} extraStyles={undefined} statement={undefined} route={undefined}    />
    );
}
