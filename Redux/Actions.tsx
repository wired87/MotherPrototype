import {themeColors} from "../colors/theme";


const defaultUserData = {
    data: null
};

export const userObjectUpdate = (state = defaultUserData, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'UPDATE_OBJECT':
            return {
                ...state,
                data: action.payload
            }  // set the payload manualy at dispatch
        default:
            return state
    }
}


const User = {
    data: null
};

export const setUser = (state = User, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

const loading = {
    value: false
};

export const SetLoading = (state = loading, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state;
    }
}








export const SetDarkMode = (state = darkmode, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "DARKMODE":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state
    }
}

const colors = {
    value: {
        secondary_darkLight: [
            themeColors.sexyBlue,
            "#032548",
        ],
        primary_darkLight: [
            "rgb(230,230,230)",
            "rgb(17,17,17)",
        ],
        navigatorColor: [
            "rgb(230,230,230)",
            "rgb(45,45,43)"
        ],
        headerIconColors:[
            "rgb(255,255,255)",
            "rgb(0,0,0)"
        ],
        switchTextColorLD: [
          themeColors.mediumDarkDark,
          themeColors.dotNineWhite
        ],
        secondaryContainerBackground: [
          "rgba(24,23,23,1)",
          "rgba(20,20,20, .8)"
        ],
        switchedSecondaryContainerBackground: [
          "rgb(37,38,38)",
          "rgb(24,24,24)"
        ],

    }
};

const darkmode = {
    value: {
        primary: colors.value.primary_darkLight[0],
        secondary: colors.value.secondary_darkLight[0],
        navigatorColor: colors.value.navigatorColor[0],
        headerIconColors: "rgb(0,0,0)",
        switchTextColorLD: colors.value.switchTextColorLD[0],
        secondaryContainerBackground: colors.value.secondaryContainerBackground[0],
        switchedSecondaryContainerBackground: colors.value.switchedSecondaryContainerBackground[0],
    }
};

export const Colors = (state = colors, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "COLORS":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state
    }
}





const newLogout = {
    data: null
};

export const NewLogout = (state = newLogout, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "NEW_LOGOUT":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state
    }
}









const purchaseAccess = {
    value: false
};

export const AccessPoint = (state = purchaseAccess, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "PURCHASEACCESS":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state
    }
}

















const icon = {
    value: {
        settingsIcon: "cog-outline",
        trashIcon: "trash-can-outline",
        logoutIcon: "logout",
        arrow: "arrow-right-thin",
        color: "rgb(255,255,255)",
    }
}

export const SetIcon = (state = icon, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "ICON":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state;
    }
}


const screens = {
    value: {
        emailChangeScreen: "EmailChange",
        passwordChangeScreen: "PasswordChange",
        logoutScreen: "Logout",
        settingsScreen: "SettingsMain",
        account: "AccountMain",
        purchaseScreen: "PurchaseScreen",
        login: "Login",
        register: "Signup",
        toolsMain: "ToolsMain"
    }
}

export const SetScreens = (state = screens, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "SCREENS":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state;
    }
}











const text = {
    value: {
        tryAgain: "Try again",
        changeEmail: "Change E-Mail",
        changePassword: "Change Password",
        chooseNewPassword: "Choose a new Password . . .",
        currentPasswordText: "Current Password . . .",
        goHomeText: "Go Home",
        navigateToolsMain: "ToolsMain",
        defaultPasswordPlaceholder: "Create a Password",
        defaultEmailPlaceholder: "Your Email",
        success: "success",
        indicatorSizeSmall: "small",
        indicatorSizeMedium: "medium",
        signInText: "Sign in",
        contact: "Contact",
        signInWithGoogle: "Sign in with Google",
        navigatePasswordChange: "PasswordChange",
        profileHeading: "Profile",
        password: "Password",
        deleteAccount: "Delete Account",
        navigateSettingsMain: "SettingsMain",
        settings: "Settings",
        signOut: "Sign out",
        logoutIcon: "logout",
        logoutButtonText: "Logout",
        plusPlanButton: "Explore all Features",
        featuresInFuture: "Features in Future",
        notHere: "Dont see your preferred feature?",
        contactFeatureText: "Please fill out the Contact Form with your wishes. \nWe will contact you ASAP."
    }
};

export const SetText = (state = text, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "TEXT":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state;
    }
}











// so you should send the payload:
/*
dispatch({
  type: 'SIGN_IN',
  payload: {
    "email": "",
    "idToken": "",
    "emailVerified": "",
    "uid": "",
    "id": "",
    "refreshToken": "",
  }
})

So could a sign in function look like if you store the suer local in runtime:
 const signIn = async () => {
    //await GoogleSignin.hasPlayServices(); // Check if Google Play Services is available.
    try {
      setLoading(true);
      const manualLoginResponse = await signInWithEmailAndPassword(getAuth(), email, password);
      setError("success");
      console.log("response:", manualLoginResponse)
      setVisibility(true);
      dispatch({ type: 'SIGN_IN',
        payload: {
          "email": manualLoginResponse.user.email,
          "idToken": manualLoginResponse.user.idToken,
          "emailVerified": manualLoginResponse.user.emailVerified,
          "uid": manualLoginResponse.user.uid,
          "id": manualLoginResponse.user.id,
          "refreshToken": manualLoginResponse.user.refreshToken,
        }}); // send the payload (user object) to redux reducer

    } catch (error) {
      await setError(error.message);
      setVisibility(true);
      console.log(
        "please check your Input and try again. \n" +
        error.message);
    } finally {
      setLoading(false);
    }
  }


 */