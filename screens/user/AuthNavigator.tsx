import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {getAuth} from "firebase/auth";
import {AccountMain} from "./Account";
import {PasswordChangeComponent} from "./ChangePassword";
import {EmailChange} from "./ChangeEmail/ChangeEmail";
import {Logout} from "./Logout";
import Login from "./Login";
import {SignUp} from "./Register";
import {UserHeader} from "./AuthHeader";
import {useSelector} from "react-redux";

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const user = getAuth().currentUser;
  const screens = user ?
        [
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
        ] :
        [
            {
                name: "Login",
                component: Login
            },
            {
                name: "Signup",
                component: SignUp,
            }
        ];
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






/*
return(
        <AuthStack.Navigator
            initialRouteName={"Login"}
             screenOptions={{
                 header: (props) =>
                 {
                     if (!user) {
                         return
                         <DefaultHeader
                             visible={route.name === "Login" || route.name === "Register"}
                             extraStyles={undefined}
                             statement={undefined}
                             {...props}
                             children={
                             <>
                                 <DefaultPageNavigationBtn
                                     text={"Sign in"}
                                     onPressAction={() => {navigation.navigate("Login")}
                                     extraTextStyles={{[styles.authNavHeaderContainerText,
                                         {color: route.name === "Login"? themeColors.mediumDarkDark :
                                         themeColors.headerText, fontSize: 16}]}}
                                     extraBtnStyles={[{backgroundColor: route.name === "Login" ? "transparent" : themeColors.mediumDarkDark}]} />

                                <DefaultPageNavigationBtn
                                     text={"Sign up"}
                                     onPressAction={() => {navigation.navigate("Register")}
                                     extraTextStyles={{[styles.authNavHeaderContainerText,
                                         {color: route.name === "Register"? themeColors.mediumDarkDark :
                                         themeColors.headerText, fontSize: 16}]}}
                                     extraBtnStyles={[{backgroundColor: route.name === "Login" ? "transparent" : themeColors.mediumDarkDark}]} />




                                </>
                             }/>;
                     } else {
                         return <EmptyComp />;
                     }
                 }
             }} >
            {user ? (
                <>

<AuthStack.Screen name="AccountMain" component={AccountMain} />
<AuthStack.Screen
    name="PasswordChange"
    component={PasswordChangeComponent}
    options={{
        title: "PasswordChange"
    }}/>
<AuthStack.Screen
    name={"EmailChangeComponent"}
    component={EmailChangeComponent}
    options={{
        title: "EmailChangeComponent",
    }}/>
<AuthStack.Screen
    name={"Logout"}
    component={Logout}
    options={{
        title: "Logout",
    }}/>
</>

) : (
    <>
        <AuthStack.Screen
            name="Login"
            component={Login}
            options={{
                title: "Login",
            }}/>
        <AuthStack.Screen
            name="Signup"
            component={SignUp}
            options={{
                title: "Signup",
            }}/>
    </>
)}
</AuthStack.Navigator>
);
}

                         <TouchableOpacity style={[
                             styles.authNavHeaderContainerSmall,
                             {backgroundColor: route.name=== "Signup" ? "transparent" : themeColors.mediumDarkDark,
                                 color: route.name=== "Signup"? themeColors.headerText : themeColors.mediumDarkDark,
                                 marginHorizontal: 15, borderRadius: 14, paddingVertical: 5, paddingHorizontal: 15, marginTop: 20}]}
                                           onPress={() => {navigation.navigate("Signup")}}
                         >
                             <Text style={[styles.authNavHeaderContainerText,
                                 {color: route.name === "Signup"? themeColors.mediumDarkDark : themeColors.headerText,
                                     fontSize: 16}]}>
                                 sign up
                             </Text>
                         </TouchableOpacity>
*/