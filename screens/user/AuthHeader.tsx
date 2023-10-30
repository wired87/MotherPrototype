import {getAuth} from "firebase/auth";
import {JSX} from "react";
import {DefaultHeader} from "../../components/navigation/DefaultHeader";
import {DefaultPageNavigationBtn} from "../../components/buttons/DefaultPageNavigationBtn";
import {userStyles} from "./userStyles";
import {themeColors} from "../../colors/theme";

export const UserHeader = (back: { name: boolean}, route: { name: string; }) => {
    const auth = getAuth();
    const user = auth.currentUser;

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
                                }]}/>
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
