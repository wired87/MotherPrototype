import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AccountMain} from "./Account";
import {PasswordChangeComponent} from "./ChangePassword";
import {EmailChange} from "./ChangeEmail/ChangeEmail";
import {Logout} from "./Logout";
import Login from "./Login";
import {SignUp} from "./SignUp";
import {UserHeader} from "./AuthHeader";
import {EmailConfirmationFP} from "./ForgotPassword/EmailConfirmationFP";
import {NewPasswordConfirmation} from "./ForgotPassword/NewPasswordConfirmation";
import {PrimaryContext} from "../Context";
import {useContext, useMemo} from "react";

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

    return (
      <AuthStack.Navigator
        initialRouteName={user? "AccountMain" : "Login"}
        // @ts-ignore
        screenOptions={({ back }) => ({
          header:
            (props) =>
              // @ts-ignore
              <UserHeader
                back={back}
                {...props}
              />
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

