import {combineReducers} from 'redux';
import {
  SetIcon,
  SetScreens,
  SetText,
} from "./Actions";

export const allReducers = combineReducers(
  {
    text: SetText,
    icon: SetIcon,
    screens: SetScreens,
    }
);



/*
  HistorySent,
    AccessPoint,
FullScreenAdClass,
  Sent
SetLogout,
  SetLoading,
  Errors,
  fullScreeAd: FullScreenAdClass,
  sent: Sent    errors: Errors,
  loading: SetLoading,
  logout: SetLogout,
      purchaseAccess: AccessPoint,
    historySent: HistorySent,
  */
