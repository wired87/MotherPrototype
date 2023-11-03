import {combineReducers} from 'redux';
import {
  AccessPoint,
  Colors, NewLogout,
  SetDarkMode,
  SetIcon,
  SetLoading,
  SetScreens,
  SetText,
  setUser,
  userObjectUpdate
} from "./Actions";
import {newLogout} from "./cases";



export const allReducers = combineReducers(
  {
          userValueUpdate: userObjectUpdate,
          setUserObject: setUser,
          loading: SetLoading,
          text: SetText,
          icon: SetIcon,
          screens: SetScreens,
          darkmode: SetDarkMode,
          colors: Colors,
          purchaseAccess: AccessPoint,
          newLogout: NewLogout,
  }
);

