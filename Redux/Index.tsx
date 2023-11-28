import {combineReducers} from 'redux';
import {
  AccessPoint,
  Errors,
  SetIcon,
  SetLoading,
  SetScreens,
  SetText,
  SetLogout,
  HistorySent,
  FullScreenAdClass,
  Sent
} from "./Actions";


export const allReducers = combineReducers(
  {
    loading: SetLoading,
    logout: SetLogout,
    text: SetText,
    icon: SetIcon,
    screens: SetScreens,
    purchaseAccess: AccessPoint,
    errors: Errors,
    historySent: HistorySent,
    fullScreeAd: FullScreenAdClass,
    sent: Sent
    }
);

