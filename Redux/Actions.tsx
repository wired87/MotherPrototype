
/*
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



*/

const historySent = {
  value: false
};

export const HistorySent = (state = historySent, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "HISTORY_SENT":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state;
    }
}
/*

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
*/
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
        register: "SignUp",
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
    signUp: "Sign Up",
    logoutIcon: "logout",
    logoutButtonText: "Logout",
    plusPlanButton: "Explore all Features",
    featuresInFuture: "Features in Future",
    notHere: "Do you have any ideas for future tools?",
    contactFeatureText: "Please fill out the Contact Form with your wishes. \nWe will contact you ASAP.",
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

