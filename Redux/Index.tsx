import {combineReducers} from 'redux';
import {
  HistorySent,
  SetIcon,
  SetScreens,
  SetText,
} from "./Actions";

export const allReducers = combineReducers(
  {
    text: SetText,
    icon: SetIcon,
    screens: SetScreens,
    historySent: HistorySent
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
