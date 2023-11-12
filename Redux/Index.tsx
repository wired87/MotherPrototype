import {combineReducers} from 'redux';
import {
  AccessPoint,
  Colors,
  Errors,
  MessageUpdate,
  SetDarkMode,
  SetIcon,
  SetLoading,
  SetScreens,
  SetText,
  SetLogout,
  HistorySent, User, FullScreenAdClass,
} from "./Actions";




export const allReducers = combineReducers(
  {
    loading: SetLoading,
    logout: SetLogout,
    text: SetText,
    icon: SetIcon,
    screens: SetScreens,
    darkmode: SetDarkMode,
    colors: Colors,
    purchaseAccess: AccessPoint,
    errors: Errors,
    message: MessageUpdate,
    historySent: HistorySent,
    user: User,
    fullScreeAd: FullScreenAdClass
    }
);

