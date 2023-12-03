import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AccountMain} from "./Account";

const PasswordChangeComponent = lazy(() => import("./ChangePassword"));
const EmailChange = lazy(() => import("./ChangeEmail/ChangeEmail"));

import {Logout} from "./Logout";
import Login from "./Login";
import {SignUp} from "./SignUp";
import {EmailConfirmationFP} from "./ForgotPassword/EmailConfirmationFP";
import {NewPasswordConfirmation} from "./ForgotPassword/NewPasswordConfirmation";
import {PrimaryContext} from "../Context";
import React, {lazy, useContext, useMemo} from "react";
import AuthHeader from "./AuthHeader";

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {

  const { user } = useContext(PrimaryContext);

  const screens = useMemo(() => {
    const authScreens = user
      ? {
        AccountMain: AccountMain,
        PasswordChange: PasswordChangeComponent,
        EmailChange: EmailChange,
        Logout: Logout,
      }
      : {
        Login: Login,
        SignUp: SignUp,
        ForgotPassword: EmailConfirmationFP,
        NewPasswordConfirmation: NewPasswordConfirmation,
      };

    // build form every item in that list a new object with key "name" and value component
    return Object.entries(authScreens).map(([name, component], index) => ({
      key: index.toString(),
      name,
      component,
    }));
  }, [user]);

  const screenOptions = useMemo(() => ({
    header: () => <AuthHeader />,
  }), []);

  return (
    <AuthStack.Navigator
      initialRouteName={user ? 'AccountMain' : 'Login'}
      screenOptions={screenOptions}>
      {screens.map((screen) => (
        <AuthStack.Screen
          key={screen.key}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </AuthStack.Navigator>
  );
};

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
 */