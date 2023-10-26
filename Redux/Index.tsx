import {combineReducers, createStore} from 'redux';
import {SetIcon, SetLoading, SetScreens, SetText, setUser, userObjectUpdate} from "./Actions";
import {loading} from "./cases";


export const allReducers = combineReducers(
    {
        userValueUpdate: userObjectUpdate,
        setUserObject: setUser,
        loading: SetLoading,
        text: SetText,
        icon: SetIcon,
        screens: SetScreens,

    }
);

