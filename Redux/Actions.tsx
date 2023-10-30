


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

const icon = {
    value: {
        settingsIcon: "cog-outline",
        trashIcon: "trash-can-outline",
        logoutIcon: "logout",
        arrow: "arrow-right-thin"
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
        plusPlanInfo: "PlusPlanInfo",
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
        plusPlanButton: "Explore all Features"
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