import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AccountMain} from "./Account";
import {PasswordChangeComponent} from "./ChangePassword";
import {EmailChange} from "./ChangeEmail/ChangeEmail";
import {Logout} from "./Logout";
import Login from "./Login";
import {SignUp} from "./SignUp";
import {EmailConfirmationFP} from "./ForgotPassword/EmailConfirmationFP";
import {NewPasswordConfirmation} from "./ForgotPassword/NewPasswordConfirmation";
import {PrimaryContext} from "../Context";
import React, {useContext, useMemo} from "react";
import {AuthHeader} from "./AuthHeader";

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {

  const { user } = useContext(PrimaryContext);

  const screens = useMemo(() => (
    user ? [
      {
        name: "AccountMain",
        component: AccountMain,
      },
      {
        name: "PasswordChange",
        component: PasswordChangeComponent
      },
      {
        name: "EmailChange",
        component: EmailChange,
      },
      {
        name: "Logout",
        component: Logout,
      }
    ] : [
      {
        name: "Login",
        component: Login
      },
      {
        name: "SignUp",
        component: SignUp,
      },
      {
        name: "ForgotPassword",
        component: EmailConfirmationFP,
      },
      {
        name: "NewPasswordConfirmation",
        component: NewPasswordConfirmation,
      },
    ]
  ), [user]);

  // route.name === "Login" || route.name === "SignUp" ? (     ) : null}

return (
      <AuthStack.Navigator
        initialRouteName={user? "AccountMain" : "Login"}
        // @ts-ignore
        screenOptions={({ back }) => ({
          header:
            (...props) =>
              <AuthHeader name={back}/>
            }
          )
        }>
        {screens.map((screen, index) => (
          <AuthStack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </AuthStack.Navigator>
    );
}

/*
 <UserHeader
                name={false} back={back}
                {...props}


                 <>
                    <View
                      style={{
                        justifyContent: "flex-start", alignItems: "flex-end", width: windowWidth * .5, height: "100%",
                        backgroundColor: customTheme.primary
                      }}>
                      <Appbar.Action
                        icon="less-than"
                        style={{left: 5, position: "absolute", zIndex: 900000}}
                        color={"rgba(0, 0, 0, .8)"}
                        size={27}
                        iconColor={customTheme.headerIconColors}
                        // @ts-ignore
                        onPress={() => {
                          navigation.goBack();
                        }}/>

                    </View>
                    <View
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: windowWidth * .5,
                        height: "100%"
                      }}>

                    </View>
 */